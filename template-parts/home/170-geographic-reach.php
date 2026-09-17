<?php $pin = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>'; ?>
<section class="sec sec--tight" id="geo">
	<div class="wrap">
		<div class="geo-grid">
			<div class="rv"><p class="eyebrow is-brand">Where We Work</p><h2 style="font-size:clamp(26px,3vw,40px); margin-top:14px"><?php hsg_e( 'geo_h2' ); ?></h2><p class="lede" style="margin-top:16px"><?php hsg_e( 'geo_lede' ); ?></p></div>
			<div class="rv" style="--d:1">
				<ul class="priority"><?php foreach ( hsg_lines( 'geo_priority' ) as $p ) { echo '<li>' . $pin . esc_html( $p ) . '</li>'; } ?><li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.5 2.3 3.8 5.3 3.8 8.5S14.5 18.2 12 20.5C9.5 18.2 8.2 15.2 8.2 12S9.5 5.8 12 3.5Z"/></svg>National engagements where appropriate</li></ul>
				<div class="netreach"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z"/></svg><p>Our broader reach is supported by approximately <b><?php hsg_e( 'fact_partners' ); ?></b> partners throughout the <b>United States, Canada, England, and China</b>.</p></div>
				<div class="geo-links"><?php foreach ( hsg_lines( 'geo_counties' ) as $c ) { echo '<a class="is-county" href="' . hsg_anchor( 'close' ) . '">' . esc_html( $c ) . '</a>'; } foreach ( hsg_lines( 'geo_towns' ) as $c ) { echo '<a href="' . hsg_anchor( 'close' ) . '">' . esc_html( $c ) . '</a>'; } ?></div>
			</div>
		</div>
	</div>
</section>
