<?php
/* One journal entry. $args: index (int), lead (bool) */
$i = (int) ( $args['index'] ?? 0 ); $cat = hsg_post_category( get_post() ); $lane = hsg_category_lane( $cat );
?>
<article class="jrnl-entry rv" style="--d:<?php echo min( $i % 6, 5 ); ?>" data-lane="<?php echo esc_attr( $lane ); ?>">
	<a class="jrnl-entry__img" href="<?php the_permalink(); ?>" tabindex="-1" aria-hidden="true">
		<?php the_post_thumbnail( 'large', array( 'loading' => 'lazy', 'sizes' => '(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw' ) ); ?>
	</a>
	<div class="jrnl-entry__body">
		<p class="jrnl-entry__kicker"><span class="jrnl-entry__n"><?php printf( '%02d', $i + 1 ); ?></span><?php if ( $cat ) : ?><a class="jrnl-cat" href="<?php echo esc_url( get_category_link( $cat ) ); ?>"><?php echo esc_html( $cat->name ); ?></a><?php endif; ?></p>
		<h3 class="jrnl-entry__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
		<p class="jrnl-entry__excerpt"><?php echo esc_html( hsg_post_excerpt( get_post(), 24 ) ); ?></p>
		<p class="jrnl-meta"><time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo esc_html( get_the_date( 'M j, Y' ) ); ?></time><span class="jrnl-meta__sep" aria-hidden="true">·</span><?php echo (int) hsg_reading_time( get_post() ); ?> min read</p>
	</div>
</article>
