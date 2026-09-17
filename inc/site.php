<?php
/**
 * Site-wide values with sensible defaults. Every one is overridable from the
 * Home page's "Site" tab in the editor (see inc/fields.php); these are the
 * values the site ships with, taken from the approved design.
 */
defined( 'ABSPATH' ) || exit;

/** Read a field from the front page; fall back to the registry default. */
function hsg_field( string $name, $fallback = null ) {
	static $front = null;
	if ( null === $front ) { $front = (int) get_option( 'page_on_front' ); }
	$v = ( function_exists( 'get_field' ) && $front ) ? get_field( $name, $front ) : null;
	if ( null === $v || '' === $v || array() === $v ) {
		$v = ( null !== $fallback ) ? $fallback : hsg_field_default( $name );
	}
	return $v;
}
/** echo, HTML-escaped */
function hsg_e( string $name ): void { echo esc_html( (string) hsg_field( $name ) ); }
/** echo, allowing the inline HTML the design uses (b, strong, a, sup, br) */
function hsg_kses( string $name ): void { echo wp_kses( (string) hsg_field( $name ), array( 'b'=>array(), 'strong'=>array(), 'em'=>array(), 'sup'=>array(), 'br'=>array(), 'a'=>array( 'href'=>true, 'rel'=>true, 'target'=>true ) ) ); }
/** In-page anchor that still works from another page. */
function hsg_anchor( string $id ): string {
	if ( str_starts_with( $id, '/' ) || str_starts_with( $id, 'http' ) ) { return esc_url( str_starts_with( $id, '/' ) ? home_url( $id ) : $id ); }
	return esc_url( ( is_front_page() ? '' : home_url( '/' ) ) . '#' . $id );
}
/** A CTA href field that may be an anchor id ("close") or a full URL. */
function hsg_link( string $name ): string {
	$v = trim( (string) hsg_field( $name ) );
	if ( '' === $v || '#' === $v ) { return '#'; }
	if ( preg_match( '/^[a-z0-9-]+$/i', $v ) ) { return hsg_anchor( $v ); }
	return esc_url( $v );
}
/** Split a "one per line" textarea into a clean array. */
function hsg_lines( string $name ): array {
	return array_values( array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) hsg_field( $name ) ) ) ) );
}
