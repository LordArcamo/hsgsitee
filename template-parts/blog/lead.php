<?php $cat = hsg_post_category( get_post() ); $lane = hsg_category_lane( $cat ); ?>
<article class="jrnl-lead rv" data-lane="<?php echo esc_attr( $lane ); ?>">
	<a class="jrnl-lead__img" href="<?php the_permalink(); ?>" tabindex="-1" aria-hidden="true">
		<?php the_post_thumbnail( 'large', array( 'loading' => 'eager', 'fetchpriority' => 'high', 'sizes' => '(max-width: 900px) 100vw, 56vw' ) ); ?>
		<span class="jrnl-lead__tag">Latest</span>
	</a>
	<div class="jrnl-lead__body">
		<p class="jrnl-entry__kicker"><?php if ( $cat ) : ?><a class="jrnl-cat" href="<?php echo esc_url( get_category_link( $cat ) ); ?>"><?php echo esc_html( $cat->name ); ?></a><?php endif; ?></p>
		<h2 class="jrnl-lead__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
		<p class="jrnl-lead__standfirst"><?php echo esc_html( hsg_post_excerpt( get_post(), 42 ) ); ?></p>
		<p class="jrnl-meta"><span class="jrnl-byline__mark" aria-hidden="true"><?php echo esc_html( hsg_initials( get_the_author() ) ); ?></span><?php the_author(); ?><span class="jrnl-meta__sep" aria-hidden="true">·</span><time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo esc_html( get_the_date( 'M j, Y' ) ); ?></time><span class="jrnl-meta__sep" aria-hidden="true">·</span><?php echo (int) hsg_reading_time( get_post() ); ?> min read</p>
		<a class="textlink" href="<?php the_permalink(); ?>">Read the article <span class="arrow" aria-hidden="true">→</span></a>
	</div>
</article>
