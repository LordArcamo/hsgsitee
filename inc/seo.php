<?php
/** Head output the design's BaseLayout produced: description, theme-color, icons, OG, JSON-LD. */
defined( 'ABSPATH' ) || exit;

add_filter( 'language_attributes', fn( $a ) => hsg_is_home_template() ? $a . ' data-theme="light"' : $a );

add_action( 'wp_head', function () {
	if ( ! hsg_is_home_template() ) { return; }
	$seo_plugin = defined( 'SEOPRESS_VERSION' ) || class_exists( 'WPSEO_Options' ) || defined( 'RANK_MATH_VERSION' );
	$desc = is_front_page() ? hsg_field( 'site_meta_description' ) : ( is_singular( 'post' ) ? hsg_post_excerpt( get_post(), 30 ) : 'Insights on executive recruiting, interviewing and career strategy from Hiring Solutions Group.' );
	$img  = hsg_img( 'brand/og-image.png' );
	$title = wp_get_document_title();
	if ( ! $seo_plugin ) { echo '<meta name="description" content="' . esc_attr( $desc ) . '">' . "\n"; }
	echo '<meta name="theme-color" content="#5a2d91">' . "\n";
	echo '<link rel="icon" href="' . hsg_img( 'brand/favicon-32.png' ) . '" sizes="32x32" type="image/png">' . "\n";
	echo '<link rel="icon" href="' . hsg_img( 'brand/favicon-192.png' ) . '" sizes="192x192" type="image/png">' . "\n";
	echo '<link rel="apple-touch-icon" href="' . hsg_img( 'brand/favicon-180.png' ) . '">' . "\n";
	if ( $seo_plugin ) { return; } // SEOPress prints OG, Twitter and the EmploymentAgency schema
	foreach ( array( 'og:type' => 'website', 'og:site_name' => get_bloginfo( 'name' ), 'og:title' => $title, 'og:description' => $desc, 'og:url' => home_url( add_query_arg( array() ) ), 'og:image' => $img ) as $p => $c ) {
		echo '<meta property="' . esc_attr( $p ) . '" content="' . esc_attr( $c ) . '">' . "\n";
	}
	foreach ( array( 'twitter:card' => 'summary_large_image', 'twitter:title' => $title, 'twitter:description' => $desc, 'twitter:image' => $img ) as $n => $c ) {
		echo '<meta name="' . esc_attr( $n ) . '" content="' . esc_attr( $c ) . '">' . "\n";
	}
	if ( ! is_front_page() ) { return; }
	$ld = array(
		'@context' => 'https://schema.org', '@type' => 'EmploymentAgency',
		'name' => get_bloginfo( 'name' ), 'description' => $desc, 'url' => home_url( '/' ),
		'telephone' => hsg_field( 'site_phone_href' ), 'email' => hsg_field( 'site_email' ), 'slogan' => hsg_field( 'site_tagline' ),
		'founder' => array( '@type' => 'Person', 'name' => 'Michael Schlager' ),
		'address' => array( '@type' => 'PostalAddress', 'streetAddress' => hsg_field( 'site_street' ), 'addressLocality' => hsg_field( 'site_city' ), 'addressRegion' => hsg_field( 'site_region' ), 'postalCode' => hsg_field( 'site_zip' ), 'addressCountry' => 'US' ),
		'areaServed' => array_map( fn( $n ) => array( '@type' => 'AdministrativeArea', 'name' => $n ), hsg_area_served() ),
		'knowsAbout' => array( 'Executive recruiting', 'Executive search', 'Career coaching', 'Candidate vetting', 'Executive interviewing' ),
	);
	echo '<script type="application/ld+json">' . wp_json_encode( $ld, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}, 5 );

add_filter( 'pre_get_document_title', function ( $t ) {
	if ( defined( 'SEOPRESS_VERSION' ) ) { return $t; }
	return is_front_page() ? 'Hiring Solutions Group — Executive Recruiting & Career Solutions in New Jersey' : $t;
} );
