<?php $icons = array(
	'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>',
	'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V9M9.5 19V5M15 19v-7M20.5 19v-4"/></svg>',
	'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 0-3.2 6.4L21 20l-1.2-4.2A7.9 7.9 0 0 0 20 12Z"/><path d="M9 10.5h6M9 14h4"/></svg>',
	'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5.5c0 4.3-2.9 7.9-7 9.5-4.1-1.6-7-5.2-7-9.5V6l7-3Z"/><path d="M9.2 12.2l2 2 3.6-3.9"/></svg>' ); ?>
<section class="sec sec--soft" id="hiring">
	<div class="wrap">
		<div class="cap-layout">
			<div class="cap-copy rv">
				<p class="eyebrow is-hire">Hiring Solutions</p>
				<h2 style="font-size:clamp(28px,3.4vw,44px)"><?php hsg_e( 'hiring_h2' ); ?></h2>
				<p class="lede"><?php hsg_e( 'hiring_lede1' ); ?></p><p class="lede"><?php hsg_e( 'hiring_lede2' ); ?></p>
				<div class="netreach"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z"/></svg><p><?php echo wp_kses( str_replace( '{partners}', esc_html( hsg_field( 'fact_partners' ) ), hsg_field( 'hiring_reach' ) ), array( 'b' => array(), 'strong' => array() ) ); ?></p></div>
				<a class="btn" href="<?php echo hsg_link( 'hiring_cta_link' ); ?>" style="margin-top:10px"><?php hsg_e( 'hiring_cta' ); ?> <span class="arrow" aria-hidden="true">→</span></a>
			</div>
			<div class="caps">
				<?php for ( $i = 1; $i <= 4; $i++ ) : ?>
				<article class="cap rv" style="--d:<?php echo $i; ?>"><span class="cap-ic" aria-hidden="true"><?php echo $icons[ $i - 1 ]; ?></span><h4><?php hsg_e( "cap{$i}_h" ); ?></h4><p><?php hsg_e( "cap{$i}_p" ); ?></p></article>
				<?php endfor; ?>
				<div class="also rv" style="--d:5; grid-column: 1 / -1"><span class="also-lbl">Also part of Hiring Solutions</span><div class="chips" style="--c: var(--hiring); --wash: var(--hiring-soft)"><a class="chip" href="<?php echo hsg_anchor( 'hiring' ); ?>">Targeted Search</a><a class="chip" href="<?php echo hsg_anchor( 'collaborative' ); ?>">Collaborative Search<sup>®</sup></a><a class="chip" href="<?php echo hsg_anchor( 'hiring' ); ?>">Confidential Search</a><a class="chip" href="<?php echo hsg_anchor( 'hiring' ); ?>">Onboarding &amp; Retention Support</a></div></div>
			</div>
		</div>
	</div>
</section>
