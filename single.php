<?php
get_header( 'home' ); the_post();
$cat = hsg_post_category( get_post() ); $lane = hsg_category_lane( $cat ); $mins = hsg_reading_time( get_post() );
$related = get_posts( array( 'numberposts' => 3, 'post__not_in' => array( get_the_ID() ), 'category' => $cat ? $cat->term_id : 0, 'post_status' => 'publish' ) );
if ( count( $related ) < 3 ) { $related = get_posts( array( 'numberposts' => 3, 'post__not_in' => array( get_the_ID() ), 'post_status' => 'publish' ) ); }
?>
<div class="post-progress" aria-hidden="true"></div>
<article <?php post_class( 'post-article' ); ?> data-lane="<?php echo esc_attr( $lane ); ?>">
	<header class="post-hero">
		<div class="wrap post-hero__in">
			<p class="jrnl-entry__kicker rv"><a class="jrnl-back" href="<?php echo esc_url( home_url( '/articles/' ) ); ?>">← Insights</a><?php if ( $cat ) : ?><a class="jrnl-cat" href="<?php echo esc_url( get_category_link( $cat ) ); ?>"><?php echo esc_html( $cat->name ); ?></a><?php endif; ?></p>
			<h1 class="post-title rv" style="--d:1"><?php the_title(); ?></h1>
			<p class="post-standfirst rv" style="--d:2"><?php echo esc_html( hsg_post_excerpt( get_post(), 40 ) ); ?></p>
			<div class="post-byline rv" style="--d:3">
				<span class="jrnl-byline__mark" aria-hidden="true"><?php echo esc_html( hsg_initials( get_the_author() ) ); ?></span>
				<div><p class="post-byline__name"><?php the_author(); ?></p><p class="jrnl-meta"><time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo esc_html( get_the_date( 'F j, Y' ) ); ?></time><span class="jrnl-meta__sep" aria-hidden="true">·</span><?php echo (int) $mins; ?> min read</p></div>
			</div>
		</div>
		<?php if ( has_post_thumbnail() ) : ?>
		<figure class="post-figure rv" style="--d:2"><?php the_post_thumbnail( 'full', array( 'loading' => 'eager', 'fetchpriority' => 'high', 'sizes' => '(max-width: 1100px) 100vw, 1100px' ) ); ?><?php $cap = get_the_post_thumbnail_caption(); if ( $cap ) : ?><figcaption><?php echo esc_html( $cap ); ?></figcaption><?php endif; ?></figure>
		<?php endif; ?>
	</header>
	<div class="wrap"><div class="post-body"><?php the_content(); ?></div></div>
	<footer class="post-foot"><div class="wrap post-foot__in">
		<div class="post-share"><span class="eyebrow">Share</span><a href="https://www.linkedin.com/sharing/share-offsite/?url=<?php echo rawurlencode( get_permalink() ); ?>" rel="noopener" target="_blank">LinkedIn</a><a href="mailto:?subject=<?php echo rawurlencode( get_the_title() ); ?>&amp;body=<?php echo rawurlencode( get_permalink() ); ?>">Email</a><button type="button" class="post-copy" data-copy="<?php echo esc_url( get_permalink() ); ?>">Copy link</button></div>
		<a class="btn" href="<?php echo esc_url( home_url( '/#close' ) ); ?>">Talk to HSG <span class="arrow" aria-hidden="true">→</span></a>
	</div></footer>
</article>
<?php if ( $related ) : ?>
<section class="sec sec--soft sec--tight post-related"><div class="wrap">
	<div class="sec-head rv"><p class="eyebrow is-brand">Continue reading</p><h2>More from the journal.</h2></div>
	<div class="jrnl-grid jrnl-grid--3"><?php global $post; foreach ( $related as $i => $post ) { setup_postdata( $post ); get_template_part( 'template-parts/blog/entry', null, array( 'index' => $i ) ); } wp_reset_postdata(); ?></div>
</div></section>
<?php endif; get_footer( 'home' );
