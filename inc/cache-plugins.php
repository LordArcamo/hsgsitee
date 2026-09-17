<?php
/**
 * Caching plugins. The theme ships one hand-built CSS file and one bundled,
 * minified JS file; re-minifying them buys nothing and (WP Rocket, 2026-09-18)
 * produced a truncated stylesheet. Exclude them. Page caching is still welcome.
 */
defined( 'ABSPATH' ) || exit;
add_filter( 'rocket_exclude_css', fn( $ex ) => array_merge( (array) $ex, array( '/wp-content/themes/hsg/assets/css/(.*).css' ) ) );
add_filter( 'rocket_exclude_js',  fn( $ex ) => array_merge( (array) $ex, array( '/wp-content/themes/hsg/assets/js/(.*).js' ) ) );
add_filter( 'rocket_delay_js_exclusions', fn( $ex ) => array_merge( (array) $ex, array( 'themes/hsg/assets/js/main.js', 'hsg-jobs', 'hsg-shortlist', 'topechelon', 'JobBoardConfig' ) ) );
add_filter( 'rocket_exclude_defer_js', fn( $ex ) => array_merge( (array) $ex, array( 'themes/hsg/assets/js/main.js' ) ) );
add_filter( 'rocket_minify_excluded_external_js', fn( $ex ) => array_merge( (array) $ex, array( 'bb3jobboard.topechelon.com' ) ) );
