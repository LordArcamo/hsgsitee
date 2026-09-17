<section class="sec" id="collaborative">
	<div class="wrap">
		<div class="sec-head rv"><p class="eyebrow is-brand">Collaborative Search<sup>®</sup></p><h2><?php hsg_e( 'collab_h2' ); ?></h2><p class="lede"><?php hsg_e( 'collab_lede1' ); ?></p><p class="lede"><?php hsg_kses( 'collab_lede2' ); ?></p></div>
		<ol class="flow"><?php foreach ( array( 'Understand', 'Search', 'Evaluate', 'Interview', 'Vet', 'Decide', 'Support' ) as $i => $s ) { printf( '<li class="step rv" style="--d:%d"><span class="n">%02d</span><h4>%s</h4></li>', $i + 1, $i + 1, $s ); } ?></ol>
		<p class="flow-micro rv"><?php hsg_e( 'collab_micro' ); ?></p>
		<div class="flow-actions rv" style="display:flex; gap:12px; flex-wrap:wrap"><a class="btn" href="<?php echo hsg_anchor( 'close' ); ?>"><?php hsg_e( 'collab_cta1' ); ?> <span class="arrow" aria-hidden="true">→</span></a><a class="btn btn--ghost" href="<?php echo hsg_link( 'collab_cta2_link' ); ?>"><?php hsg_e( 'collab_cta2' ); ?></a></div>
	</div>
</section>
