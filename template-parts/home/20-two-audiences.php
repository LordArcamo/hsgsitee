<section class="sec sec--soft" id="both-sides">
	<div class="wrap">
		<div class="sec-head rv"><h2><?php hsg_e( 'two_h2' ); ?></h2><p class="lede"><?php hsg_e( 'two_lede' ); ?></p></div>
		<div class="two-cards">
			<article class="acard acard--hire rv" style="--d:1">
				<?php if ( $pid = (int) hsg_field( 'two_hire_image', 0 ) ) : ?><figure class="acard-photo"><?php echo wp_get_attachment_image( $pid, 'hsg-feature', false, array( 'loading' => 'lazy' ) ); if ( $cr = wp_get_attachment_caption( $pid ) ) { echo '<small class="img-credit">' . esc_html( $cr ) . '</small>'; } ?></figure><?php endif; ?>
				<span class="acard-icon" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20v-1.6A3.4 3.4 0 0 0 12.6 15H6.4A3.4 3.4 0 0 0 3 18.4V20"/><circle cx="9.5" cy="7.5" r="3.5"/><path d="M17 11l2 2 4-4"/></svg></span>
				<p class="eyebrow is-hire">For Companies</p><h3><?php hsg_e( 'two_hire_h3' ); ?></h3><p><?php hsg_kses( 'two_hire_p' ); ?></p>
				<div class="chips"><?php foreach ( array( array('hiring','Executive Recruiting'), array('hiring','Targeted Search'), array('hiring','Candidate Assessment'), array('collaborative','Collaborative Search<sup>®</sup>'), array('hiring','Confidential Search'), array('forensic','Interviewing Support'), array('hiring','Onboarding &amp; Retention') ) as $c ) { echo '<a class="chip" href="' . hsg_anchor( $c[0] ) . '">' . $c[1] . '</a>'; } ?></div>
				<a class="btn" href="<?php echo hsg_anchor( 'hiring' ); ?>"><?php hsg_e( 'two_hire_cta' ); ?> <span class="arrow" aria-hidden="true">→</span></a>
			</article>
			<article class="acard acard--career rv" style="--d:2">
				<?php if ( $pid = (int) hsg_field( 'two_career_image', 0 ) ) : ?><figure class="acard-photo"><?php echo wp_get_attachment_image( $pid, 'hsg-feature', false, array( 'loading' => 'lazy' ) ); if ( $cr = wp_get_attachment_caption( $pid ) ) { echo '<small class="img-credit">' . esc_html( $cr ) . '</small>'; } ?></figure><?php endif; ?>
				<span class="acard-icon" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5.5-5.5 3.5 3.5L21 6"/><path d="M15.5 6H21v5.5"/><path d="M3 21h18"/></svg></span>
				<p class="eyebrow is-career">For Professionals</p><h3><?php hsg_e( 'two_career_h3' ); ?></h3><p><?php hsg_e( 'two_career_p' ); ?></p>
				<div class="chips"><?php foreach ( array( array('career','Career Roadmapping'), array('career','Career Assessment'), array('career','Positioning'), array('career','Interview Strategy'), array('career','Professional Development'), array('career','Opportunity Evaluation'), array('vetting','Reference Guidance') ) as $c ) { echo '<a class="chip" href="' . hsg_anchor( $c[0] ) . '">' . $c[1] . '</a>'; } ?></div>
				<a class="btn" href="<?php echo hsg_anchor( 'career' ); ?>"><?php hsg_e( 'two_career_cta' ); ?> <span class="arrow" aria-hidden="true">→</span></a>
			</article>
		</div>
		<p class="legal rv" id="both-sides-note"><?php hsg_e( 'two_legal' ); ?></p>
	</div>
</section>
