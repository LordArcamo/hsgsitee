<?php
/**
 * Template Name: FAQ
 * The site's FAQ page in the new chrome, with FAQPage + Organization schema. See inc/faq.php.
 */
get_header( 'home' ); the_post();
$pid    = get_the_ID();
$groups = hsg_faq_parse( (string) get_post_field( 'post_content', $pid ) );
$total  = array_sum( array_map( fn( $g ) => count( $g['items'] ), $groups ) );
echo hsg_faq_jsonld( $groups, $pid );
?>
<section class="sw-hero">
	<div class="wrap">
		<nav class="faq-crumbs rv" aria-label="Breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a><span aria-hidden="true">›</span><span>FAQ</span></nav>
		<h1 class="rv" style="--d:1"><?php echo esc_html( hsg_faq_heading( $pid ) ); ?></h1>
		<p class="sw-index-sub faq-intro rv" style="--d:2">Hiring Solutions Group is an executive recruiting and career solutions firm in Northern New Jersey. These are the <?php echo (int) $total; ?> questions companies and professionals ask us most, answered plainly: how executive search works, what it costs, how long it takes, and what to expect from a recruiter. Not here? <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Ask us directly</a> or call <a href="tel:<?php hsg_e( 'site_phone_href' ); ?>"><?php hsg_e( 'site_phone' ); ?></a>.</p>
		<p class="faq-updated rv" style="--d:3">Last updated <time datetime="<?php echo esc_attr( get_the_modified_date( 'c' ) ); ?>"><?php echo esc_html( get_the_modified_date( 'F j, Y' ) ); ?></time></p>
	</div>
</section>
<section class="sec">
	<div class="wrap">
		<?php if ( count( $groups ) > 1 ) : ?>
		<nav class="faq-jump rv" aria-label="Sections">On this page: <?php foreach ( $groups as $i => $g ) : ?><a href="#faq-<?php echo (int) $i; ?>"><?php echo esc_html( $g['title'] ?: 'Questions' ); ?></a><?php endforeach; ?></nav>
		<?php endif; ?>
		<?php if ( ! $groups ) : the_content(); else : $first = true; foreach ( $groups as $i => $g ) : ?>
		<div class="faq-group rv" id="faq-<?php echo (int) $i; ?>">
			<?php if ( $g['title'] ) : ?><h2><?php echo esc_html( $g['title'] ); ?></h2><?php endif; ?>
			<?php foreach ( $g['items'] as $it ) : ?>
			<details class="faq-item"<?php echo $first ? ' open' : ''; $first = false; ?>><summary><h3><?php echo esc_html( $it['q'] ); ?></h3></summary><div class="faq-a"><?php echo $it['a']; ?></div></details>
			<?php endforeach; ?>
		</div>
		<?php endforeach; endif; ?>
		<div class="faq-cta rv"><h2>Still have a question?</h2><p>Every search is different. Tell us about yours and we will answer directly.</p><a class="btn" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact HSG <span class="arrow" aria-hidden="true">→</span></a> <a class="btn btn--ghost" href="<?php echo esc_url( home_url( '/articles/' ) ); ?>">Read the journal</a></div>
	</div>
</section>
<?php get_footer( 'home' );
