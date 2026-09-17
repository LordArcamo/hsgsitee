<?php
get_header( 'home' );
$title = is_category() ? single_cat_title( '', false ) : ( is_tag() ? single_tag_title( '', false ) : ( is_author() ? get_the_author() : get_the_archive_title() ) );
$kicker = is_category() ? 'Topic' : ( is_tag() ? 'Tagged' : ( is_author() ? 'Written by' : 'Archive' ) );
get_template_part( 'template-parts/blog/masthead', null, array( 'title' => esc_html( $title ), 'kicker' => $kicker, 'dek' => ( is_category() && category_description() ) ? wp_strip_all_tags( category_description() ) : sprintf( '%d article%s.', (int) $wp_query->found_posts, 1 === (int) $wp_query->found_posts ? '' : 's' ), 'show_filters' => true ) );
?>
<section class="sec sec--tight jrnl"><div class="wrap">
	<?php if ( have_posts() ) : get_template_part( 'template-parts/blog/grid' ); else : ?><p class="lede">Nothing here yet.</p><?php endif; ?>
</div></section>
<?php get_footer( 'home' );
