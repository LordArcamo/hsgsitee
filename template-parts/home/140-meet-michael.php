<?php $mid = (int) hsg_field( 'michael_image', 0 ); $check = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'; ?>
<section class="sec sec--soft" id="michael">
	<div class="wrap">
		<div class="michael">
			<figure class="portrait rv" style="margin:0">
				<?php if ( $mid ) : echo wp_get_attachment_image( $mid, 'large', false, array( 'loading' => 'lazy', 'sizes' => '(max-width: 820px) 340px, 433px' ) ); else : ?>
				<img src="<?php echo hsg_img( 'brand/michael-433.webp' ); ?>" srcset="<?php echo hsg_img( 'brand/michael-433.webp' ); ?> 433w, <?php echo hsg_img( 'brand/michael-866.webp' ); ?> 866w" sizes="(max-width: 820px) 340px, 433px" width="866" height="1001" loading="lazy" alt="Michael Schlager, founder of Hiring Solutions Group, at his desk.">
				<?php endif; ?>
			</figure>
			<div class="michael-copy rv" style="--d:1">
				<p class="eyebrow is-brand">About</p><h2><?php hsg_e( 'michael_h2' ); ?></h2><p class="michael-theme"><?php hsg_e( 'michael_theme' ); ?></p>
				<p class="lede"><?php hsg_e( 'michael_lede1' ); ?></p><p class="lede"><?php hsg_e( 'michael_lede2' ); ?></p><p class="lede"><?php hsg_e( 'michael_lede3' ); ?></p>
				<ul class="proofs"><?php foreach ( hsg_lines( 'michael_proofs' ) as $p ) { echo '<li>' . $check . '<span>' . esc_html( str_replace( '{years}', hsg_field( 'fact_years_sentence' ), $p ) ) . '</span></li>'; } ?></ul>
				<a class="btn btn--ghost" href="<?php echo hsg_link( 'michael_cta_link' ); ?>"><?php hsg_e( 'michael_cta' ); ?></a>
			</div>
		</div>
	</div>
</section>
