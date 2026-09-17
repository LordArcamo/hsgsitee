<?php
/**
 * Template Name: FAQ
 * The site's FAQ page in the new chrome, with FAQPage schema. See inc/faq.php.
 */
get_header( 'home' ); the_post();
$groups = hsg_faq_parse( (string) get_post_field( 'post_content', get_the_ID() ) );
echo hsg_faq_jsonld( $groups );
?>
<section class="sw-hero">
	<div class="wrap">
		<p class="eyebrow is-brand rv">Questions &amp; Answers</p>
		<h1 class="rv" style="--d:1"><?php the_title(); ?></h1>
		<p class="sw-index-sub faq-intro rv" style="--d:2">Straight answers about executive search, working with a recruiter, and what to expect from HSG. Not here? <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Ask us directly</a>.</p>
	</div>
</section>
<section class="sec">
	<div class="wrap">
		<?php if ( ! $groups ) : the_content(); else : $first = true; foreach ( $groups as $g ) : ?>
		<div class="faq-group rv">
			<?php if ( $g['title'] ) : ?><h2><?php echo esc_html( $g['title'] ); ?></h2><?php endif; ?>
			<?php foreach ( $g['items'] as $it ) : ?>
			<details class="faq-item"<?php echo $first ? ' open' : ''; $first = false; ?>><summary><?php echo esc_html( $it['q'] ); ?></summary><div class="faq-a"><?php echo $it['a']; ?></div></details>
			<?php endforeach; ?>
		</div>
		<?php endforeach; endif; ?>
	</div>
</section>
<?php get_footer( 'home' );
