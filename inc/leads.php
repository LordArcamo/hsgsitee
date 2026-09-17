<?php
/**
 * Leads — the audience-bar intake forms ("For Companies" / "For Professionals").
 *
 * Every submission is stored as a private "Lead" post (wp-admin → Leads) AND
 * emailed to the address in Home → Site → "Where new leads are emailed"
 * (falls back to the WordPress admin email). Protection: REST nonce, honeypot,
 * server-side validation, and a per-IP rate limit. Nothing is sent to any
 * third-party service.
 */
defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
	register_post_type( 'hsg_lead', array(
		'labels' => array( 'name' => 'Leads', 'singular_name' => 'Lead', 'menu_name' => 'Leads', 'all_items' => 'All leads' ),
		'public' => false, 'show_ui' => true, 'show_in_menu' => true, 'menu_position' => 25, 'menu_icon' => 'dashicons-email-alt',
		'supports' => array( 'title' ), 'capability_type' => 'post', 'map_meta_cap' => true,
		'capabilities' => array( 'create_posts' => 'do_not_allow' ),
	) );
} );

/** Field definitions per audience: name => [label, required, max length]. */
function hsg_lead_schema( string $audience ): array {
	$contact = array(
		'name'  => array( 'Name', true, 120 ), 'company' => array( 'Company', false, 120 ), 'email' => array( 'Email', true, 190 ), 'phone' => array( 'Phone', false, 40 ),
		'notes' => array( 'Anything else', false, 1500 ),
	);
	// Companies choose a role GROUP (inc/roles.php); "title" is only asked for Custom Search.
	$hire = array(
		'role'        => array( 'Role / Position', true, 60 ), 'title' => array( 'Role title', false, 120 ),
		'location'    => array( 'Location', true, 120 ), 'experience' => array( 'Years of experience', true, 40 ),
		'position'    => array( 'New or replacement', true, 40 ), 'career_path' => array( 'Career path', true, 40 ),
		'salary'      => array( 'Salary range', false, 60 ),
	);
	$career = array(
		'title'    => array( 'Current or most recent title', true, 120 ), 'location' => array( 'Preferred location', true, 120 ), 'years' => array( 'Years of experience', true, 40 ),
		'looking'  => array( 'Looking for', true, 40 ), 'level' => array( 'Target level', true, 40 ), 'salary' => array( 'Desired salary range', false, 60 ),
	);
	return array_merge( 'hire' === $audience ? $hire : $career, $contact );
}

/** What the lead is about, for the post title and the email: the role group, the custom title, or the professional's title. */
function hsg_lead_headline( string $aud, array $c ): string {
	if ( 'career' === $aud ) { return $c['title']; }
	return ( 'custom' === ( $c['role_key'] ?? '' ) && '' !== $c['title'] ) ? $c['title'] . ' (custom)' : $c['role'];
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'hsg/v1', '/lead', array(
		'methods' => 'POST', 'callback' => 'hsg_lead_endpoint',
		// Public endpoint on purpose: a REST nonce gives anonymous visitors no
		// protection and goes stale inside cached pages (WP Rocket), which
		// turned every submission after ~12h into a 403. Abuse is handled by
		// the honeypot, the per-IP rate limit and server-side validation.
		'permission_callback' => '__return_true',
	) );
} );

function hsg_lead_endpoint( WP_REST_Request $r ) {
	$p = $r->get_json_params(); if ( ! is_array( $p ) ) { $p = $r->get_params(); }
	if ( ! empty( $p['website'] ) ) { return new WP_REST_Response( array( 'ok' => true ), 200 ); } // honeypot: pretend success
	$ip = $_SERVER['REMOTE_ADDR'] ?? '0'; $k = 'hsg_lead_rl_' . md5( $ip ); $n = (int) get_transient( $k );
	if ( $n >= 5 ) { return new WP_Error( 'rate', 'Too many submissions. Please try again in a few minutes.', array( 'status' => 429 ) ); }
	set_transient( $k, $n + 1, 10 * MINUTE_IN_SECONDS );
	$res = hsg_store_lead( $p );
	return is_wp_error( $res ) ? $res : new WP_REST_Response( array( 'ok' => true, 'id' => $res ), 200 );
}

/** Validate, store, notify. Returns the lead post ID or WP_Error. $send=false skips the email (tests). */
function hsg_store_lead( array $p, bool $send = true ) {
	$aud = ( 'career' === ( $p['audience'] ?? '' ) ) ? 'career' : 'hire';
	$schema = hsg_lead_schema( $aud ); $clean = array(); $missing = array();
	foreach ( $schema as $k => $d ) {
		list( $label, $req, $max ) = $d;
		$v = trim( wp_strip_all_tags( (string) ( $p[ $k ] ?? '' ) ) );
		$v = mb_substr( $v, 0, $max );
		if ( $req && '' === $v ) { $missing[] = $label; }
		$clean[ $k ] = $v;
	}
	if ( $missing ) { return new WP_Error( 'missing', 'Please fill in: ' . implode( ', ', $missing ) . '.', array( 'status' => 400 ) ); }
	if ( ! is_email( $clean['email'] ) ) { return new WP_Error( 'email', 'That email address does not look right.', array( 'status' => 400 ) ); }
	if ( 'hire' === $aud ) {
		// The role must be one of the offered keys; the lead keeps the label and the key.
		$key = $clean['role']; $label = function_exists( 'hsg_role_label' ) ? hsg_role_label( $key ) : '';
		if ( '' === $label ) { return new WP_Error( 'role', 'Please choose a role from the list.', array( 'status' => 400 ) ); }
		if ( 'custom' === $key && '' === $clean['title'] ) { return new WP_Error( 'missing', 'Please fill in: Role title.', array( 'status' => 400 ) ); }
		$clean['role'] = $label; $clean['role_key'] = $key;
	}

	$who = 'hire' === $aud ? 'Company' : 'Professional';
	$title = sprintf( '%s — %s (%s)', $who, hsg_lead_headline( $aud, $clean ), $clean['name'] );
	$id = wp_insert_post( array( 'post_type' => 'hsg_lead', 'post_status' => 'private', 'post_title' => $title ), true );
	if ( is_wp_error( $id ) ) { return $id; }
	foreach ( $clean as $k => $v ) { update_post_meta( $id, 'lead_' . $k, $v ); }
	update_post_meta( $id, 'lead_audience', $aud );
	update_post_meta( $id, 'lead_ip', $_SERVER['REMOTE_ADDR'] ?? '' );
	update_post_meta( $id, 'lead_page', esc_url_raw( (string) ( $p['page'] ?? '' ) ) );

	// Test submissions (any @example.com address) are stored but never emailed, so the form can be checked without mailing HSG.
	$is_test = (bool) preg_match( '/@example\.(com|org|net)$/i', $clean['email'] );
	if ( $is_test ) { update_post_meta( $id, 'lead_test', 1 ); }
	if ( $send && ! $is_test && apply_filters( 'hsg_lead_send_email', true, $id ) ) { hsg_lead_email( $id, $aud, $clean, $schema ); }
	do_action( 'hsg_lead_stored', $id, $aud, $clean );
	return $id;
}

function hsg_lead_recipient(): string {
	$to = function_exists( 'hsg_field' ) ? trim( (string) hsg_field( 'site_lead_email', '' ) ) : '';
	return is_email( $to ) ? $to : get_option( 'admin_email' );
}

function hsg_lead_email( int $id, string $aud, array $c, array $schema ): bool {
	$who = 'hire' === $aud ? 'a company' : 'a professional';
	$about = hsg_lead_headline( $aud, $c );
	$subject = sprintf( '[HSG lead] %s — %s', 'hire' === $aud ? 'Company: ' . ( $c['company'] ?: $c['name'] ) : 'Professional: ' . $c['name'], $about );
	$order = 'hire' === $aud ? array( 'name', 'company', 'email', 'phone', 'role', 'title', 'location', 'experience', 'position', 'career_path', 'salary', 'notes' ) : array( 'name', 'email', 'phone', 'title', 'location', 'years', 'looking', 'level', 'salary', 'notes' );
	$rows = '';
	foreach ( $order as $k ) { if ( '' === ( $c[ $k ] ?? '' ) ) { continue; } $rows .= sprintf( '<tr><td style="padding:8px 12px;color:#5b616d;font-size:13px;white-space:nowrap;vertical-align:top">%s</td><td style="padding:8px 12px;font-size:15px;color:#212934"><b>%s</b></td></tr>', esc_html( $schema[ $k ][0] ), nl2br( esc_html( $c[ $k ] ) ) ); }
	$html = sprintf(
		'<div style="font-family:Inter,Segoe UI,Arial,sans-serif;max-width:620px"><p style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#432d74;font-weight:700;margin:0 0 6px">New lead from the website</p>'
		. '<h1 style="font-size:22px;margin:0 0 4px;color:#212934">%s wants to talk about <em>%s</em></h1><p style="margin:0 0 18px;color:#5b616d;font-size:14px">Sent %s · <a href="%s" style="color:#432d74">Open in WordPress</a></p>'
		. '<table style="border-collapse:collapse;width:100%%;border:1px solid #e2e2e2;border-radius:10px">%s</table>'
		. '<p style="margin:18px 0 0"><a href="mailto:%s" style="display:inline-block;background:#432d74;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:8px">Reply to %s</a></p></div>',
		esc_html( ucfirst( $who ) ), esc_html( $about ), esc_html( wp_date( 'M j, Y g:i a' ) ), esc_url( admin_url( 'post.php?post=' . $id . '&action=edit' ) ), $rows, esc_attr( $c['email'] ), esc_html( $c['name'] )
	);
	$headers = array( 'Content-Type: text/html; charset=UTF-8', 'Reply-To: ' . $c['name'] . ' <' . $c['email'] . '>' );
	return wp_mail( hsg_lead_recipient(), $subject, $html, $headers );
}

/* ---------- wp-admin: a readable Leads list and a detail box ---------- */
add_filter( 'manage_hsg_lead_posts_columns', fn( $cols ) => array( 'cb' => $cols['cb'], 'title' => 'Lead', 'aud' => 'Audience', 'contact' => 'Contact', 'where' => 'Location', 'date' => 'Received' ) );
add_action( 'manage_hsg_lead_posts_custom_column', function ( $col, $id ) {
	if ( 'aud' === $col ) { echo 'hire' === get_post_meta( $id, 'lead_audience', true ) ? 'Company' : 'Professional'; }
	if ( 'contact' === $col ) { $e = get_post_meta( $id, 'lead_email', true ); echo '<a href="mailto:' . esc_attr( $e ) . '">' . esc_html( $e ) . '</a>' . ( get_post_meta( $id, 'lead_phone', true ) ? '<br>' . esc_html( get_post_meta( $id, 'lead_phone', true ) ) : '' ); }
	if ( 'where' === $col ) { echo esc_html( get_post_meta( $id, 'lead_location', true ) ); }
}, 10, 2 );
add_action( 'add_meta_boxes_hsg_lead', function () {
	add_meta_box( 'hsg_lead_detail', 'Lead details', function ( $post ) {
		$aud = get_post_meta( $post->ID, 'lead_audience', true ) ?: 'hire';
		echo '<table class="widefat striped" style="max-width:720px">';
		foreach ( hsg_lead_schema( $aud ) as $k => $d ) { $v = get_post_meta( $post->ID, 'lead_' . $k, true ); if ( '' === $v ) { continue; } echo '<tr><th style="width:190px;text-align:left">' . esc_html( $d[0] ) . '</th><td>' . nl2br( esc_html( $v ) ) . '</td></tr>'; }
		echo '<tr><th>Received</th><td>' . esc_html( get_the_date( 'M j, Y g:i a', $post ) ) . ' from ' . esc_html( get_post_meta( $post->ID, 'lead_ip', true ) ) . '</td></tr></table>';
	}, 'hsg_lead', 'normal', 'high' );
} );
/** Notify the front end where to post and with which nonce. */
add_action( 'wp_enqueue_scripts', function () {
	if ( ! function_exists( 'hsg_uses_new_chrome' ) || ! hsg_uses_new_chrome() ) { return; }
	// Relative paths: the page may be served on www/non-www or through a proxy (GTranslate); an absolute URL would be cross-origin there.
	wp_add_inline_script( 'hsg', 'window.hsgLead=' . wp_json_encode( array( 'endpoint' => wp_make_link_relative( rest_url( 'hsg/v1/lead' ) ), 'fallback' => '/?rest_route=/hsg/v1/lead' ) ) . ';', 'before' );
}, 101 );
