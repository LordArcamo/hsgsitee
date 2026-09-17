<?php
/** Front-end assets: one CSS file, one deferred JS bundle, two preloaded font files. */
defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', function () {
	if ( ! hsg_is_home_template() ) { return; }
	$dir = get_stylesheet_directory(); $uri = get_stylesheet_directory_uri();
	wp_enqueue_style( 'hsg', $uri . '/assets/css/hsg.css', array(), filemtime( $dir . '/assets/css/hsg.css' ) );
	wp_enqueue_script( 'hsg', $uri . '/assets/js/main.js', array(), filemtime( $dir . '/assets/js/main.js' ), array( 'strategy' => 'defer' ) );
	// no jQuery, no block CSS on the front end
	wp_deregister_script( 'jquery' );
	wp_dequeue_style( 'wp-block-library' ); wp_dequeue_style( 'global-styles' ); wp_dequeue_style( 'classic-theme-styles' );
}, 100 );

add_action( 'wp_head', function () {
	if ( ! hsg_is_home_template() ) { return; }
	$uri = get_stylesheet_directory_uri();
	foreach ( array( 400, 800 ) as $w ) {
		echo '<link rel="preload" href="' . esc_url( $uri . "/assets/fonts/inter-latin-$w-normal.woff2" ) . '" as="font" type="font/woff2" crossorigin>' . "\n";
	}
}, 1 );

remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'wp_head', 'wp_generator' ); remove_action( 'wp_head', 'wp_oembed_add_discovery_links' ); remove_action( 'wp_head', 'wp_oembed_add_host_js' );
remove_action( 'wp_head', 'rest_output_link_wp_head' ); remove_action( 'wp_head', 'wlwmanifest_link' ); remove_action( 'wp_head', 'rsd_link' ); remove_action( 'wp_head', 'wp_shortlink_wp_head' );
add_filter( 'the_generator', '__return_empty_string' );
