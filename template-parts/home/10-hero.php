<?php $hero_id = (int) hsg_field( 'hero_image', 0 ); ?>
<section class="hero">
	<div class="wrap">
		<div class="hero-grid">
			<div>
				<?php /* The "30 years" pill above the H1 was removed on client review (17 Sep 2026); the figure lives in the proof bar below. */ ?>
				<h1 class="rv" style="--d:1"><span class="t-hire"><?php hsg_e( 'hero_h1_hire' ); ?></span> &amp; <span class="t-career"><?php hsg_e( 'hero_h1_career' ); ?></span> <?php hsg_e( 'hero_h1_tail' ); ?></h1>
				<p class="brandline rv" style="--d:2"><?php hsg_e( 'hero_brandline' ); ?></p>
				<div class="hero-copy rv" style="--d:3"><p><?php hsg_e( 'hero_p1' ); ?></p><p><?php hsg_e( 'hero_p2' ); ?></p></div>
				<div class="hero-actions rv" style="--d:4">
					<a class="btn" href="<?php echo hsg_link( 'hero_cta1_link' ); ?>"><?php hsg_e( 'hero_cta1' ); ?> <span class="arrow" aria-hidden="true">→</span></a>
					<a class="btn btn--ghost" href="<?php echo hsg_link( 'hero_cta2_link' ); ?>"><?php hsg_e( 'hero_cta2' ); ?></a>
				</div>
				<p class="bridge rv" style="--d:6"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h10"/><path d="M11 7l5 5-5 5"/><path d="M20 4v16"/></svg><span><?php hsg_kses( 'hero_bridge' ); ?></span></p>
			</div>
			<figure class="hero-fig rv" style="--d:2">
				<div class="hero-img">
					<?php if ( $hero_id ) : echo wp_get_attachment_image( $hero_id, 'hsg-hero', false, array( 'loading' => 'eager', 'fetchpriority' => 'high', 'style' => 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover' ) ); else : ?>
					<span class="ph"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="2.2"/><path d="M3 17.5l5-4.2 3.4 2.8L15.6 12 21 16.4"/></svg><strong>Hero image</strong><span>Add one under Home → Hero → Hero photograph.</span></span>
					<?php endif; ?>
				</div>
				<figcaption class="hero-badge"><b><?php hsg_e( 'fact_placements' ); ?></b><span><?php hsg_e( 'hero_badge' ); ?></span></figcaption>
				<?php if ( $hero_id && ( $credit = wp_get_attachment_caption( $hero_id ) ) ) : ?><small class="hero-credit"><?php echo esc_html( $credit ); ?></small><?php endif; ?>
			</figure>
		</div>
		<div class="proofbar rv">
			<div><b><?php hsg_e( 'fact_years' ); ?></b><span>Years experience</span></div>
			<div><b><?php hsg_e( 'fact_placements' ); ?></b><span>Placements</span></div>
			<div><b><?php hsg_e( 'fact_network' ); ?></b><span>Professional network</span></div>
			<div><b><?php hsg_e( 'fact_resumes' ); ?></b><span>Resumes accessible</span></div>
			<div><b><?php hsg_e( 'fact_interviews' ); ?></b><span>Interviews</span></div>
		</div>
	</div>
</section>
