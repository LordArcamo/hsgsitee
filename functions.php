<?php
/**
 * Hiring Solutions Group — theme bootstrap.
 * One concern per file under inc/. Templates read content through hsg_field().
 */
defined( 'ABSPATH' ) || exit;
define( 'HSG_VER', '0.2.0' );

foreach ( array( 'site', 'nav', 'blog', 'shortlist-data', 'fields', 'jobs', 'situations', 'roles', 'leads', 'faq', 'seo', 'assets', 'avada', 'homepage-isolation', 'cache-plugins', 'avada-legacy' ) as $inc ) { require get_stylesheet_directory() . "/inc/$inc.php"; }

add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
	add_theme_support( 'responsive-embeds' );
	add_image_size( 'hsg-feature', 900, 450, true );
	add_image_size( 'hsg-hero', 880, 968, true );
} );

/** Theme image helper: hsg_img( 'brand/hsg-logo-44.webp' ) */
function hsg_img( string $file ): string { return esc_url( get_stylesheet_directory_uri() . '/assets/img/' . ltrim( $file, '/' ) ); }

/** ACF: keep any UI-created field groups in the theme as JSON. */
add_filter( 'acf/settings/save_json', fn() => get_stylesheet_directory() . '/acf-json' );
add_filter( 'acf/settings/load_json', fn( $p ) => array( get_stylesheet_directory() . '/acf-json' ) );
