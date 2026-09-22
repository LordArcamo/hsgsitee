<?php
/**
 * Insights (blog) — the second family of pages the child theme owns outright.
 * Same chrome as the homepage (header-home / footer-home), no Avada.
 */
defined( 'ABSPATH' ) || exit;

/** Every request the NEW chrome renders. Everything else is Avada's. */
function hsg_uses_new_chrome(): bool {
	if ( is_admin() || isset( $_GET['fb-edit'] ) || isset( $_GET['builder'] ) || isset( $_GET['awb-studio-content'] ) ) { return false; }
	return is_front_page() || is_home() || is_singular( 'post' ) || is_category() || is_tag() || is_author() || is_date() || is_search() || is_page_template( 'page-jobs.php' ) || is_page_template( 'page-situations.php' ) || is_page_template( 'page-faq.php' ) || is_page_template( 'page-city.php' );
}

/** The child theme's template for a new-chrome request (Avada's Template Builder must not win). */
function hsg_new_chrome_template(): string {
	if ( is_front_page() ) { return get_stylesheet_directory() . '/front-page.php'; }
	if ( is_page_template( 'page-jobs.php' ) ) { return get_stylesheet_directory() . '/page-jobs.php'; }
	if ( is_page_template( 'page-situations.php' ) ) { return get_stylesheet_directory() . '/page-situations.php'; }
	if ( is_page_template( 'page-faq.php' ) ) { return get_stylesheet_directory() . '/page-faq.php'; }
	if ( is_page_template( 'page-city.php' ) ) { return get_stylesheet_directory() . '/page-city.php'; }
	if ( is_singular( 'post' ) ) { return get_single_template(); }
	if ( is_home() ) { return get_home_template(); }
	if ( is_search() ) { return get_search_template(); }
	return get_archive_template();
}

/**
 * Posts were authored inside Avada's builder: the copy sits inside
 * [fusion_builder_container] > row > column > [fusion_text]. Those four are pure
 * layout wrappers — drop them (keeping their contents) so the article reads as
 * plain HTML. Real content shortcodes (imageframe, button, title…) stay and
 * still render through Fusion Builder.
 */
function hsg_unwrap_fusion( string $html ): string {
	$html = preg_replace( '#\[/?fusion_builder_(container|row|column|row_inner|column_inner)(\s[^\]]*)?\]#', '', $html );
	$html = preg_replace( '#\[fusion_text(\s[^\]]*)?\]#', '', $html );
	$html = str_replace( '[/fusion_text]', '', $html );
	// the builder's global-element / separator noise
	$html = preg_replace( '#\[fusion_separator[^\]]*\]#', '', $html );
	return trim( $html );
}
add_filter( 'the_content', function ( $c ) { return ( hsg_uses_new_chrome() && is_singular( 'post' ) ) ? hsg_unwrap_fusion( $c ) : $c; }, 9 );

/** Plain text of a post for excerpts / reading time: no shortcode tags, no HTML. */
function hsg_post_text( $post ): string {
	$t = hsg_unwrap_fusion( (string) get_post_field( 'post_content', $post ) );
	$t = preg_replace( '#\[/?[a-z_]+(\s[^\]]*)?\]#', '', $t );
	$t = preg_replace( '#</(p|div|li|h[1-6]|blockquote|br|tr|td|th)>|<br\s*/?>#i', ' ', $t ); // keep a space where a block ended
	$t = html_entity_decode( wp_strip_all_tags( $t ), ENT_QUOTES | ENT_HTML5, 'UTF-8' );
	return trim( preg_replace( '/[\s\x{00A0}]+/u', ' ', $t ) );
}
function hsg_post_excerpt( $post, int $words = 28 ): string {
	$e = trim( (string) get_post_field( 'post_excerpt', $post ) );
	return $e ? wp_strip_all_tags( $e ) : wp_trim_words( hsg_post_text( $post ), $words, '…' );
}
function hsg_reading_time( $post ): int { return max( 1, (int) round( str_word_count( hsg_post_text( $post ) ) / 220 ) ); }

/** The category shown on a card: first non-generic one. Colour lane by practice. */
function hsg_post_category( $post ) {
	$cats = get_the_category( $post );
	$skip = apply_filters( 'hsg_generic_categories', array( 'uncategorized', 'uncategorized-es', 'hsg', 'printable-page', 'location', 'hsg', 'hiring-solutions-group-services', 'humanresources', 'candidates', 'career-solutions-group', 'business-owners' ) );
	foreach ( $cats as $c ) { if ( ! in_array( $c->slug, $skip, true ) ) { return $c; } }
	return $cats[0] ?? null;
}
function hsg_category_lane( $cat ): string {
	if ( ! $cat ) { return 'brand'; }
	$s = $cat->slug . ' ' . strtolower( $cat->name );
	if ( preg_match( '/career|candidate|coach/', $s ) ) { return 'career'; }
	if ( preg_match( '/hiring|recruit|hr|human|business-owner|executive/', $s ) ) { return 'hire'; }
	return 'brand';
}
/** Categories offered as filters on the index: real, non-empty, not housekeeping. */
function hsg_blog_categories( int $max = 8 ): array {
	$skip = apply_filters( 'hsg_generic_categories', array( 'uncategorized', 'uncategorized-es', 'hsg', 'printable-page', 'location', 'hsg', 'hiring-solutions-group-services', 'humanresources', 'candidates', 'career-solutions-group', 'business-owners' ) );
	$cats = get_categories( array( 'orderby' => 'count', 'order' => 'DESC', 'hide_empty' => true ) );
	// Topics with fewer than three articles are noise in a filter bar; they stay reachable from the posts themselves.
	$cats = array_values( array_filter( $cats, fn( $c ) => ! in_array( $c->slug, $skip, true ) && (int) $c->count >= 3 ) );
	return array_slice( apply_filters( 'hsg_blog_categories', $cats ), 0, $max );
}
/** Author initials for the byline mark. */
function hsg_initials( string $name ): string {
	$p = preg_split( '/\s+/', trim( $name ) );
	return strtoupper( substr( $p[0], 0, 1 ) . ( isset( $p[1] ) ? substr( end( $p ), 0, 1 ) : '' ) );
}


/** Client review 17 Sep 2026: the article hero already shows the featured image; drop its copy from the body when the post repeats it. */
add_filter( 'the_content', function ( $c ) {
	if ( ! hsg_uses_new_chrome() || ! is_singular( 'post' ) || ! has_post_thumbnail() ) { return $c; }
	$tid = (int) get_post_thumbnail_id(); $file = (string) get_attached_file( $tid );
	$stem = strtolower( preg_replace( '/(-\d+x\d+)?\.[a-z0-9]+$/i', '', basename( $file ) ) );
	$done = false;
	return preg_replace_callback( '/<figure\b[^>]*>\s*(?:<a\b[^>]*>)?\s*<img\b[^>]*>\s*(?:<\/a>)?\s*(?:<figcaption\b[^>]*>.*?<\/figcaption>)?\s*<\/figure>|<p\b[^>]*>\s*(?:<a\b[^>]*>)?\s*<img\b[^>]*>\s*(?:<\/a>)?\s*<\/p>|<img\b[^>]*>/is', function ( $m ) use ( &$done, $tid, $stem ) {
		if ( $done ) { return $m[0]; }
		$img = $m[0]; $hit = (bool) preg_match( '/\bwp-image-' . $tid . '\b/', $img );
		if ( ! $hit && '' !== $stem && preg_match( '/\bsrc="([^"]+)"/i', $img, $s ) ) {
			$b = strtolower( preg_replace( '/(-\d+x\d+)?\.[a-z0-9]+$/i', '', basename( (string) wp_parse_url( $s[1], PHP_URL_PATH ) ) ) );
			$hit = ( $b === $stem );
		}
		if ( $hit ) { $done = true; return ''; }
		return $m[0];
	}, $c );
}, 12 ); // after do_shortcode (11): Avada's fusion_imageframe only becomes an <img> then
