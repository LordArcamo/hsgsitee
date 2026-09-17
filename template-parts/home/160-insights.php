<?php
/* Real posts when the site has them; the design's placeholders otherwise. */
$posts = get_posts( array( 'numberposts' => 4, 'post_status' => 'publish' ) );
$feature = $posts ? array_shift( $posts ) : null;
$side = $posts;
$archive = hsg_link( 'ins_cta_link' );
$meta = fn( $p ) => '<span class="jrnl-meta"><time datetime="' . esc_attr( get_the_date( 'c', $p ) ) . '">' . esc_html( get_the_date( 'M j, Y', $p ) ) . '</time><span class="jrnl-meta__sep" aria-hidden="true">·</span>' . (int) hsg_reading_time( $p ) . ' min read</span>';
?>
<section class="sec sec--soft" id="insights">
	<div class="wrap">
		<div class="ins-head rv">
			<div class="sec-head"><p class="eyebrow is-brand">From the HSG Journal</p><h2><?php hsg_e( 'ins_h2' ); ?></h2><p class="ins-intro"><?php hsg_e( 'ins_intro' ); ?></p></div>
			<a class="textlink ins-all" href="<?php echo $archive; ?>">All articles <span class="arrow" aria-hidden="true">→</span></a>
		</div>
		<div class="pillars">
			<div class="pillar rv" style="--c:var(--accent); --d:1">Executive Recruiting</div><div class="pillar rv" style="--c:var(--hiring); --d:2">Forensic Interviewing</div>
			<div class="pillar rv" style="--c:var(--career-fill); --d:3">Talent &amp; Leadership</div><div class="pillar rv" style="--c:var(--accent); --d:4">Executive Career Strategy</div>
		</div>
		<div class="ins-grid">
			<?php if ( $feature ) : $cat = hsg_post_category( $feature ); ?>
			<a class="feature rv" href="<?php echo esc_url( get_permalink( $feature ) ); ?>" style="--d:1" data-lane="<?php echo esc_attr( hsg_category_lane( $cat ) ); ?>">
				<div class="feature-img"><?php echo has_post_thumbnail( $feature ) ? get_the_post_thumbnail( $feature, 'large', array( 'loading' => 'lazy', 'sizes' => '(max-width: 940px) 100vw, 58vw' ) ) : ''; ?><span class="feature-tag">Latest</span></div>
				<div class="feature-body"><span class="cat"><?php echo $cat ? esc_html( $cat->name ) : 'Insights'; ?></span><h3><?php echo esc_html( get_the_title( $feature ) ); ?></h3><p><?php echo esc_html( hsg_post_excerpt( $feature, 26 ) ); ?></p><?php echo $meta( $feature ); ?><span class="textlink">Read the article <span class="arrow" aria-hidden="true">→</span></span></div>
			</a>
			<?php else : ?>
			<a class="feature rv" href="<?php echo $archive; ?>" style="--d:1"><div class="feature-img">Featured article image</div><div class="feature-body"><span class="cat">Forensic Interviewing</span><h3>The Questions That Get Past a Rehearsed Answer</h3><p>Most interviews test how well someone prepares. A few test how someone actually thinks.</p><span class="textlink">Read the article <span class="arrow" aria-hidden="true">→</span></span></div></a>
			<?php endif; ?>
			<div class="ins-side">
				<?php if ( $side ) : foreach ( $side as $i => $p ) : $c = hsg_post_category( $p ); $has = has_post_thumbnail( $p ); ?>
				<a class="ins-item rv<?php echo $has ? '' : ' ins-item--nothumb'; ?>" href="<?php echo esc_url( get_permalink( $p ) ); ?>" style="--d:<?php echo $i + 2; ?>" data-lane="<?php echo esc_attr( hsg_category_lane( $c ) ); ?>">
					<?php if ( $has ) : ?><span class="ins-item__thumb"><?php echo get_the_post_thumbnail( $p, 'medium', array( 'loading' => 'lazy' ) ); ?></span><?php endif; ?>
					<span class="ins-item__body"><span class="kind"><?php echo $c ? esc_html( $c->name ) : 'Insights'; ?></span><h4><?php echo esc_html( get_the_title( $p ) ); ?></h4><?php echo $meta( $p ); ?></span>
				</a>
				<?php endforeach; else : foreach ( array( array( 'Talent &amp; Leadership', 'HR for 2024 and Beyond' ), array( 'Executive Career Strategy', 'A Home Office, Away From Home' ), array( 'Executive Recruiting', 'Why Hire an Executive Recruiter?' ) ) as $i => $p ) : ?>
				<a class="ins-item ins-item--nothumb rv" href="<?php echo $archive; ?>" style="--d:<?php echo $i + 2; ?>"><span class="ins-item__body"><span class="kind">Article · <?php echo $p[0]; ?></span><h4><?php echo $p[1]; ?></h4></span></a>
				<?php endforeach; endif; ?>
				<a class="ins-more rv" href="<?php echo $archive; ?>" style="--d:5"><span><?php echo (int) wp_count_posts()->publish; ?> articles in the journal</span><span class="textlink"><?php hsg_e( 'ins_cta' ); ?> <span class="arrow" aria-hidden="true">→</span></span></a>
			</div>
		</div>
	</div>
</section>
