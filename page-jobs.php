<?php
/**
 * Template Name: Job Board
 *
 * The Top Echelon job board (search · detail · apply) inside the new chrome.
 * The widget's own markup cannot be edited; assets/css/partials/jobs.css
 * restyles it to match the site. The API key is the public one the widget
 * always carried (see inc/jobs.php).
 */
get_header( 'home' ); the_post();
$live = function_exists( 'hsg_live_jobs' ) ? hsg_live_jobs( 10 ) : array();
$count = 0;
if ( function_exists( 'hsg_jobs_api_key' ) ) {
	$t = get_transient( 'hsg_jobs_total' );
	if ( false === $t ) {
		$r = wp_remote_get( 'https://bb3api.topechelon.com/job_board/job_searches/one_off_search?page=1', array( 'timeout' => 8, 'headers' => array( 'Authorization' => 'Apikey ' . hsg_jobs_api_key(), 'Accept' => 'application/json' ) ) );
		$d = ( ! is_wp_error( $r ) && 200 === wp_remote_retrieve_response_code( $r ) ) ? json_decode( wp_remote_retrieve_body( $r ), true ) : null;
		$t = (int) ( $d['pagination']['total'] ?? 0 ); set_transient( 'hsg_jobs_total', $t, 15 * MINUTE_IN_SECONDS );
	}
	$count = (int) $t;
}
?>
<section class="jobs-hero">
	<div class="wrap jobs-hero__in">
		<div class="jobs-hero__copy">
			<p class="eyebrow is-career rv">Current Opportunities</p>
			<h1 class="jobs-hero__title rv" style="--d:1"><?php the_title(); ?></h1>
			<p class="lede rv" style="--d:2">Roles across professional, management, technology, healthcare, finance, operations and leadership. Search below, read the full description, and apply in a couple of minutes — or send your resume once and let us match you.</p>
			<div class="jobs-hero__actions rv" style="--d:3">
				<a class="btn" href="#!/search">Browse openings <span class="arrow" aria-hidden="true">↓</span></a>
				<a class="btn btn--ghost" href="#!/apply">Submit your resume</a>
			</div>
		</div>
		<dl class="jobs-hero__stats rv" style="--d:2">
			<?php if ( $count ) : ?><div><dt><?php echo esc_html( number_format_i18n( $count ) ); ?></dt><dd>open roles right now</dd></div><?php endif; ?>
			<div><dt><?php hsg_e( 'fact_partners' ); ?></dt><dd>partner recruiters sourcing for us</dd></div>
			<div><dt>1</dt><dd>resume, matched to every relevant search</dd></div>
		</dl>
	</div>
</section>

<section class="sec sec--tight jobs-board-sec" id="board">
	<div class="wrap">
		<div class="jobs-board" data-jobs-board>
			<div align="center" id="jb--job-board" api-key="<?php echo esc_attr( hsg_jobs_api_key() ); ?>"></div>
			<script src="https://bb3jobboard.topechelon.com/job_board.js" type="text/javascript"></script>
			<noscript><p class="lede">The job board needs JavaScript. Email your resume to <a href="mailto:<?php hsg_e( 'site_email' ); ?>"><?php hsg_e( 'site_email' ); ?></a> instead.</p></noscript>
		</div>
	</div>
</section>

<section class="sec sec--soft jobs-after">
	<div class="wrap">
		<div class="jobs-after__grid">
			<div class="jobs-after__card rv" style="--d:1">
				<p class="eyebrow is-career">Not seeing the right role?</p>
				<h2>Most placements never appear on a board.</h2>
				<p class="lede">Send your resume once. When a search opens that fits your experience, goals and timing, you hear from us first — confidentially.</p>
				<a class="btn" href="#!/apply">Submit your resume <span class="arrow" aria-hidden="true">→</span></a>
			</div>
			<div class="jobs-after__card jobs-after__card--alt rv" style="--d:2">
				<p class="eyebrow is-brand">Not sure this is the move?</p>
				<h2>Plan it before you need it.</h2>
				<p class="lede">Career Solutions helps accomplished professionals decide whether to stay, go, or wait — and prepares the positioning before the search starts.</p>
				<a class="btn btn--ghost" href="<?php echo esc_url( home_url( '/#career' ) ); ?>">Explore Career Solutions</a>
			</div>
		</div>
	</div>
</section>
<?php get_footer( 'home' );
