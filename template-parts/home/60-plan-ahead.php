<section class="sec plan">
	<div class="wrap">
		<div class="plan-grid">
			<div class="plan-copy rv">
				<p class="eyebrow is-career">Plan Before You Have To</p>
				<h2 style="font-size:clamp(27px,3.3vw,42px)"><?php hsg_e( 'plan_h2' ); ?></h2>
				<p class="lede"><?php hsg_e( 'plan_lede' ); ?></p>
				<a class="btn btn--ghost" href="<?php echo hsg_anchor( 'career' ); ?>"><?php hsg_e( 'plan_cta' ); ?></a>
			</div>
			<figure class="bigquote rv" style="--d:1; margin:0"><blockquote><?php hsg_e( 'plan_quote' ); ?></blockquote><?php if ( $qid = (int) hsg_field( 'plan_cite_image', 0 ) ) : ?><div class="bigquote-who"><?php echo wp_get_attachment_image( $qid, 'thumbnail', false, array( 'loading' => 'lazy' ) ); ?><cite><?php hsg_e( 'plan_cite' ); ?></cite></div><?php else : ?><cite><?php hsg_e( 'plan_cite' ); ?></cite><?php endif; ?></figure>
		</div>
	</div>
</section>
