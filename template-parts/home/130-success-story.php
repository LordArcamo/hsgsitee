<section class="sec" id="story">
	<div class="wrap">
		<div class="sec-head rv" style="margin-bottom:clamp(30px,3.6vw,46px)"><p class="eyebrow is-brand">Featured Success Story</p><h2><?php hsg_e( 'story_h2' ); ?></h2></div>
		<div class="story-grid">
			<div class="story-vis rv" style="--d:1">
				<div class="story-metric"><b><?php hsg_e( 'story_m1' ); ?></b><span><?php hsg_e( 'story_m1_l' ); ?></span></div><div class="story-divider"></div>
				<div class="story-metric"><b><?php hsg_e( 'story_m2' ); ?></b><span><?php hsg_e( 'story_m2_l' ); ?></span></div><div class="story-divider"></div>
				<?php $tick = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>'; ?>
				<p class="eyebrow is-hire" style="margin-bottom:8px">How HSG helped</p>
				<ul class="story-did"><li><?php echo $tick; ?>Collaborative Search<sup>®</sup> with both owners</li><li><?php echo $tick; ?>Sat in on every interview</li><li><?php echo $tick; ?>Same assessment for both finalists</li></ul>
			</div>
			<div class="story-copy rv" style="--d:2">
				<p><?php hsg_e( 'story_p1' ); ?></p><p><?php hsg_e( 'story_p2' ); ?></p><p><?php hsg_e( 'story_p3' ); ?></p>
				<p class="turn"><?php hsg_e( 'story_turn' ); ?></p><p><?php hsg_e( 'story_p4' ); ?></p>
				<a class="btn" href="<?php echo hsg_link( 'story_cta_link' ); ?>"><?php hsg_e( 'story_cta' ); ?> <span class="arrow" aria-hidden="true">→</span></a>
			</div>
		</div>
	</div>
</section>
