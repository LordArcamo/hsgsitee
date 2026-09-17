<?php
$jobs = function_exists( 'hsg_live_jobs' ) ? hsg_live_jobs( 10 ) : array();
$live = ! empty( $jobs );
if ( ! $live ) { // fallback: the roles typed into the Home page
	foreach ( hsg_lines( 'jobs_list' ) as $line ) { $p = array_map( 'trim', explode( '|', $line ) ); if ( count( $p ) >= 3 ) { $jobs[] = array( 'title' => $p[0], 'industry' => $p[1], 'location' => $p[2], 'href' => hsg_link( 'jobs_cta1_link' ) ); } }
}
$flag = $live ? hsg_field( 'jobs_flag' ) : 'Sample roles — job board unavailable';
?>
<section class="sec" id="jobs">
	<div class="wrap">
		<div class="jobs-head rv">
			<div class="sec-head"><p class="eyebrow is-career">Current Opportunities</p><h2><?php hsg_e( 'jobs_h2' ); ?></h2><p class="lede"><?php hsg_e( 'jobs_lede' ); ?></p></div>
			<div class="jobs-actions"><a class="btn" href="<?php echo hsg_link( 'jobs_cta1_link' ); ?>"><?php hsg_e( 'jobs_cta1' ); ?> <span class="arrow" aria-hidden="true">→</span></a><a class="btn btn--ghost" href="<?php echo hsg_link( 'jobs_cta2_link' ); ?>"><?php hsg_e( 'jobs_cta2' ); ?></a></div>
		</div>
		<div class="board rv" style="--d:1">
			<div class="board-bar"><?php if ( $flag ) : ?><span class="board-flag"><?php echo esc_html( $flag ); ?></span><?php else : ?><span class="live"><span class="dot-live" aria-hidden="true"></span>Current openings</span><?php endif; ?><div class="board-ctl"><div class="dots" id="jobdots" role="tablist" aria-label="Opportunity pages"></div><button class="pausebtn" id="jobpause" type="button" aria-pressed="false"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg><span id="jobpausetxt">Pause</span></button></div></div>
			<div class="joblist" id="joblist" aria-live="polite"></div>
			<script type="application/json" id="hsg-jobs" data-href="<?php echo hsg_link( 'jobs_cta1_link' ); ?>"><?php echo wp_json_encode( $jobs, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG ); ?></script>
		</div>
		<?php if ( hsg_field( 'jobs_caption' ) ) : ?><p class="board-caption rv"><?php hsg_e( 'jobs_caption' ); ?></p><?php endif; ?>
	</div>
</section>
