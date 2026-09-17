<?php $groups = apply_filters( 'hsg_career_menu', array(
	'Direction &amp; Timing' => array( 'Career Roadmapping', 'Career Direction &amp; Goal Setting', 'Personal &amp; Professional Assessments', 'Stay-vs.-Leave Analysis', 'Career Timing Strategy', 'Long-Term Career Planning' ),
	'Positioning &amp; Materials' => array( 'Resume Strategy &amp; Development', 'Executive Resume Positioning', 'LinkedIn &amp; Online Presence', 'Personal Brand &amp; Professional Positioning', 'Accomplishment &amp; Value Proposition Development' ),
	'Search &amp; Access' => array( 'Networking Strategy', 'Recruiter Strategy', 'Job Search Planning', 'Target Company Strategy' ),
	'Interview &amp; Offer' => array( 'Interview Preparation', 'Executive Interview Strategy', 'Reference Strategy / Private Vetting Guidance', 'Opportunity Evaluation', 'Offer Evaluation', 'Compensation &amp; Negotiation Preparation' ),
	'Growing Where You Are' => array( 'Promotion Strategy', 'Internal Career Strategy', 'Leadership Development Planning' ),
) ); ?>
<section class="sec sec--soft" id="career">
	<div class="wrap">
		<div class="career-grid">
			<div class="career-copy rv">
				<p class="eyebrow is-career">Career Solutions</p>
				<h2 style="font-size:clamp(28px,3.4vw,44px)"><?php hsg_e( 'career_h2' ); ?></h2>
				<p class="lede"><?php hsg_e( 'career_lede1' ); ?></p><p class="lede"><?php hsg_e( 'career_lede2' ); ?></p>
				<a class="btn" href="<?php echo hsg_link( 'career_cta_link' ); ?>"><?php hsg_e( 'career_cta' ); ?> <span class="arrow" aria-hidden="true">→</span></a>
			</div>
			<div class="qcards"><?php for ( $i = 1; $i <= 4; $i++ ) { echo '<div class="qcard rv" style="--d:' . $i . '"><span class="qn">' . $i . '</span><h4>' . esc_html( hsg_field( "q$i" ) ) . '</h4></div>'; } ?></div>
		</div>
		<div class="menu"><?php $d = 0; foreach ( $groups as $h => $items ) { $d++; echo '<div class="menu-group rv" style="--d:' . $d . '"><h4>' . $h . '</h4><ul>'; foreach ( $items as $it ) { echo '<li>' . $it . '</li>'; } echo '</ul></div>'; } ?></div>
	</div>
</section>
