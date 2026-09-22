<?php
/**
 * City pages ("Executive Recruiting in Clifton, New Jersey"): the live site's
 * 27 local-guide pages rendered through page-city.php. This registry maps
 * each page slug to its city name and county so the template can name the
 * county, list neighbours, and the homepage can link towns to their pages.
 * Facts (residents, distance, ZIP) are optional ACF fields on each page.
 */
defined( 'ABSPATH' ) || exit;

function hsg_cities(): array {
	return apply_filters( 'hsg_cities', array(
		'passaic-nj'        => array( 'Passaic', 'Passaic County' ),
		'clifton'           => array( 'Clifton', 'Passaic County' ),
		'paterson-nj'       => array( 'Paterson', 'Passaic County' ),
		'wayne-nj'          => array( 'Wayne', 'Passaic County' ),
		'little-falls'      => array( 'Little Falls', 'Passaic County' ),
		'paramus-nj-bb'     => array( 'Paramus', 'Bergen County' ),
		'lodi-nj'           => array( 'Lodi', 'Bergen County' ),
		'rutherford-nj'     => array( 'Rutherford', 'Bergen County' ),
		'fort-lee-nj'       => array( 'Fort Lee', 'Bergen County' ),
		'teaneck-nj'        => array( 'Teaneck', 'Bergen County' ),
		'wood-ridge-nj'     => array( 'Wood-Ridge', 'Bergen County' ),
		'little-ferry'      => array( 'Little Ferry', 'Bergen County' ),
		'hasbrouck-heights' => array( 'Hasbrouck Heights', 'Bergen County' ),
		'hackensack-nj'     => array( 'Hackensack', 'Bergen County' ),
		'elmwood-park'      => array( 'Elmwood Park', 'Bergen County' ),
		'lyndhurst-nj'      => array( 'Lyndhurst', 'Bergen County' ),
		'hoboken-nj'        => array( 'Hoboken', 'Hudson County' ),
		'jersey-city-nj'    => array( 'Jersey City', 'Hudson County' ),
		'bayonne-nj'        => array( 'Bayonne', 'Hudson County' ),
		'union-city-nj'     => array( 'Union City', 'Hudson County' ),
		'west-new-york'     => array( 'West New York', 'Hudson County' ),
		'secaucus-nj'       => array( 'Secaucus', 'Hudson County' ),
		'newark-nj'         => array( 'Newark', 'Essex County' ),
		'bloomfield-nj'     => array( 'Bloomfield', 'Essex County' ),
		'montclair-nj'      => array( 'Montclair', 'Essex County' ),
		'nutley-nj'         => array( 'Nutley', 'Essex County' ),
		'elizabeth-nj'      => array( 'Elizabeth', 'Union County' ),
		'linden-nj'         => array( 'Linden', 'Union County' ),
	) );
}
function hsg_city_hub_url(): string { return apply_filters( 'hsg_city_hub_url', home_url( '/northern-new-jersey/' ) ); }

/** City record for a page: registry first, ACF overrides on top. */
function hsg_city_for( int $post_id ): array {
	$slug = get_post_field( 'post_name', $post_id ); $reg = hsg_cities()[ $slug ] ?? array( '', '' );
	$title = get_the_title( $post_id );
	$name = $reg[0] ?: ( preg_match( '/ in ([^,]+),/i', $title, $m ) ? trim( $m[1] ) : $title );
	$f = fn( $k ) => function_exists( 'get_field' ) ? trim( (string) get_field( $k, $post_id ) ) : '';
	return array(
		'slug' => $slug, 'name' => $f( 'city_name' ) ?: $name, 'county' => $f( 'city_county' ) ?: $reg[1],
		'residents' => $f( 'city_residents' ), 'distance' => $f( 'city_distance' ), 'zip' => $f( 'city_zip' ), 'dek' => $f( 'city_dek' ),
	);
}

/** Published city pages, keyed by slug, with URL — only slugs the registry knows. */
function hsg_city_pages(): array {
	static $out = null; if ( null !== $out ) { return $out; }
	$out = array();
	$pages = get_posts( array( 'post_type' => 'page', 'post_status' => 'publish', 'numberposts' => -1, 'post_name__in' => array_keys( hsg_cities() ), 'orderby' => 'title', 'order' => 'ASC' ) );
	foreach ( $pages as $p ) { $r = hsg_cities()[ $p->post_name ]; $out[ $p->post_name ] = array( 'id' => $p->ID, 'name' => $r[0], 'county' => $r[1], 'url' => get_permalink( $p ) ); }
	return $out;
}
/** URL for a town name as typed in the homepage lists, or '' when no page exists. */
function hsg_city_url_by_name( string $name ): string {
	foreach ( hsg_city_pages() as $c ) { if ( 0 === strcasecmp( $c['name'], trim( $name ) ) ) { return $c['url']; } }
	return '';
}

/* ---------- content helpers ---------- */
/** Anchor ids on the guide's H2s so the on-page index can jump to them. Returns [html, [[id, text], …]]. */
function hsg_city_index( string $html ): array {
	$toc = array(); $used = array();
	$html = preg_replace_callback( '/<h2\b([^>]*)>(.*?)<\/h2>/is', function ( $m ) use ( &$toc, &$used ) {
		$text = trim( wp_strip_all_tags( $m[2] ) ); if ( '' === $text ) { return $m[0]; }
		$id = sanitize_title( $text ) ?: 'section'; $base = $id; $n = 2; while ( isset( $used[ $id ] ) ) { $id = $base . '-' . $n++; } $used[ $id ] = 1;
		$toc[] = array( $id, $text );
		$attrs = preg_replace( '/\sid="[^"]*"/', '', $m[1] );
		return '<h2 id="' . esc_attr( $id ) . '"' . $attrs . '>' . $m[2] . '</h2>';
	}, $html );
	return array( $html, $toc );
}
/** First real paragraph of the guide, for the hero dek when no ACF dek is set. */
function hsg_city_lead( string $html ): string {
	if ( preg_match_all( '/<p\b[^>]*>(.*?)<\/p>/is', $html, $m ) ) {
		foreach ( $m[1] as $p ) { $t = trim( wp_strip_all_tags( $p ) ); if ( mb_strlen( $t ) > 80 ) { return $t; } }
	}
	return '';
}

/* ---------- ACF: optional facts per city page ---------- */
add_action( 'acf/init', function () {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) { return; }
	$t = fn( $k, $l, $i = '' ) => array( 'key' => 'field_hsg_' . $k, 'name' => $k, 'label' => $l, 'type' => 'text', 'instructions' => $i, 'wrapper' => array( 'width' => '33' ) );
	acf_add_local_field_group( array(
		'key' => 'group_hsg_city', 'title' => 'City page', 'position' => 'acf_after_title',
		'location' => array( array( array( 'param' => 'page_template', 'operator' => '==', 'value' => 'page-city.php' ) ) ),
		'fields' => array(
			$t( 'city_name', 'City name', 'Blank = from the page slug.' ), $t( 'city_county', 'County', 'e.g. Passaic County' ), $t( 'city_zip', 'ZIP code(s)' ),
			$t( 'city_residents', 'Residents', 'e.g. 90,000' ), $t( 'city_distance', 'Distance to Manhattan', 'e.g. 12 miles' ),
			array( 'key' => 'field_hsg_city_dek', 'name' => 'city_dek', 'label' => 'Hero summary', 'type' => 'textarea', 'rows' => 3, 'instructions' => 'Blank = the guide’s first paragraph.', 'wrapper' => array( 'width' => '34' ) ),
		),
	) );
} );

/* ---------- schema: the service, the place, the trail ---------- */
function hsg_city_jsonld( array $city, int $post_id ): string {
	$home = home_url( '/' ); $url = get_permalink( $post_id );
	$place = array( '@type' => 'City', 'name' => $city['name'], 'containedInPlace' => array( '@type' => 'State', 'name' => 'New Jersey' ) );
	if ( $city['county'] ) { $place['containedInPlace'] = array( '@type' => 'AdministrativeArea', 'name' => $city['county'], 'containedInPlace' => array( '@type' => 'State', 'name' => 'New Jersey' ) ); }
	$org = array( '@type' => 'Organization', '@id' => $home . '#organization', 'name' => 'Hiring Solutions Group', 'url' => $home );
	if ( function_exists( 'hsg_field' ) ) { if ( $p = trim( (string) hsg_field( 'site_phone', '' ) ) ) { $org['telephone'] = $p; } }
	$graph = array(
		$org,
		array( '@type' => 'Service', '@id' => $url . '#service', 'name' => 'Executive Recruiting in ' . $city['name'] . ', NJ', 'serviceType' => 'Executive search and recruiting', 'provider' => array( '@id' => $home . '#organization' ), 'areaServed' => $place, 'url' => $url ),
		array( '@type' => 'BreadcrumbList', 'itemListElement' => array(
			array( '@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => $home ),
			array( '@type' => 'ListItem', 'position' => 2, 'name' => 'Northern New Jersey', 'item' => hsg_city_hub_url() ),
			array( '@type' => 'ListItem', 'position' => 3, 'name' => $city['name'], 'item' => $url ),
		) ),
		array( '@type' => 'WebPage', '@id' => $url, 'url' => $url, 'name' => get_the_title( $post_id ), 'about' => $place, 'dateModified' => get_the_modified_date( 'c', $post_id ), 'isPartOf' => array( '@id' => $home . '#website' ) ),
	);
	return '<script type="application/ld+json">' . wp_json_encode( array( '@context' => 'https://schema.org', '@graph' => $graph ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>';
}

/** City pages are Avada-built: unwrap the layout shortcodes the same way posts are. */
add_filter( 'the_content', function ( $c ) { return ( function_exists( 'hsg_unwrap_fusion' ) && is_page_template( 'page-city.php' ) ) ? hsg_unwrap_fusion( $c ) : $c; }, 9 );
