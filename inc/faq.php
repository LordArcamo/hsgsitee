<?php
/**
 * FAQ page: the existing Avada FAQ page (fusion_toggle accordions, grouped
 * under fusion_title / h2 headings) rendered in the new chrome with FAQPage
 * JSON-LD, so answer engines and LLM search can lift the Q&As. The content
 * stays editable where it always was; nothing is duplicated.
 */
defined( 'ABSPATH' ) || exit;

function hsg_faq_clean( string $html ): string {
	$html = preg_replace( '/\[\/?fusion_[a-z_]*[^\]]*\]/', '', $html );
	$html = preg_replace( '/\[\/?(?:iee_|awb_)[a-z_]*[^\]]*\]/', '', $html );
	return wp_kses_post( wpautop( trim( $html ) ) );
}

/** @return array<int, array{title:string, items:array<int, array{q:string,a:string}>}> */
function hsg_faq_parse( string $raw ): array {
	$re = '/\[fusion_toggle\b[^\]]*?title="([^"]*)"[^\]]*\](.*?)\[\/fusion_toggle\]|\[fusion_title\b[^\]]*\](.*?)\[\/fusion_title\]|<h([23])[^>]*>(.*?)<\/h\4>/is';
	if ( ! preg_match_all( $re, $raw, $m, PREG_SET_ORDER ) ) { return array(); }
	$groups = array(); $cur = array( 'title' => '', 'items' => array() ); $seen = array();
	foreach ( $m as $x ) {
		if ( isset( $x[2] ) && '' !== $x[1] && '' === ( $x[3] ?? '' ) && '' === ( $x[5] ?? '' ) ) {
			$q = trim( html_entity_decode( wp_strip_all_tags( $x[1] ), ENT_QUOTES ) );
			$q = preg_replace( '/^\d+\.\s*/', '', $q );
			if ( '' === $q || isset( $seen[ $q ] ) ) { continue; }
			$seen[ $q ] = true;
			$cur['items'][] = array( 'q' => $q, 'a' => hsg_faq_clean( $x[2] ) );
			continue;
		}
		$title = trim( wp_strip_all_tags( ( $x[3] ?? '' ) !== '' ? $x[3] : ( $x[5] ?? '' ) ) );
		if ( '' === $title ) { continue; }
		if ( $cur['items'] ) { $groups[] = $cur; }
		$cur = array( 'title' => $title, 'items' => array() );
	}
	if ( $cur['items'] ) { $groups[] = $cur; }
	// Business Solutions Group content lives on bsg-edge.com now; its FAQ groups are not shown here.
	$hidden = apply_filters( 'hsg_faq_hidden_groups', array( 'business solutions', 'coaching solutions' ) );
	$norm = fn( $t ) => strtolower( trim( preg_replace( '/\s+/u', ' ', str_replace( "\xC2\xA0", ' ', html_entity_decode( $t, ENT_QUOTES ) ) ) ) );
	$groups = array_values( array_filter( $groups, fn( $g ) => ! in_array( $norm( $g['title'] ), $hidden, true ) ) );
	foreach ( $groups as &$g ) { $g['title'] = trim( str_replace( "\xC2\xA0", ' ', html_entity_decode( $g['title'], ENT_QUOTES ) ) ); }
	return $groups;
}

/** The H1: SEOPress's optimised title when the page has one, else the page title. */
function hsg_faq_heading( int $post_id ): string {
	$t = trim( (string) get_post_meta( $post_id, '_seopress_titles_title', true ) );
	return '' !== $t ? $t : get_the_title( $post_id );
}

/**
 * FAQPage + BreadcrumbList in one graph, tied to the Organization so answer
 * engines know whose answers these are. SEOPress keeps title/description/OG.
 */
function hsg_faq_jsonld( array $groups, int $post_id ): string {
	$ents = array();
	foreach ( $groups as $g ) { foreach ( $g['items'] as $it ) {
		$ents[] = array( '@type' => 'Question', 'name' => $it['q'], 'acceptedAnswer' => array( '@type' => 'Answer', 'text' => trim( preg_replace( '/\s+/u', ' ', html_entity_decode( wp_strip_all_tags( $it['a'] ), ENT_QUOTES ) ) ) ) );
	} }
	if ( ! $ents ) { return ''; }
	$home = home_url( '/' ); $url = get_permalink( $post_id );
	$org = array( '@type' => 'Organization', '@id' => $home . '#organization', 'name' => 'Hiring Solutions Group', 'url' => $home );
	if ( function_exists( 'hsg_field' ) ) {
		if ( $p = trim( (string) hsg_field( 'site_phone', '' ) ) ) { $org['telephone'] = $p; }
		if ( $e = trim( (string) hsg_field( 'site_email', '' ) ) ) { $org['email'] = $e; }
	}
	$org['areaServed'] = 'Northern New Jersey';
	$graph = array(
		$org,
		array( '@type' => 'WebSite', '@id' => $home . '#website', 'url' => $home, 'name' => 'Hiring Solutions Group', 'publisher' => array( '@id' => $home . '#organization' ) ),
		array( '@type' => 'BreadcrumbList', 'itemListElement' => array(
			array( '@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => $home ),
			array( '@type' => 'ListItem', 'position' => 2, 'name' => 'FAQ', 'item' => $url ),
		) ),
		array( '@type' => 'FAQPage', '@id' => $url . '#faq', 'url' => $url, 'name' => hsg_faq_heading( $post_id ),
			'description' => (string) get_post_meta( $post_id, '_seopress_titles_desc', true ),
			'dateModified' => get_the_modified_date( 'c', $post_id ), 'inLanguage' => 'en-US',
			'isPartOf' => array( '@id' => $home . '#website' ), 'about' => array( '@id' => $home . '#organization' ),
			'mainEntity' => $ents ),
	);
	return '<script type="application/ld+json">' . wp_json_encode( array( '@context' => 'https://schema.org', '@graph' => $graph ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>';
}

/**
 * /llms.txt — a plain-text map of the site for LLM crawlers (GEO). Served by
 * the theme so nothing has to be uploaded; flush permalinks once after adding.
 */
add_action( 'init', function () { add_rewrite_rule( '^llms\.txt$', 'index.php?hsg_llms=1', 'top' ); } );
add_filter( 'query_vars', function ( $v ) { $v[] = 'hsg_llms'; return $v; } );
add_action( 'template_redirect', function () {
	if ( ! get_query_var( 'hsg_llms' ) ) { return; }
	$h = fn( $p ) => home_url( $p );
	$lines = array(
		'# Hiring Solutions Group',
		'> Executive recruiting and career solutions firm in Northern New Jersey with three decades of executive search: Collaborative Search®, candidate assessment, private vetting, forensic interviewing, and career strategy for professionals.',
		'', '## Key pages',
		'- [Home](' . $h( '/' ) . '): what HSG does for companies and for professionals',
		'- [FAQ](' . $h( '/faqs/' ) . '): direct answers about executive search, fees, timelines and working with a recruiter',
		'- [Articles](' . $h( '/articles/' ) . '): the HSG journal on hiring, interviewing, leadership and career strategy',
		'- [Situations Wanted](' . $h( '/situations-wanted/' ) . '): professionals HSG is representing, by role group',
		'- [Job Board](' . $h( '/job-search-2/' ) . '): open positions',
		'- [About](' . $h( '/about-us/' ) . '): Michael Schlager and the firm',
		'- [Contact](' . $h( '/contact/' ) . ')',
	);
	nocache_headers(); header( 'Content-Type: text/plain; charset=utf-8' ); echo implode( "\n", $lines ), "\n"; exit;
} );
