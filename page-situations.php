<?php
/**
 * Template Name: Situations Wanted
 *
 * Employer-side results: the role group's candidates, ranked for the search
 * in the query string, with a quick comparison beside the cards and the full
 * table below. Rendered server-side so "Print this shortlist" prints exactly
 * what is on screen. Logic and data: inc/situations.php.
 */
get_header( 'home' ); the_post();
$group = hsg_sw_group( hsg_sw_requested_role() );
$q     = hsg_sw_query();
$disclaimer = 'Candidate profiles shown are fictional examples created to demonstrate the HSG Situations Wanted experience.';
if ( $group ) :
	$cands = hsg_sw_rank( $group['candidates'], $q ); $row = hsg_sw_criteria_row( $q ); $stats = hsg_sw_stats(); $quick = hsg_sw_quick_stats(); $full = hsg_sw_full_stats();
	$crit_text = implode( ' · ', array_map( fn( $i ) => $i['value'], $row ) );
?>
<div class="sw-print-head" aria-hidden="true"><b>Hiring Solutions Group</b> · Situations Wanted · <?php echo esc_html( $group['resultTitle'] ); ?><?php echo $crit_text ? ' · ' . esc_html( $crit_text ) : ''; ?> · <?php echo esc_html( wp_date( 'F j, Y' ) ); ?></div>
<section class="sw-hero">
	<div class="wrap">
		<p class="eyebrow is-brand rv">Your Search</p>
		<h1 class="rv" style="--d:1">Situations Wanted for <?php echo esc_html( $group['resultTitle'] ); ?></h1>
		<?php if ( $row ) : ?>
		<p class="sw-criteria rv" style="--d:2"><?php foreach ( $row as $item ) : ?><span class="sw-crit-wrap"><span class="sw-dot" aria-hidden="true">·</span><span class="sw-crit"><?php if ( $item['label'] ) : ?><span class="sw-vh"><?php echo esc_html( $item['label'] ); ?>: </span><?php endif; ?><?php echo esc_html( $item['value'] ); ?></span></span><?php endforeach; ?></p>
		<?php endif; ?>
		<div class="sw-actions rv" style="--d:3">
			<button type="button" class="btn btn--ghost sw-print" onclick="window.print()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="9" rx="2"/><path d="M6 15h12v6H6z"/></svg> Print this shortlist</button>
			<a class="btn btn--ghost" href="<?php echo esc_url( home_url( '/#audbar' ) ); ?>">New search</a>
		</div>
	</div>
</section>

<section class="sec sec--soft sw-results" id="professionals">
	<div class="wrap">
		<div class="sec-head rv"><h2><?php echo count( $cands ); ?> <?php echo esc_html( $group['resultTitle'] ); ?> Matching Your Search</h2></div>
		<div class="sw-layout">
			<aside class="sw-quick" aria-labelledby="quick-compare-h">
				<div class="sw-quick-in">
					<h3 id="quick-compare-h">Quick Comparison</h3>
					<p class="sw-quick-sub">See the professionals side by side.</p>
					<table class="sw-qtable">
						<thead><tr><th scope="col">Name</th><?php foreach ( $quick as $s ) : ?><th scope="col" class="is-num"><?php echo esc_html( $s[1] ); ?></th><?php endforeach; ?></tr></thead>
						<tbody><?php foreach ( $cands as $p ) : ?><tr><th scope="row"><?php echo esc_html( $p['name'] ); ?></th><?php foreach ( $quick as $s ) : ?><td class="is-num"><?php echo esc_html( $s[2]( $p ) ); ?></td><?php endforeach; ?></tr><?php endforeach; ?></tbody>
					</table>
					<a class="btn btn--ghost sw-quick-btn" href="#full-comparison">View Full Comparison <span class="arrow arrow--down" aria-hidden="true">↓</span></a>
				</div>
			</aside>
			<div class="sw-cards">
				<?php foreach ( $cands as $i => $p ) : ?>
				<article class="sw-card rv" style="--d:<?php echo min( $i, 2 ); ?>">
					<div class="sw-card-main">
						<header class="sw-card-head">
							<span class="sw-mono" aria-hidden="true"><?php echo esc_html( mb_substr( $p['name'], 0, 1 ) ); ?></span>
							<div class="sw-card-id"><h3><?php echo esc_html( $p['name'] ); ?></h3><p class="sw-role"><?php echo esc_html( $p['role'] ); ?></p></div>
						</header>
						<p class="sw-sum"><?php echo esc_html( $p['summary'] ); ?></p>
						<ul class="sw-tools" aria-label="<?php echo esc_attr( 'Software and tools used by ' . $p['name'] ); ?>"><?php foreach ( $p['tools'] as $t ) : ?><li><?php echo esc_html( $t ); ?></li><?php endforeach; ?></ul>
					</div>
					<dl class="sw-stats"><?php foreach ( $stats as $s ) : ?><div class="sw-stat<?php echo $s[3] ? '' : ' sw-stat--wide'; ?>"><dt><?php echo esc_html( $s[0] ); ?></dt><dd><?php echo esc_html( $s[2]( $p ) ); ?></dd></div><?php endforeach; ?></dl>
				</article>
				<?php endforeach; ?>
			</div>
		</div>
		<p class="sw-fine rv"><?php echo esc_html( $disclaimer ); ?></p>
	</div>
</section>

<section class="sec" id="full-comparison">
	<div class="wrap">
		<div class="sec-head rv"><h2>Compare the Professionals</h2></div>
		<div class="sw-table-wrap rv" style="--d:1" tabindex="0" role="region" aria-label="Full comparison of the matching professionals">
			<table class="sw-table">
				<thead><tr><th scope="col">Professional</th><?php foreach ( $full as $s ) : ?><th scope="col"<?php echo $s[3] ? ' class="is-num"' : ''; ?>><?php echo esc_html( $s[1] ); ?></th><?php endforeach; ?></tr></thead>
				<tbody><?php foreach ( $cands as $p ) : ?><tr><th scope="row"><?php echo esc_html( $p['name'] ); ?></th><?php foreach ( $full as $s ) : ?><td<?php echo $s[3] ? ' class="is-num"' : ''; ?>><?php echo esc_html( $s[2]( $p ) ); ?></td><?php endforeach; ?></tr><?php endforeach; ?></tbody>
			</table>
		</div>
		<p class="sw-print-fine"><?php echo esc_html( $disclaimer ); ?></p>
	</div>
</section>

<section class="sec sec--tight" id="discuss">
	<div class="wrap">
		<div class="sw-cta rv">
			<div class="sw-cta-copy"><h2>Interested in One or More of These Professionals?</h2><p>HSG can help you evaluate fit, understand availability, and determine the next step.</p></div>
			<a class="btn" href="<?php echo esc_url( home_url( '/#close' ) ); ?>">Discuss These Professionals With HSG <span class="arrow" aria-hidden="true">→</span></a>
		</div>
	</div>
</section>
<?php else : $groups = hsg_sw_groups(); ?>
<section class="sw-hero">
	<div class="wrap">
		<p class="eyebrow is-brand rv">Situations Wanted</p>
		<h1 class="rv" style="--d:1">Professionals HSG Is Representing</h1>
		<p class="sw-index-sub rv" style="--d:2">Choose a role group to see the professionals currently available in it. To search on location, experience and compensation, start from <b>For Companies</b> above.</p>
	</div>
</section>
<section class="sec sec--soft">
	<div class="wrap">
		<ul class="sw-index">
			<?php $i = 0; foreach ( $groups as $g ) : ?>
			<li class="rv" style="--d:<?php echo min( $i++, 3 ); ?>"><a href="<?php echo esc_url( add_query_arg( 'role', $g['key'], hsg_sw_results_url() ) ); ?>"><span class="sw-index-label"><?php echo esc_html( $g['label'] ); ?></span><span class="sw-index-meta"><?php echo count( $g['candidates'] ); ?> <?php echo esc_html( $g['resultTitle'] ); ?></span><span class="arrow" aria-hidden="true">→</span></a></li>
			<?php endforeach; ?>
		</ul>
		<p class="sw-fine rv"><?php echo esc_html( $disclaimer ); ?></p>
	</div>
</section>
<?php endif; get_footer( 'home' );
