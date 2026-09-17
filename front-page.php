<?php
/**
 * Homepage — the one template this child theme owns outright. It uses its
 * own header/footer (header-home.php / footer-home.php) rather than Avada's
 * Layout Builder header and footer, which continue to serve every other page.
 * Sections render from template-parts/home/ in natural filename order.
 */
get_header( 'home' );
$parts = glob( get_stylesheet_directory() . '/template-parts/home/*.php' );
natsort( $parts );
foreach ( $parts as $part ) { include $part; }
get_footer( 'home' );
