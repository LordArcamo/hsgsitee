<?php
/**
 * THE content registry. Every editable string on the homepage is defined once
 * here with its default (the approved design copy). ACF registers these as a
 * field group on the Home page; hsg_field() falls back to the default when a
 * field is empty or ACF is absent, so the templates never render blank.
 *
 * Field types: text | textarea | html (textarea allowing inline tags) | url | image
 */
defined( 'ABSPATH' ) || exit;

function hsg_field_registry(): array {
	static $r = null;
	if ( $r ) { return $r; }
	$t = fn( $l, $d ) => array( 'text', $l, $d ); $a = fn( $l, $d ) => array( 'textarea', $l, $d ); $h = fn( $l, $d ) => array( 'html', $l, $d ); $u = fn( $l, $d ) => array( 'url', $l, $d ); $i = fn( $l ) => array( 'image', $l, '' ); $rep = fn( $l, $sub, $d ) => array( 'repeater', $l, $d, $sub );
	$r = array(
	'Site' => array(
		'site_tagline' => $t( 'Tagline', 'Leading Candidates to Leading Companies.' ),
		'site_meta_description' => $a( 'Meta description', 'Executive recruiting and career solutions in New Jersey. Hiring Solutions Group helps companies identify, evaluate and hire exceptional talent, and helps accomplished professionals find where they create the greatest value.' ),
		'site_phone' => $t( 'Phone (display)', '973-773-4473' ), 'site_phone_href' => $t( 'Phone (E.164)', '+19737734473' ),
		'site_sms' => $t( 'Private Vetting text number (display)', '347-665-7733' ), 'site_sms_href' => $t( 'Private Vetting text number (E.164)', '+13476657733' ),
		'site_email' => $t( 'Email', 'contact@hiringsolutionsgroup.com' ),
		'site_street' => $t( 'Street', '105 Van Houten Ave' ), 'site_city' => $t( 'City', 'Passaic' ), 'site_region' => $t( 'State', 'NJ' ), 'site_zip' => $t( 'ZIP', '07055' ),
		'site_lead_email' => $t( 'Where new leads are emailed (blank = WordPress admin email)', '' ),
		'site_related_name' => $t( 'Sister company name', 'Business Solutions Group' ), 'site_related_url' => $u( 'Sister company URL', 'https://bsg-edge.com/' ),
	),
	'Facts' => array(
		'fact_years' => $t( 'Years', '30' ), 'fact_years_sentence' => $t( 'Years (sentence)', '30 years of recruiting experience' ),
		'fact_placements' => $t( 'Placements', '1,200+' ), 'fact_network' => $t( 'Network', '1,600+' ), 'fact_partners' => $t( 'Partners', '1,600' ),
		'fact_resumes' => $t( 'Resumes', '4.3M+' ), 'fact_interviews' => $t( 'Interviews', '18K+' ),
	),
	'Hero' => array(
		'hero_eyebrow' => $t( 'Eyebrow (after the years figure)', 'Years of Executive Recruiting Experience' ),
		'hero_h1_hire' => $t( 'H1 — green part', 'Executive Recruiting' ), 'hero_h1_career' => $t( 'H1 — gold part', 'Career Solutions' ), 'hero_h1_tail' => $t( 'H1 — ending', 'in New Jersey' ),
		'hero_brandline' => $t( 'Brand line', 'Leading Candidates to Leading Companies.' ),
		'hero_p1' => $a( 'Paragraph 1', 'Hiring Solutions Group has decades of experience working with both employers and professionals. We help companies identify, evaluate, and hire exceptional talent while helping accomplished professionals understand where they can create the greatest value next.' ),
		'hero_p2' => $a( 'Paragraph 2', 'Our approach goes deeper than resumes and job descriptions. We listen carefully, take notes, assess, interview, vet, and help our clients make better-informed decisions built for long-term success.' ),
		'hero_cta1' => $t( 'Primary button', 'Find the Right Talent' ), 'hero_cta1_link' => $t( 'Primary button link (anchor id or URL)', '/job-search-2/' ),
		'hero_cta2' => $t( 'Secondary button', 'Explore Career Solutions' ), 'hero_cta2_link' => $t( 'Secondary button link', 'career' ),
		'hero_bridge' => $h( 'BSG bridge line', 'Where does it go from here? When a company\'s needs extend beyond hiring into business growth, leadership, or HR, explore Business Solutions Group at <a href="https://bsg-edge.com/">BSG-edge.com</a>.' ),
		'hero_image' => $i( 'Hero photograph (4:4.4, premium business photography)' ),
		'hero_badge' => $t( 'Badge caption', 'Placements across executive and specialized roles' ),
	),
	'Both Sides' => array(
		'two_eyebrow' => $t( 'Eyebrow', 'Both Sides of the Table' ), 'two_h2' => $t( 'Heading', 'Experience From Both Sides. Representation on One.' ),
		'two_lede' => $a( 'Lede', 'HSG has spent decades working with both employers and professionals. That experience continues to give us a deeper understanding of what each side needs, expects, and considers when making an important hiring or career decision. But our commitment in every engagement is clear: HSG represents only one side.' ),
		'two_hire_image' => $i( 'For Companies card photo (16:9)' ), 'two_career_image' => $i( 'For Professionals card photo (16:9)' ),
		'two_hire_h3' => $t( 'Companies card heading', 'Find the Right Person, Not Simply the Right Resume.' ),
		'two_hire_p' => $h( 'Companies card copy', 'Executive search, deeper candidate evaluation, interviewing support, Collaborative Search<sup>®</sup>, assessments, Private Vetting, and guidance throughout the hiring decision.' ),
		'two_hire_cta' => $t( 'Companies card button', 'Explore Hiring Solutions' ),
		'two_career_h3' => $t( 'Professionals card heading', 'Make the Right Career Move, Not Simply the Next Move.' ),
		'two_career_p' => $a( 'Professionals card copy', 'Career roadmapping, career assessment, positioning, interview strategy, professional development, opportunity evaluation, and guidance designed around who you are, what you want, and when a move truly makes sense.' ),
		'two_career_cta' => $t( 'Professionals card button', 'Explore Career Solutions' ),
		'two_legal' => $a( 'Representation note', 'HSG does not represent or accept compensation from both the hiring company and candidate in the same search. If a potential conflict arises by coincidence, both parties are informed promptly so the situation can be addressed before proceeding.' ),
	),
	'Why Two-Sided' => array(
		'why_eyebrow' => $t( 'Eyebrow', 'Why the Two-Sided Experience Matters' ), 'why_h2' => $t( 'Heading', 'Better Decisions Come From Understanding Both Perspectives.' ),
		'why_lede1' => $a( 'Lede 1', 'Companies are looking for more than qualifications. Professionals are looking for more than a job. The strongest outcomes happen when business needs, capabilities, goals, culture, expectations, timing, and opportunity align.' ),
		'why_lede2' => $a( 'Lede 2', 'Because HSG has deep experience working with employers and professionals, we understand the questions, concerns, pressures, and expectations that can exist on either side. We use that perspective solely to serve the client we represent in each engagement.' ),
	),
	'Hiring Solutions' => array(
		'hiring_h2' => $t( 'Heading', 'Great Hiring Starts With Deeper Understanding.' ),
		'hiring_lede1' => $t( 'Lede 1', 'Hiring an executive is not a resume transaction.' ),
		'hiring_lede2' => $a( 'Lede 2', 'Before HSG recommends a candidate, we work to understand the organization, its leadership, expectations, culture, challenges, and what success in the position actually requires. Then we look beyond credentials to understand the person behind the resume.' ),
		'hiring_reach' => $h( 'Reach line (use {partners})', 'Our reach is supported by approximately <b>{partners}</b> partners throughout the <b>United States, Canada, England, and China</b>.' ),
		'hiring_cta' => $t( 'Button', 'Find Talent' ), 'hiring_cta_link' => $t( 'Button link', 'close' ),
		'cap1_h' => $t( 'Card 1 heading', 'Executive Search' ), 'cap1_p' => $t( 'Card 1 copy', 'Targeted searches for leadership and specialized talent.' ),
		'cap2_h' => $t( 'Card 2 heading', 'Candidate Assessment' ), 'cap2_p' => $t( 'Card 2 copy', 'Deeper evaluation of experience, leadership, communication, behavior, and alignment.' ),
		'cap3_h' => $t( 'Card 3 heading', 'Interviewing Support' ), 'cap3_p' => $t( 'Card 3 copy', 'Guidance before and during the interview process to help companies uncover what conventional interviews can miss.' ),
		'cap4_h' => $t( 'Card 4 heading', 'Private Vetting' ), 'cap4_p' => $t( 'Card 4 copy', 'A proprietary approach that takes reference checking to a deeper level.' ),
	),
	'Career Solutions' => array(
		'career_h2' => $t( 'Heading', 'Your Next Move Should Be the Right Move.' ),
		'career_lede1' => $a( 'Lede 1', 'A successful career is not built by moving every time another opportunity appears. Sometimes the right decision is to leave. Sometimes it is to stay. Sometimes it is to wait for a promotion, bonus, leadership change, or greater responsibility before deciding what comes next.' ),
		'career_lede2' => $a( 'Lede 2', 'Career Solutions helps accomplished professionals step back, understand the bigger picture, and build a plan before circumstances force a decision.' ),
		'career_cta' => $t( 'Button', 'Explore Career Solutions' ), 'career_cta_link' => $t( 'Button link', 'close' ),
		'q1' => $t( 'Question 1', 'Where are you now?' ), 'q2' => $t( 'Question 2', 'Where do you actually want to go?' ),
		'q3' => $t( 'Question 3', 'What kind of role fits your personality, experience, goals, and circumstances?' ), 'q4' => $t( 'Question 4', 'When is the right time to make that move?' ),
		'plan_h2' => $t( 'Plan Ahead heading', 'The Best Time to Plan Your Next Career Move Is Before You Need One.' ),
		'plan_lede' => $a( 'Plan Ahead lede', 'Many professionals wait until they urgently need a change before thinking seriously about their next move. Career roadmapping helps you understand your options, strengthen your positioning, and prepare while you still have the freedom to make thoughtful decisions rather than desperate ones.' ),
		'plan_cta' => $t( 'Plan Ahead button', 'Start With Career Roadmapping' ),
		'plan_quote' => $a( 'Quote', 'It\'s best to borrow from a bank when you don\'t have to. You get the best rates. Looking for a job should be approached the same way. Plan ahead while you can.' ),
		'plan_cite' => $t( 'Quote attribution', 'Rabbi Dr. Maynard Schlager' ), 'plan_cite_image' => $i( 'Portrait of the person quoted (square)' ),
	),
	'Shortlist' => array(
		'sl_h2' => $t( 'Heading', '50 Candidate Profiles. One Hiring Decision.' ), 'sl_sub' => $t( 'Subheading', 'See how a hypothetical candidate pool becomes a focused shortlist.' ),
		'sl_lede1' => $t( 'Lede 1', 'Finding candidates is not the hardest part of executive recruiting.' ),
		'sl_lede2' => $a( 'Lede 2', 'Understanding which person has the experience, leadership style, judgment, motivations, working style, and organizational fit to succeed is where the real work begins.' ),
		'sl_lede3' => $a( 'Lede 3', 'HSG goes beyond the resume to help clients narrow a large candidate pool into a smaller group of people worth serious consideration.' ),
		'sl_role' => $t( 'Example role', 'VP of Operations' ), 'sl_meta' => $t( 'Example role meta', 'Manufacturing · Northern New Jersey' ),
		'sl_payoff_h3' => $t( 'Payoff heading', 'Narrowing the Field Is Only the Beginning.' ), 'sl_payoff_p' => $t( 'Payoff copy', 'The deeper questions begin once the obvious qualifications have been considered.' ),
		'sl_criteria' => $rep( 'What the company needs (exactly six, in order)', array( array( 'label', 'text', 'Requirement' ) ), array_map( fn( $c ) => array( 'label' => $c ), hsg_shortlist_default_criteria() ) ),
		'sl_candidates' => $rep( 'Candidate pool — fictional or anonymised profiles only', array(
			array( 'role', 'text', 'Role title' ), array( 'years', 'number', 'Years' ), array( 'industry', 'text', 'Industry' ), array( 'team', 'text', 'Team size (e.g. 180+)' ), array( 'scope', 'text', 'Scope (e.g. $120M P&L)' ),
			array( 'c1', 'evidence', 'Req 1' ), array( 'c2', 'evidence', 'Req 2' ), array( 'c3', 'evidence', 'Req 3' ), array( 'c4', 'evidence', 'Req 4' ), array( 'c5', 'evidence', 'Req 5' ), array( 'c6', 'evidence', 'Req 6' ),
			array( 'strength', 'text', 'Strength' ), array( 'watch', 'text', 'Watch point' ), array( 'exits_at', 'stage', 'Leaves the pool at' ), array( 'exit_reason', 'text', 'Reason shown as they leave' ),
		), array_map( fn( $c ) => array( 'role' => $c['role'], 'years' => $c['years'], 'industry' => $c['industry'], 'team' => $c['team'], 'scope' => $c['scope'], 'c1' => $c['c'][0], 'c2' => $c['c'][1], 'c3' => $c['c'][2], 'c4' => $c['c'][3], 'c5' => $c['c'][4], 'c6' => $c['c'][5], 'strength' => $c['strength'], 'watch' => $c['watch'], 'exits_at' => $c['exits_at'], 'exit_reason' => $c['exit_reason'] ), hsg_shortlist_default_candidates() ) ),
	),
	'Collaborative Search' => array(
		'collab_h2' => $t( 'Heading', 'Hiring Shouldn\'t Happen in a Vacuum.' ),
		'collab_lede1' => $t( 'Lede 1', 'A new executive does not work with a job description. They work with people.' ),
		'collab_lede2' => $h( 'Lede 2', 'HSG\'s Collaborative Search<sup>®</sup> approach looks beyond the hiring manager to better understand the people, relationships, expectations, and working environment surrounding the role. Depending on the engagement, HSG may help prepare interviews, participate in the interview process, conduct assessments, gather feedback, evaluate candidates, and support the client throughout the decision.' ),
		'collab_micro' => $t( 'Micro line', 'Understand the company. Understand the candidate. Improve the decision.' ),
		'collab_cta1' => $t( 'Primary button', 'Discuss Your Search' ), 'collab_cta2' => $t( 'Secondary button', 'Discover Collaborative Search®' ), 'collab_cta2_link' => $t( 'Secondary button link', '/find-talent/' ),
	),
	'Private Vetting' => array(
		'pv_h2' => $t( 'Heading', 'Reference Checking. Taken Further.' ),
		'pv_p1' => $a( 'Paragraph 1', 'Traditional reference checking often confirms information you already know. Friends and familiar references may sometimes tell people what they expect or want to hear. That does not always create the clearest picture.' ),
		'pv_p2' => $h( 'Paragraph 2', '<strong>HSG\'s Private Vetting goes deeper.</strong> As our professional network and candidate resources have expanded, we have developed a proprietary approach designed to create a more realistic understanding of the individual behind the resume.' ),
		'pv_p3' => $a( 'Paragraph 3', 'For employers, that means looking beyond credentials and surface-level references to better understand the person being considered and how that individual may fit within the organization.' ),
		'pv_p4' => $a( 'Paragraph 4', 'For professionals, our deeper approach also means examining whether a career change makes sense now, three months from now, six months from now, or after an important professional milestone.' ),
		'pv_brandline' => $t( 'Brand line', 'Bad information in can lead to bad decisions out. We dig deeper.' ),
		'pv_q' => $t( 'Text prompt', 'Want to know how Private Vetting works?' ), 'pv_keyword' => $t( 'Text keyword', 'TELL ME MORE' ),
	),
	'People Not Paper' => array(
		'ppl_h2a' => $t( 'Heading (white)', 'The Best Candidate' ), 'ppl_h2b' => $t( 'Heading (muted)', 'Isn\'t Always the Best Resume.' ),
		'ppl_p1' => $a( 'Paragraph 1', 'A resume tells you where someone has been. It does not fully reveal how that person thinks, communicates, leads, responds to pressure, works with others, learns, adapts, or fits the people already inside an organization.' ),
		'ppl_p2' => $a( 'Paragraph 2', 'Some recruiters compete on how quickly they can send resumes. HSG takes a different approach. We invest the time required to understand the company, the executives making the decision, the position, and the people being considered.' ),
		'ppl_p3' => $a( 'Paragraph 3', 'We interview deeper. We listen longer. We ask better questions. And we work to understand the person behind the resume before helping our client make an important decision.' ),
		'ppl_pull' => $t( 'Pull quote', 'People deserve more attention than paper.' ),
		'proof_h2' => $t( 'Experience & Proof heading', 'Three Decades of Connecting People and Opportunity.' ),
	),
	'Forensic Interviewing' => array(
		'fi_h2' => $t( 'Heading', 'Interviews Reveal More When You Know Where to Look.' ), 'fi_cta' => $t( 'Button', 'Explore Our Interviewing Approach' ), 'fi_cta_link' => $t( 'Button link', '/contact/' ),
		'fi_lede1' => $a( 'Lede 1', 'A polished interview does not necessarily reveal how someone will lead, communicate, solve problems, respond under pressure, or work with the people around them.' ),
		'fi_lede2' => $a( 'Lede 2', 'HSG brings decades of recruiting, HR, assessment, and interviewing experience into the process to help clients look beyond rehearsed answers. We work to uncover the experiences, behaviors, motivations, inconsistencies, strengths, and working styles that can influence whether a candidate succeeds after the interview is over.' ),
	),
	'Success Story' => array(
		'story_h2' => $t( 'Heading', 'The Resume They Almost Overlooked.' ),
		'story_m1' => $t( 'Metric 1', '12+' ), 'story_m1_l' => $t( 'Metric 1 label', 'Interviews across two decision-makers' ),
		'story_m2' => $t( 'Metric 2', '4' ), 'story_m2_l' => $t( 'Metric 2 label', 'Months until she was promoted' ),
		'story_p1' => $t( 'Paragraph 1', 'Two owners with two different pictures of the right hire, and more than a dozen interviews that only widened the gap between them.' ),
		'story_p2' => $t( 'Paragraph 2', 'One candidate looked like the obvious choice on paper. Another, with deeper experience, kept being passed over because her résumé undersold her.' ),
		'story_p3' => $t( 'Paragraph 3', 'HSG stayed in the room: sitting in on the interviews, putting both candidates through the same assessment, and helping the owners weigh what they had seen rather than what they had read.' ),
		'story_turn' => $t( 'The turn', 'They hired the candidate they had almost overlooked.' ),
		'story_p4' => $t( 'Paragraph 4', 'Four months later she was promoted. Both owners still describe her as one of the best people they have hired in decades.' ),
		'story_cta' => $t( 'Button', 'More Success Stories' ), 'story_cta_link' => $t( 'Button link', '/success-stories/' ),
	),
	'Meet Michael' => array(
		'michael_h2' => $t( 'Heading', 'Meet Michael Schlager' ), 'michael_theme' => $t( 'Theme line', 'Three Generations of Matchmakers.' ),
		'michael_lede1' => $a( 'Lede 1', 'Michael Schlager grew up around people who understood that the right match can change a business, a career, or even a life.' ),
		'michael_lede2' => $a( 'Lede 2', 'For three decades, he has applied that mindset to executive recruiting, interviewing, assessment, career strategy, and the decisions that connect companies with the people who can help them move forward.' ),
		'michael_lede3' => $a( 'Lede 3', 'His approach is simple: listen carefully, understand deeply, and take the time required to make a better decision.' ),
		'michael_proofs' => $a( 'Proof points (one per line; {years} = years sentence)', "{years}\nRecruiting and HR training and credentials\nExecutive interviewing expertise\nLong-term employer and professional relationships" ),
		'michael_cta' => $t( 'Button', 'Meet Michael' ), 'michael_cta_link' => $t( 'Button link', '/about-us/' ), 'michael_image' => $i( 'Portrait (4:5)' ),
	),
	'Opportunities' => array(
		'jobs_h2' => $t( 'Heading', 'Looking for What\'s Next?' ),
		'jobs_lede' => $a( 'Lede', 'Explore opportunities across professional, management, technology, healthcare, finance, operations, and leadership fields.' ),
		'jobs_cta1' => $t( 'Primary button', 'View Current Opportunities' ), 'jobs_cta1_link' => $t( 'Primary button link', '/job-search-2/#!/search' ),
		'jobs_cta2' => $t( 'Secondary button', 'Submit Your Resume' ), 'jobs_cta2_link' => $t( 'Secondary button link', '/submit-resume/' ),
		'jobs_list' => $a( 'Fallback roles, used only if the live job board cannot be reached — one per line: Title | Tag | Location', "General & Operations Manager | Operations | New Jersey / New York Metro\nFinance Executive / CFO | Finance | New Jersey / Northeast\nSoftware & Technology Leader | Technology | New Jersey / Remote\nSales & Business Development Executive | Sales | New Jersey / New York Metro\nMedical & Health Services Manager | Healthcare | New Jersey\nAccounting & Finance Professional | Finance | New Jersey / New York Metro\nManagement & Business Strategy Professional | Management | New Jersey\nInformation Security / Cybersecurity Professional | Technology | New Jersey / Remote\nData & Analytics Professional | Technology | New Jersey / Remote\nHealthcare Executive / Administrator | Healthcare | New Jersey" ),
		'jobs_flag' => $t( 'Board flag (blank = live indicator)', '' ),
		'jobs_caption' => $a( 'Caption', 'Openings shown are pulled live from the HSG job board and refresh every 15 minutes. Select a role to read the full description and apply.' ),
	),
	'Insights' => array(
		'ins_h2' => $t( 'Heading', 'Better Decisions Start With Better Questions.' ), 'ins_intro' => $a( 'Intro line', 'This is the HSG journal: practical articles on hiring, interviewing, leadership and career strategy, written from three decades of executive search.' ), 'ins_cta' => $t( 'Button', 'Explore HSG Insights' ), 'ins_cta_link' => $t( 'Button link', '/articles/' ),
	),
	'Where We Work' => array(
		'geo_h2' => $t( 'Heading', 'Rooted in New Jersey. Connected Far Beyond It.' ),
		'geo_lede' => $a( 'Lede', 'HSG works with companies and professionals across markets, with particularly deep engagement throughout Northern New Jersey and other priority areas where our team can work directly with clients when the engagement calls for it.' ),
		'geo_priority' => $a( 'Priority areas (one per line)', "Northern New Jersey\nLakewood\nMonsey\nBrooklyn" ),
		'geo_counties' => $a( 'Counties (one per line)', "Passaic County\nBergen County\nEssex County\nHudson County\nMorris County" ),
		'geo_towns' => $a( 'Towns (one per line)', "Passaic\nClifton\nPaterson\nHackensack\nMontclair\nNewark\nJersey City\nWayne\nParamus\nTeaneck" ),
	),
	'Final CTA' => array(
		'close_h2' => $t( 'Heading', 'Which Side of the Search Are You On?' ),
		'close_a_h3' => $t( 'Employer heading', 'I\'m Hiring.' ), 'close_a_p' => $a( 'Employer copy', 'Looking for an executive or specialized professional? Tell us what you\'re trying to solve so we can make the first conversation productive.' ),
		'close_a_cta' => $t( 'Employer button', 'Tell Us Who You Need' ), 'close_a_link' => $t( 'Employer button link', '/contact/' ),
		'close_b_h3' => $t( 'Professional heading', 'I\'m Considering My Next Move.' ), 'close_b_p' => $a( 'Professional copy', 'Thinking about changing roles, repositioning your career, or simply understanding your options? Tell us where you are today.' ),
		'close_b_cta' => $t( 'Professional button', 'Tell Us What\'s Next' ), 'close_b_link' => $t( 'Professional button link', '/contact/' ),
	),
	);
	return $r;
}

function hsg_field_default( string $name ) {
	static $flat = null;
	if ( null === $flat ) { $flat = array(); foreach ( hsg_field_registry() as $fields ) { foreach ( $fields as $k => $f ) { $flat[ $k ] = $f[2]; } } }
	return $flat[ $name ] ?? '';
}

/** Register the registry with ACF as one field group on the front page, one tab per section. */
add_action( 'acf/init', function () {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) { return; }
	$fields = array();
	foreach ( hsg_field_registry() as $tab => $defs ) {
		$fields[] = array( 'key' => 'field_hsg_tab_' . sanitize_title( $tab ), 'label' => $tab, 'type' => 'tab' );
		foreach ( $defs as $name => $d ) {
			list( $type, $label, $default ) = $d;
			$f = array( 'key' => 'field_hsg_' . $name, 'name' => $name, 'label' => $label, 'type' => 'text', 'placeholder' => is_string( $default ) ? mb_strimwidth( $default, 0, 120, '…' ) : '' );
			if ( 'textarea' === $type || 'html' === $type ) { $f['type'] = 'textarea'; $f['rows'] = 3; $f['new_lines'] = ''; }
			if ( 'url' === $type ) { $f['type'] = 'url'; }
			if ( 'image' === $type ) { $f['type'] = 'image'; $f['return_format'] = 'id'; $f['preview_size'] = 'medium'; unset( $f['placeholder'] ); }
			if ( 'repeater' === $type ) {
				$f['type'] = 'repeater'; $f['layout'] = 'table'; $f['button_label'] = 'Add row'; $f['sub_fields'] = array(); unset( $f['placeholder'] );
				foreach ( $d[3] as $sub ) {
					list( $sn, $st, $sl ) = $sub;
					$sf = array( 'key' => 'field_hsg_' . $name . '_' . $sn, 'name' => $sn, 'label' => $sl, 'type' => 'text' );
					if ( 'number' === $st ) { $sf['type'] = 'number'; }
					if ( 'evidence' === $st ) { $sf['type'] = 'select'; $sf['choices'] = array( 2 => 'Yes', 1 => 'Limited', 0 => 'Not evidenced' ); $sf['default_value'] = 2; }
					if ( 'stage' === $st ) { $sf['type'] = 'select'; $sf['choices'] = array( 2 => 'Evaluate', 3 => 'Interview', 4 => 'Vet', 5 => 'Decide', 0 => 'Never — finalist' ); $sf['default_value'] = 2; }
					$f['sub_fields'][] = $sf;
				}
				$f['instructions'] = 'Leave empty to use the design defaults. Rows here replace the defaults entirely.';
			}
			$f['instructions'] = ( 'image' === $type ) ? '' : 'Leave blank to use the design default.';
			$fields[] = $f;
		}
	}
	acf_add_local_field_group( array(
		'key' => 'group_hsg_home', 'title' => 'Homepage content', 'fields' => $fields,
		'location' => array( array( array( 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ) ) ),
		'position' => 'acf_after_title', 'style' => 'seamless', 'hide_on_screen' => array( 'the_content' ),
	) );
} );
