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
	return array_values( array_filter( $groups, fn( $g ) => ! in_array( strtolower( trim( $g['title'] ) ), $hidden, true ) ) );
}

function hsg_faq_jsonld( array $groups ): string {
	$ents = array();
	foreach ( $groups as $g ) { foreach ( $g['items'] as $it ) {
		$ents[] = array( '@type' => 'Question', 'name' => $it['q'], 'acceptedAnswer' => array( '@type' => 'Answer', 'text' => trim( preg_replace( '/\s+/u', ' ', html_entity_decode( wp_strip_all_tags( $it['a'] ), ENT_QUOTES ) ) ) ) );
	} }
	if ( ! $ents ) { return ''; }
	return '<script type="application/ld+json">' . wp_json_encode( array( '@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => $ents ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>';
}
