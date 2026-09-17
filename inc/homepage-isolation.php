<?php
/**
 * Homepage isolation.
 *
 * The bespoke homepage ships its own CSS and JS and needs nothing from the
 * page builder or from plugins that decorate every page (popups, sliders,
 * forms). Several of those enqueue late (in the footer), after any
 * wp_enqueue_scripts hook has run, so the filtering happens at print time:
 * print_styles_array / print_scripts_array see the final, dependency-resolved
 * handle list right before it is output, in both head and footer.
 */
defined( 'ABSPATH' ) || exit;

/** Asset sources and handles that must not load on the homepage. Filterable. */
function hsg_home_blocked_asset_patterns(): array {
	return apply_filters( 'hsg_home_blocked_asset_patterns', array(
		'src'    => '#/(themes/Avada|fusion-builder|fusion-core|uploads/fusion-scripts|uploads/fusion-styles|popup-maker|LayerSlider|gravityforms|real-time-auto-find-and-replace|elegant-elements|google\.com/recaptcha|gstatic\.com/recaptcha)/?#i',
		'handle' => '/^(avada|fusion|awb|popup-maker|pum|layerslider|ls-|gform|gforms|recaptcha|elegant|seopress-analytics|jquery|wp-block-|global-styles|classic-theme-styles|wp-img-auto-sizes|core-block-supports|wp-emoji|child-style|hsg-avada-pages)/i',
	) );
}

function hsg_home_filter_handles( array $handles, string $type ): array {
	if ( ! hsg_is_home_template() ) { return $handles; }
	$p = hsg_home_blocked_asset_patterns();
	$reg = ( 'style' === $type ) ? wp_styles()->registered : wp_scripts()->registered;
	return array_values( array_filter( $handles, function ( $h ) use ( $p, $reg ) {
		if ( preg_match( $p['handle'], (string) $h ) ) { return false; }
		$src = isset( $reg[ $h ] ) ? (string) $reg[ $h ]->src : '';
		return ! ( $src && preg_match( $p['src'], $src ) );
	} ) );
}
add_filter( 'print_styles_array',  fn( $h ) => hsg_home_filter_handles( (array) $h, 'style' ),  PHP_INT_MAX );
add_filter( 'print_scripts_array', fn( $h ) => hsg_home_filter_handles( (array) $h, 'script' ), PHP_INT_MAX );

/** Popup Maker: no popups on the homepage (they belong to the old builder page). */
add_filter( 'pum_popup_is_loadable', fn( $loadable ) => hsg_is_home_template() ? false : $loadable, 99 );

/** WordPress core: global styles are enqueued from wp_footer on classic themes; keep them off the homepage. */
add_action( 'template_redirect', function () {
	if ( ! hsg_is_home_template() ) { return; }
	remove_action( 'wp_enqueue_scripts', 'wp_enqueue_global_styles' );
	remove_action( 'wp_footer', 'wp_enqueue_global_styles', 1 );
	remove_action( 'wp_enqueue_scripts', 'wp_enqueue_classic_theme_styles' );
	add_filter( 'should_load_separate_core_block_assets', '__return_false' );
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
} );

/** Inline blocks printed straight into the footer by Fusion (e.g. css-fb-visibility): strip on the homepage. */
add_action( 'wp_footer', function () { if ( hsg_is_home_template() ) { ob_start(); } }, PHP_INT_MIN );
add_action( 'wp_footer', function () {
	if ( ! hsg_is_home_template() ) { return; }
	$f = ob_get_clean();
	$f = preg_replace( '#<style[^>]*id="(fusion|awb|avada|css-fb)[^"]*"[^>]*>.*?</style>\s*#si', '', $f );
	$f = preg_replace( '#<script[^>]*id="(fusion|awb|avada)[^"]*"[^>]*>.*?</script>\s*#si', '', $f );
	$f = hsg_home_strip_inline_jquery( $f );
	echo $f;
}, PHP_INT_MAX );

/**
 * Inline scripts that assume jQuery (or Avada's nav) are dead on the homepage,
 * where neither exists: they would only throw. GA4's gtag snippet is untouched.
 */
function hsg_home_strip_inline_jquery( string $html ): string {
	return preg_replace_callback( '#<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>\s*#si', function ( $m ) {
		return preg_match( '/jQuery\s*\(|\$\(document\)|fusionNavIsCollapsed|resume-submit-form-container/', $m[1] ) ? '' : $m[0];
	}, $html );
}
