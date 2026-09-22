</main>

<footer class="ftr">
	<div class="wrap ftr-in">
		<div class="ftr-top">
			<div class="ftr-brand">
				<a class="logo" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="logo-img"><img src="<?php echo hsg_img( 'brand/hsg-logo-full-dark-72.webp' ); ?>" srcset="<?php echo hsg_img( 'brand/hsg-logo-full-dark-72.webp' ); ?> 1x, <?php echo hsg_img( 'brand/hsg-logo-full-dark-144.webp' ); ?> 2x" width="229" height="72" alt="<?php echo esc_attr( get_bloginfo( 'name' ) . ' — ' . hsg_field( 'site_tagline' ) ); ?>" loading="lazy"></span></a>
				<address><?php hsg_e( 'site_street' ); ?><br><?php hsg_e( 'site_city' ); ?>, <?php hsg_e( 'site_region' ); ?> <?php hsg_e( 'site_zip' ); ?><br><a href="tel:<?php hsg_e( 'site_phone_href' ); ?>"><?php hsg_e( 'site_phone' ); ?></a><br><a href="mailto:<?php hsg_e( 'site_email' ); ?>"><?php hsg_e( 'site_email' ); ?></a></address>
			</div>
			<?php foreach ( hsg_footer_columns() as $h => $links ) : ?>
			<div><h5><?php echo esc_html( $h ); ?></h5><ul><?php foreach ( $links as $l ) { echo '<li><a href="' . hsg_anchor( $l[0] ) . '">' . wp_kses( $l[1], array( 'sup' => array() ) ) . '</a></li>'; } ?></ul></div>
			<?php endforeach; ?>
			<div>
				<h5>Locations</h5>
				<ul><?php foreach ( hsg_area_served() as $a ) { echo '<li><a href="' . esc_url( hsg_city_hub_url() ) . '">' . esc_html( $a ) . '</a></li>'; } ?></ul>
				<p class="ftr-related">Business consulting, leadership coaching, or HR support? <a href="<?php echo esc_url( hsg_field( 'site_related_url' ) ); ?>"><?php hsg_e( 'site_related_name' ); ?></a></p>
			</div>
		</div>
		<div class="ftr-bot">
			<span>&copy; <?php echo esc_html( date_i18n( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. All rights reserved.</span>
			<span>Executive recruiting and career solutions · New Jersey and beyond</span>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
