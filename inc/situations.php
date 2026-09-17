<?php
/**
 * Situations Wanted — the employer-side results page.
 *
 * Port of the design's situations-wanted/[role] page. The employer's "For
 * Companies" intake (after the lead is stored) lands on
 * /situations-wanted/?role=<group>&location=…&experience=…&position=…&career_path=…&salary=…
 * and this renders that group's candidates, ranked by how closely they fit
 * the experience band and salary range. Everything is rendered server-side,
 * so the page prints exactly as it reads — Michael's "printout from the
 * machine".
 *
 * Data: inc/situations-data.json (ALL PROFILES FICTIONAL — the design's ten
 * pools plus the mechanical-engineering pool from the earlier spec). Replace
 * with a real, consented feed before showing live candidates; until then the
 * page is noindexed.
 */
defined( 'ABSPATH' ) || exit;

/** All role groups, keyed by group key. Filter `hsg_sw_groups` to swap in a real feed. */
function hsg_sw_groups(): array {
	static $groups = null;
	if ( null === $groups ) {
		$raw = json_decode( (string) file_get_contents( __DIR__ . '/situations-data.json' ), true ) ?: array();
		$groups = array();
		foreach ( $raw as $g ) { $groups[ $g['key'] ] = $g; }
	}
	return apply_filters( 'hsg_sw_groups', $groups );
}
function hsg_sw_group( string $key ): ?array { return hsg_sw_groups()[ $key ] ?? null; }

/** The role the visitor asked for — never guessed, never nudged into a neighbour. */
function hsg_sw_requested_role(): string {
	$r = isset( $_GET['role'] ) ? sanitize_key( wp_unslash( $_GET['role'] ) ) : '';
	return isset( hsg_sw_groups()[ $r ] ) ? $r : '';
}

/** Where the intake form sends a completed employer search. */
function hsg_sw_results_url(): string { return apply_filters( 'hsg_sw_results_url', home_url( '/situations-wanted/' ) ); }

/* ---------- the controlled answers (the form's option labels are the values) ---------- */
function hsg_sw_experience_bands(): array {
	return array( '5–8 Years' => array( 5, 8 ), '8–12 Years' => array( 8, 12 ), '12–15 Years' => array( 12, 15 ), '15–20 Years' => array( 15, 20 ), '20+ Years' => array( 20, INF ) );
}
function hsg_sw_experience_display( string $v ): string {
	if ( 'Flexible / Not Sure' === $v ) { return 'Experience: Flexible'; }
	return isset( hsg_sw_experience_bands()[ $v ] ) ? $v . ' Experience' : '';
}
function hsg_sw_position_display( string $v ): string { return array( 'New Role' => 'New Position', 'Replacement' => 'Replacement Position' )[ $v ] ?? ''; }
function hsg_sw_career_display( string $v ): string { return in_array( $v, array( 'Yes', 'No', 'Not Sure' ), true ) ? 'Career Path: ' . $v : ''; }

/* ---------- the two free-text answers ---------- */
function hsg_sw_clean( string $raw, int $max ): string { return mb_substr( trim( preg_replace( '/\s+/u', ' ', $raw ) ), 0, $max ); }

/** "newark, nj" → "Newark, NJ". Words already carrying a capital are left alone. */
function hsg_sw_format_location( string $v ): string {
	$minor = array( 'a', 'an', 'and', 'at', 'for', 'in', 'of', 'or', 'the', 'to' );
	$words = explode( ' ', $v ); $out = array();
	foreach ( $words as $i => $w ) {
		$bare = preg_replace( '/[^A-Za-z]/', '', $w );
		if ( 2 === strlen( $bare ) ) { $out[] = strtoupper( $w ); continue; }
		if ( $i > 0 && in_array( strtolower( $w ), $minor, true ) ) { $out[] = strtolower( $w ); continue; }
		$out[] = implode( '-', array_map( fn( $p ) => ( '' === $p || preg_match( '/[A-Z]/', $p ) ) ? $p : mb_strtoupper( mb_substr( $p, 0, 1 ) ) . mb_substr( $p, 1 ), explode( '-', $w ) ) );
	}
	return implode( ' ', $out );
}

/** Figures in a typed salary as whole thousands: "$180K – $225K", "180-225", "180000 to 225000" → [180, 225]; words → null. */
function hsg_sw_salary_figures( string $v ): ?array {
	if ( '' === $v ) { return null; }
	$words = preg_replace( '/\b(?:to|and)\b/i', '', preg_replace( '/k/i', '', preg_replace( '/[$£€,]/', '', $v ) ) );
	if ( preg_match( '/[a-z]/i', $words ) ) { return null; }
	if ( ! preg_match_all( '/\d[\d,]*(?:\.\d+)?k?/i', $v, $m ) ) { return null; }
	$out = array();
	foreach ( $m[0] as $f ) {
		$k = (bool) preg_match( '/k$/i', $f ); $n = (float) str_replace( ',', '', preg_replace( '/k/i', '', $f ) );
		if ( $n <= 0 ) { return null; }
		$out[] = ( $k || $n < 1000 ? $n * 1000 : $n ) / 1000;
	}
	return $out;
}
function hsg_sw_salary_display( string $v ): string {
	$f = hsg_sw_salary_figures( $v );
	if ( ! $f || count( $f ) > 2 ) { return $v; }
	return implode( '–', array_map( fn( $n ) => '$' . round( $n ) . 'K', $f ) );
}

/** The search as it arrived, cleaned. Keys match the intake form's field names. */
function hsg_sw_query(): array {
	$g = fn( $k, $max ) => isset( $_GET[ $k ] ) ? hsg_sw_clean( sanitize_text_field( wp_unslash( $_GET[ $k ] ) ), $max ) : '';
	return array( 'location' => $g( 'location', 60 ), 'experience' => $g( 'experience', 40 ), 'position' => $g( 'position', 40 ), 'career_path' => $g( 'career_path', 40 ), 'salary' => $g( 'salary', 40 ) );
}

/** The criteria line, in the spec's order. Unanswered or unrecognised answers are dropped, not invented. */
function hsg_sw_criteria_row( array $q ): array {
	$items = array(
		array( 'location', 'Location', '' === $q['location'] ? '' : hsg_sw_format_location( $q['location'] ) ),
		array( 'experience', 'Experience', hsg_sw_experience_display( $q['experience'] ) ),
		array( 'position', 'Opening', hsg_sw_position_display( $q['position'] ) ),
		array( 'career_path', 'Career path', hsg_sw_career_display( $q['career_path'] ) ),
		array( 'salary', 'Salary range', hsg_sw_salary_display( $q['salary'] ) ),
	);
	$row = array();
	foreach ( $items as list( $key, $label, $value ) ) {
		if ( '' === $value ) { continue; }
		// "Career Path: Yes" already names itself — no screen-reader label in front of it.
		$row[] = array( 'key' => $key, 'label' => str_starts_with( strtolower( $value ), strtolower( $label ) ) ? '' : $label, 'value' => $value );
	}
	return $row;
}

/**
 * Rank the group's candidates by fit. Experience is the strong factor and
 * salary the secondary one, on one scale: a year outside the requested band
 * weighs the same as $50K outside the requested range. Nothing to rank on
 * ("Flexible / Not Sure" + "DOE") leaves the order as written. Nobody sees a score.
 */
function hsg_sw_rank( array $cands, array $q ): array {
	$band = hsg_sw_experience_bands()[ $q['experience'] ] ?? null;
	$fig = hsg_sw_salary_figures( $q['salary'] ); $budget = $fig ? array( $fig[0], $fig[ count( $fig ) - 1 ] ) : null;
	if ( ! $band && ! $budget ) { return $cands; }
	$outside = fn( $v, $r ) => $v < $r[0] ? $r[0] - $v : ( $v > $r[1] ? $v - $r[1] : 0 );
	$dist = fn( $c ) => ( $band ? $outside( $c['totalExperience'], $band ) : 0 ) + ( $budget ? $outside( $c['currentSalary'] / 1000, $budget ) / 50 : 0 );
	usort( $cands, fn( $a, $b ) => $dist( $a ) <=> $dist( $b ) ); // PHP 8 usort is stable
	return $cands;
}

/* ---------- columns: one definition, three renderings ---------- */
function hsg_sw_years( int $n ): string { return $n . ( 1 === $n ? ' Year' : ' Years' ); }
function hsg_sw_salary( int $n ): string { return '$' . round( $n / 1000 ) . 'K'; }
/** [label, short header, value fn, numeric] — the four card statistics in the spec's order. */
function hsg_sw_stats(): array {
	return array(
		array( 'Years at Current Company', 'Current Co.', fn( $p ) => hsg_sw_years( (int) $p['yearsCurrentCompany'] ), true ),
		array( 'Overall Experience', 'Overall Exp.', fn( $p ) => hsg_sw_years( (int) $p['totalExperience'] ), true ),
		array( 'Current Salary', 'Salary', fn( $p ) => hsg_sw_salary( (int) $p['currentSalary'] ), true ),
		array( 'Highest Degree / Certification', 'Degree / Certification', fn( $p ) => $p['credential'], false ),
	);
}
function hsg_sw_quick_stats(): array { $s = hsg_sw_stats(); return array( $s[1], $s[2] ); }
function hsg_sw_full_stats(): array {
	return array_merge( array( array( 'Current Role', 'Current Role', fn( $p ) => $p['role'], false ) ), hsg_sw_stats(), array( array( 'Software / Tools', 'Software / Tools', fn( $p ) => implode( ', ', $p['tools'] ), false ) ) );
}

/* ---------- WordPress wiring ---------- */
/** Fictional data: keep search engines out until a real feed replaces it. */
add_filter( 'wp_robots', function ( array $robots ): array {
	if ( is_page_template( 'page-situations.php' ) ) { $robots['noindex'] = true; $robots['nofollow'] = true; }
	return $robots;
} );
