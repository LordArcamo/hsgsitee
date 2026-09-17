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
	<?php /* Client review 17 Sep 2026: the interactive 50-profile demo was "very confusing". This is the same story told statically — one example role, what the company needs, and how many people remain at each stage. */ ?>
	<div class="wrap">
		<div class="sec-head rv"><h2><?php hsg_e( 'sl_h2' ); ?></h2><p class="sl-sub"><?php hsg_e( 'sl_sub' ); ?></p><p class="lede"><?php hsg_e( 'sl_lede1' ); ?></p></div>
		<div class="slx rv" style="--d:1">
			<aside class="slx-role">
				<span class="tag">Example search</span>
				<h3><?php hsg_e( 'sl_role' ); ?></h3><p class="meta"><?php hsg_e( 'sl_meta' ); ?></p>
				<h4>What the company needs</h4>
				<ul class="slx-req"><?php foreach ( $criteria as $c ) : ?><li><?php echo esc_html( $c ); ?></li><?php endforeach; ?></ul>
			</aside>
			<div class="slx-steps">
				<h4>How <?php echo (int) $total; ?> people become one hire</h4>
				<ol>
					<?php foreach ( $stages as $i => $st ) :
						$count = 0 === $i ? count( $criteria ) : ( $funnel[ $i - 1 ]['count'] ?? 0 );
						$unit  = 0 === $i ? 'requirements' : ( $count === $total ? 'in consideration' : ( 1 === $count ? 'hired' : 'still in' ) ); ?>
					<li class="slx-step"><div class="slx-count"><?php echo (int) $count; ?><small><?php echo esc_html( $unit ); ?></small></div><div><h5><?php echo esc_html( $st['key'] ); ?></h5><p><?php echo esc_html( $st['note'] ); ?></p></div></li>
					<?php endforeach; ?>
				</ol>
				<p class="slx-fine">Experience gets someone into consideration. Deeper evaluation decides who deserves a closer look. Counts are illustrative; every search is different.</p>
			</div>
		</div>
		<div class="sl-payoff rv" style="--d:2"><div><h3><?php hsg_e( 'sl_payoff_h3' ); ?></h3><p><?php hsg_e( 'sl_payoff_p' ); ?></p></div><a class="btn" href="<?php echo hsg_anchor( 'collaborative' ); ?>">See How Collaborative Search<sup>®</sup> Works <span class="arrow" aria-hidden="true">→</span></a></div>
	</div>
</section>
