<?php
/* Criteria + pool from the Home page (ACF Pro repeaters), falling back to the design's fictional set. */
$criteria = array_values( array_filter( array_map( fn( $r ) => trim( (string) ( $r['label'] ?? '' ) ), (array) hsg_field( 'sl_criteria' ) ) ) );
if ( 6 !== count( $criteria ) ) { $criteria = hsg_shortlist_default_criteria(); }
$rows = (array) hsg_field( 'sl_candidates' );
$pool = array(); $n = 0;
foreach ( $rows as $r ) {
	if ( empty( $r['role'] ) ) { continue; }
	$n++;
	$c = isset( $r['c'] ) ? $r['c'] : array( (int) ( $r['c1'] ?? 2 ), (int) ( $r['c2'] ?? 2 ), (int) ( $r['c3'] ?? 2 ), (int) ( $r['c4'] ?? 2 ), (int) ( $r['c5'] ?? 2 ), (int) ( $r['c6'] ?? 2 ) );
	$pool[] = array( 'id' => $n, 'role' => (string) $r['role'], 'years' => (int) ( $r['years'] ?? 0 ), 'industry' => (string) ( $r['industry'] ?? '' ), 'teamSize' => (string) ( $r['team'] ?? '' ), 'scope' => (string) ( $r['scope'] ?? '' ),
		'criteria' => array_map( fn( $v ) => max( 0, min( 2, (int) $v ) ), $c ), 'strength' => (string) ( $r['strength'] ?? '' ), 'watchPoint' => (string) ( $r['watch'] ?? '' ), 'exitsAt' => (int) ( $r['exits_at'] ?? 0 ), 'exitReason' => (string) ( $r['exit_reason'] ?? '' ) );
}
$stages = hsg_shortlist_stages();
$survivors = fn( int $stage ) => count( array_filter( $pool, fn( $c ) => 0 === $c['exitsAt'] || $c['exitsAt'] > $stage ) );
$funnel = array();
foreach ( $stages as $i => $st ) { if ( 0 === $i ) { continue; } $funnel[] = array( 'count' => 1 === $i ? count( $pool ) : $survivors( $i ), 'label' => $st['key'], 'fromStage' => $i ); }
$total = count( $pool ); $finalists = $survivors( count( $stages ) - 1 );
?>
<section class="sec sec--soft" id="shortlist">
	<?php /* Interactive demo, simplified after client review (17 Sep 2026): no autoplay, no Play/Pause, the pool never scrolls on its own, eight profiles shown at a time, one "Next stage" button. Logic: src/scripts/shortlist.ts. */ ?>
	<div class="wrap">
		<div class="sec-head rv"><h2><?php hsg_e( 'sl_h2' ); ?></h2><p class="sl-sub"><?php hsg_e( 'sl_sub' ); ?></p><p class="lede"><?php hsg_e( 'sl_lede1' ); ?></p></div>
		<div class="sl-demo rv" style="--d:1">
			<div class="sl-bar">
				<div class="sl-stages" id="slStages" aria-label="Evaluation stages"></div>
				<div class="sl-ctl">
					<p class="sl-count"><b id="slCount"><?php echo (int) $total; ?></b> <span id="slCountLbl">in consideration</span></p>
					<button class="btn sl-next" id="slNext" type="button">Next stage <span class="arrow" aria-hidden="true">→</span></button>
				</div>
			</div>
			<div class="sl-body">
				<aside class="sl-role"><span class="tag">Example search</span><h3><?php hsg_e( 'sl_role' ); ?></h3><p class="meta"><?php hsg_e( 'sl_meta' ); ?></p><h4>What the company needs</h4><ul class="req" id="slReq"></ul></aside>
				<div class="sl-pool">
					<div class="pool-top"><p class="pool-lbl" id="slPoolLbl"><?php echo (int) $total; ?> sample profiles</p><p class="pool-note" id="slNote"></p></div>
					<div class="pool-view is-static" id="slView"><div class="pool-track" id="slTrack"></div></div>
					<button class="sl-more" id="slMore" type="button" hidden>Show all profiles</button>
					<p class="pool-caution">Experience gets someone into consideration. Deeper evaluation determines who deserves a closer look.</p>
					<p class="sl-fine">Candidate profiles shown are fictional examples created to demonstrate the evaluation process. Click a profile to see how it was assessed.</p>
				</div>
			</div>
			<div class="sl-funnel"><div class="fn-row" id="slFunnel"></div><p class="sl-fine">Candidate counts and filtering shown are illustrative. Every search and evaluation process is different.</p></div>
			<script type="application/json" id="hsg-shortlist"><?php echo wp_json_encode( array( 'criteria' => $criteria, 'stages' => $stages, 'funnel' => $funnel, 'candidates' => $pool ), JSON_UNESCAPED_UNICODE | JSON_HEX_TAG ); ?></script>
		</div>
		<div class="sl-payoff rv" style="--d:2"><div><h3><?php hsg_e( 'sl_payoff_h3' ); ?></h3><p><?php hsg_e( 'sl_payoff_p' ); ?></p></div><a class="btn" href="<?php echo hsg_anchor( 'collaborative' ); ?>">See How Collaborative Search<sup>®</sup> Works <span class="arrow" aria-hidden="true">→</span></a></div>
	</div>
</section>
