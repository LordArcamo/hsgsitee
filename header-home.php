<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open();
$menus = hsg_nav_menus(); $about = hsg_nav_about(); $ins = hsg_nav_insights();
$phone = hsg_field( 'site_phone' ); $tel = 'tel:' . hsg_field( 'site_phone_href' );
$link = fn( $it ) => '<a href="' . hsg_anchor( $it['href'] ) . '">' . wp_kses( $it['label'], array( 'sup' => array() ) ) . '</a>';
?>
<a class="skip" href="#main">Skip to content</a>

<header class="hdr" id="hdr">
	<div class="hdr-in">
		<a class="logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<span class="logo-img"><img class="logo-img--light" src="<?php echo hsg_img( 'brand/hsg-logo-44.webp' ); ?>" srcset="<?php echo hsg_img( 'brand/hsg-logo-44.webp' ); ?> 1x, <?php echo hsg_img( 'brand/hsg-logo-88.webp' ); ?> 2x" width="185" height="44" alt="<?php echo esc_attr( get_bloginfo( 'name' ) . ' — ' . hsg_field( 'site_tagline' ) ); ?>"><img class="logo-img--dark" src="<?php echo hsg_img( 'brand/hsg-logo-dark-44.webp' ); ?>" srcset="<?php echo hsg_img( 'brand/hsg-logo-dark-44.webp' ); ?> 1x, <?php echo hsg_img( 'brand/hsg-logo-dark-88.webp' ); ?> 2x" width="185" height="44" alt="" aria-hidden="true"></span>
		</a>

		<nav class="nav" aria-label="Primary">
			<?php foreach ( array_merge( $menus, array( $about ) ) as $i => $m ) :
				if ( $i === count( $menus ) ) : ?><a class="nav-link" href="<?php echo hsg_anchor( $ins['href'] ); ?>"><?php echo esc_html( $ins['label'] ); ?></a><?php endif; ?>
				<div class="nav-item is-<?php echo esc_attr( $m['id'] ); ?>" data-nav-menu>
					<button class="nav-trigger" type="button" aria-expanded="false" aria-haspopup="true" aria-controls="nav-menu-<?php echo esc_attr( $m['id'] ); ?>"><?php echo esc_html( $m['label'] ); ?><svg class="nav-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
					<div class="nav-menu" id="nav-menu-<?php echo esc_attr( $m['id'] ); ?>" hidden><?php foreach ( $m['items'] as $it ) { echo $link( $it ); } ?></div>
				</div>
			<?php endforeach; ?>
		</nav>

		<div class="hdr-cta">
			<a class="btn btn--ghost hdr-phone" href="<?php echo esc_attr( $tel ); ?>"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6.2 6.2l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg><span><?php echo esc_html( $phone ); ?></span></a>
			<a class="btn" href="<?php echo esc_url( home_url( '/job-search-2/' ) ); ?>">Find Talent</a>
			<button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="mobilenav" aria-label="Open menu"><span aria-hidden="true"></span></button>
		</div>
	</div>

	<div class="mobile-nav" id="mobilenav">
		<?php foreach ( $menus as $m ) : ?>
		<div class="m-group is-<?php echo esc_attr( $m['id'] ); ?>"><p class="m-heading"><?php echo esc_html( $m['label'] ); ?></p><ul><?php foreach ( $m['items'] as $it ) { echo '<li>' . $link( $it ) . '</li>'; } ?></ul></div>
		<?php endforeach; ?>
		<div class="m-group"><ul><li><a href="<?php echo hsg_anchor( $ins['href'] ); ?>"><?php echo esc_html( $ins['label'] ); ?></a></li></ul></div>
		<div class="m-group"><p class="m-heading"><?php echo esc_html( $about['label'] ); ?></p><ul><?php foreach ( $about['items'] as $it ) { echo '<li>' . $link( $it ) . '</li>'; } ?></ul></div>
		<div class="m-actions"><a class="btn" href="<?php echo esc_url( home_url( '/job-search-2/' ) ); ?>">Find Talent</a><a class="btn btn--ghost" href="<?php echo esc_attr( $tel ); ?>">Call <?php echo esc_html( $phone ); ?></a></div>
	</div>
</header>

<?php if ( is_front_page() ) { get_template_part( 'template-parts/audience-bar' ); } ?>

<main id="main">
