<?php
/**
 * Template Name: City
 * "Executive Recruiting in <City>, New Jersey" — the local guide in the new
 * chrome: hero with facts, the guide with an on-page index, a sticky
 * start-a-search card, neighbouring cities, and Service/City schema. See inc/cities.php.
 */
get_header( 'home' ); the_post();
$pid  = get_the_ID(); $city = hsg_city_for( $pid );
list( $body, $toc ) = hsg_city_index( apply_filters( 'the_content', get_the_content() ) );
$dek   = $city['dek'] ?: hsg_city_lead( $body );
$pages = hsg_city_pages(); $near = array_filter( $pages, fn( $c ) => $c['id'] !== $pid && $c['county'] === $city['county'] ); $others = array_filter( $pages, fn( $c ) => $c['id'] !== $pid && $c['county'] !== $city['county'] );
$facts = array_filter( array( 'Residents' => $city['residents'], 'To Manhattan' => $city['distance'], 'ZIP' => $city['zip'], 'County' => $city['county'] ) );
echo hsg_city_jsonld( $city, $pid );
?>
<section class="sw-hero city-hero">
	<div class="wrap">
		<nav class="faq-crumbs rv" aria-label="Breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a><span aria-hidden="true">›</span><a href="<?php echo esc_url( hsg_city_hub_url() ); ?>">Northern New Jersey</a><span aria-hidden="true">›</span><span><?php echo esc_html( $city['name'] ); ?></span></nav>
		<p class="eyebrow is-brand rv" style="--d:1"><?php echo esc_html( $city['county'] ? $city['county'] . ' · ' : '' ); ?>Executive recruiting &amp; career solutions</p>
		<h1 class="rv" style="--d:1"><?php the_title(); ?></h1>
		<?php if ( $dek ) : ?><p class="sw-index-sub city-dek rv" style="--d:2"><?php echo esc_html( $dek ); ?></p><?php endif; ?>
		<div class="sw-actions rv" style="--d:3">
			<a class="btn" href="<?php echo esc_url( home_url( '/situations-wanted/' ) ); ?>">Find talent in <?php echo esc_html( $city['name'] ); ?> <span class="arrow" aria-hidden="true">→</span></a>
			<a class="btn btn--ghost" href="<?php echo esc_url( home_url( '/job-search-2/' ) ); ?>">See open roles</a>
			<a class="btn btn--ghost" href="tel:<?php hsg_e( 'site_phone_href' ); ?>">Call <?php hsg_e( 'site_phone' ); ?></a>
		</div>
		<?php if ( $facts ) : ?><dl class="city-facts rv" style="--d:4"><?php foreach ( $facts as $k => $v ) : ?><div><dt><?php echo esc_html( $k ); ?></dt><dd><?php echo esc_html( $v ); ?></dd></div><?php endforeach; ?></dl><?php endif; ?>
	</div>
</section>

<section class="sec city-main">
	<div class="wrap city-layout">
		<article class="city-guide">
			<?php if ( count( $toc ) > 2 ) : ?><nav class="city-toc rv" aria-label="On this page"><span>On this page</span><?php foreach ( $toc as $t ) : ?><a href="#<?php echo esc_attr( $t[0] ); ?>"><?php echo esc_html( $t[1] ); ?></a><?php endforeach; ?></nav><?php endif; ?>
			<div class="post-body city-body"><?php echo $body; ?></div>
		</article>
		<aside class="city-side">
			<div class="city-card rv" style="--d:2">
				<p class="eyebrow is-hire">For companies</p>
				<h3>Hiring in <?php echo esc_html( $city['name'] ); ?>?</h3>
				<p>Tell us the role and we will show you the professionals HSG is representing, ranked against your requirements.</p>
				<a class="btn" href="<?php echo esc_url( home_url( '/situations-wanted/' ) ); ?>">Start a search <span class="arrow" aria-hidden="true">→</span></a>
			</div>
			<div class="city-card city-card--career rv" style="--d:3">
				<p class="eyebrow is-career">For professionals</p>
				<h3>Working in <?php echo esc_html( $city['name'] ); ?>?</h3>
				<p>Browse current openings or send your resume once and let us match you.</p>
				<a class="btn btn--ghost" href="<?php echo esc_url( home_url( '/job-search-2/' ) ); ?>">Job board</a> <a class="btn btn--ghost" href="<?php echo esc_url( home_url( '/submit-resume/' ) ); ?>">Submit resume</a>
			</div>
			<div class="city-card city-card--contact rv" style="--d:4">
				<h3>Talk to HSG</h3>
				<p><a href="tel:<?php hsg_e( 'site_phone_href' ); ?>"><?php hsg_e( 'site_phone' ); ?></a><br><a href="mailto:<?php hsg_e( 'site_email' ); ?>"><?php hsg_e( 'site_email' ); ?></a></p>
				<a class="textlink" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact page <span class="arrow" aria-hidden="true">→</span></a>
			</div>
			<?php if ( $near ) : ?>
			<div class="city-card city-card--near rv" style="--d:5">
				<h3>Nearby in <?php echo esc_html( $city['county'] ); ?></h3>
				<ul><?php foreach ( $near as $c ) : ?><li><a href="<?php echo esc_url( $c['url'] ); ?>"><?php echo esc_html( $c['name'] ); ?></a></li><?php endforeach; ?></ul>
			</div>
			<?php endif; ?>
		</aside>
	</div>
</section>

<?php if ( $others ) : $by = array(); foreach ( $others as $c ) { $by[ $c['county'] ][] = $c; } ksort( $by ); ?>
<section class="sec sec--soft city-more">
	<div class="wrap">
		<div class="sec-head rv"><p class="eyebrow is-brand">Where We Work</p><h2>More Northern New Jersey cities</h2><p class="lede">Local guides and executive recruiting across the region. <a href="<?php echo esc_url( hsg_city_hub_url() ); ?>">See the whole region →</a></p></div>
		<div class="city-grid rv" style="--d:1">
			<?php foreach ( $by as $county => $list ) : ?><div class="city-col"><h3><?php echo esc_html( $county ); ?></h3><ul><?php foreach ( $list as $c ) : ?><li><a href="<?php echo esc_url( $c['url'] ); ?>"><?php echo esc_html( $c['name'] ); ?></a></li><?php endforeach; ?></ul></div><?php endforeach; ?>
		</div>
	</div>
</section>
<?php endif; ?>

<section class="sec sec--tight">
	<div class="wrap"><div class="sw-cta rv"><div class="sw-cta-copy"><h2>Hiring or moving in <?php echo esc_html( $city['name'] ); ?>? Start with a conversation.</h2><p>Three decades of executive search across Northern New Jersey, one call away.</p></div><a class="btn" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact HSG <span class="arrow" aria-hidden="true">→</span></a></div></div>
</section>
<?php get_footer( 'home' );
