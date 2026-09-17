<?php
/**
 * Living inside Avada.
 *
 * This theme is an Avada child. Avada renders every page; this file carves
 * the homepage out of it: forces our template past Avada's Template Builder,
 * strips Avada's CSS/JS from that one page so the design's stylesheet is the
 * only one, and keeps the old child theme's styles on all the other pages.
 */
defined( 'ABSPATH' ) || exit;

/** Is this request the bespoke homepage (and not the Avada live editor)? */
function hsg_is_home_template(): bool { return hsg_uses_new_chrome(); } // historical name; means "rendered by the new chrome"


/** Avada's Template Builder filters template_include at 51; we win at 9999. */
add_filter( 'template_include', function ( $template ) {
	return hsg_is_home_template() ? hsg_new_chrome_template() : $template;
}, 9999 );

/** On the homepage, dequeue everything Avada / Fusion enqueued. Runs after Avada (priority 9999). */
add_action( 'wp_enqueue_scripts', function () {
	if ( ! hsg_is_home_template() ) { return; }
	$is_avada = function ( $src, $handle ) {
		return preg_match( '#/(themes/Avada|fusion-builder|fusion-core)/#', (string) $src ) || preg_match( '/^(avada|fusion|awb|font-awesome|fontawesome)/i', $handle );
	};
	foreach ( wp_styles()->queue as $h ) { $o = wp_styles()->registered[ $h ] ?? null; if ( $o && $is_avada( $o->src, $h ) ) { wp_dequeue_style( $h ); } }
	foreach ( wp_scripts()->queue as $h ) { $o = wp_scripts()->registered[ $h ] ?? null; if ( $o && $is_avada( $o->src, $h ) ) { wp_dequeue_script( $h ); } }
	wp_dequeue_style( 'child-style' ); wp_dequeue_style( 'hsg-avada-pages' );
}, 9999 );

/** Avada prints its dynamic CSS and Google-font links directly into wp_head; drop those on the homepage too. */
add_action( 'wp_head', function () {
	if ( ! hsg_is_home_template() ) { return; }
	ob_start();
}, 0 );
add_action( 'wp_head', function () {
	if ( ! hsg_is_home_template() ) { return; }
	$head = ob_get_clean();
	// keep everything that isn't an Avada/Fusion inline block or asset
	$head = preg_replace( '#<style[^>]*id="(fusion|awb|avada|css-fb|elegant)[^"]*"[^>]*>.*?</style>#si', '', $head );
	$head = preg_replace( '#<link[^>]+(themes/Avada|fusion-builder|fusion-core|fonts\.googleapis)[^>]*>\s*#i', '', $head );
	$head = preg_replace( '#<script[^>]*(themes/Avada|fusion-builder|fusion-core)[^>]*>.*?</script>\s*#si', '', $head );
	$head = preg_replace( '#<script[^>]*id="(fusion|awb|avada)[^"]*"[^>]*>.*?</script>\s*#si', '', $head );
	if ( function_exists( 'hsg_home_strip_inline_jquery' ) ) { $head = hsg_home_strip_inline_jquery( $head ); }
	echo $head;
}, PHP_INT_MAX );

/** The old child theme's stylesheet, on Avada pages only. */
add_action( 'wp_enqueue_scripts', function () {
	if ( hsg_is_home_template() ) { return; }
	wp_enqueue_style( 'hsg-avada-pages', get_stylesheet_directory_uri() . '/assets/css/avada-pages.css', array( 'avada-stylesheet' ), filemtime( get_stylesheet_directory() . '/assets/css/avada-pages.css' ) );
}, 20 );
