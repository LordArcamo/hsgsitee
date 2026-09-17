<?php
get_header( 'home' );
get_template_part( 'template-parts/blog/masthead', null, array( 'title' => 'Search', 'kicker' => 'Results for', 'dek' => sprintf( '%d result%s for “%s”.', (int) $wp_query->found_posts, 1 === (int) $wp_query->found_posts ? '' : 's', get_search_query() ), 'show_filters' => false ) );
?>
<section class="sec sec--tight jrnl"><div class="wrap">
	<form class="jrnl-search" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>"><label class="sr-only" for="s">Search</label><input id="s" type="search" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="Search the journal"><button class="btn" type="submit">Search</button></form>
	<?php if ( have_posts() ) : get_template_part( 'template-parts/blog/grid' ); else : ?><p class="lede">No matches. Try a broader phrase.</p><?php endif; ?>
</div></section>
<?php get_footer( 'home' );
