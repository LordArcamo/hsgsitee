<?php /* Insights index — /articles/ once that page is set as the Posts page. */
get_header( 'home' );
get_template_part( 'template-parts/blog/masthead', null, array( 'title' => 'Insights', 'show_filters' => true ) );
?>
<section class="sec sec--tight jrnl">
	<div class="wrap">
	<?php if ( have_posts() ) : ?>
		<?php if ( ! is_paged() ) { the_post(); get_template_part( 'template-parts/blog/lead' ); rewind_posts(); } ?>
		<?php get_template_part( 'template-parts/blog/grid', null, array( 'skip_first' => ! is_paged() ) ); ?>
	<?php else : ?><p class="lede">Nothing published yet.</p><?php endif; ?>
	</div>
</section>
<?php get_footer( 'home' );
