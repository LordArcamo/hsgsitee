<?php
/**
 * Live openings for the homepage "Current Opportunities" board.
 *
 * Source: the same Top Echelon (Big Biller) job board the live site embeds at
 * /job-search-2/. The widget authenticates with a public API key that is
 * already printed in that page's markup, so calling the JSON endpoint from
 * PHP exposes nothing new. Responses are cached for 15 minutes; on any failure
 * the board falls back to the roles typed into the Home page's ACF field.
 */
defined( 'ABSPATH' ) || exit;

function hsg_jobs_api_key(): string { return (string) apply_filters( 'hsg_topechelon_api_key', '8d5c249d8032f8f2' ); }
function hsg_jobs_board_path(): string { return (string) apply_filters( 'hsg_jobs_board_path', '/job-search-2/' ); }

/** @return array<int, array{title:string,industry:string,location:string,href:string}> */
function hsg_live_jobs( int $count = 10 ): array {
	$key = 'hsg_live_jobs_' . $count;
	$cached = get_transient( $key );
	if ( is_array( $cached ) ) { return $cached; }

	$jobs = array();
	$pages = (int) ceil( $count / 10 );
	for ( $p = 1; $p <= $pages; $p++ ) {
		$res = wp_remote_get( 'https://bb3api.topechelon.com/job_board/job_searches/one_off_search?page=' . $p, array(
			'timeout' => 8,
			'headers' => array( 'Authorization' => 'Apikey ' . hsg_jobs_api_key(), 'Accept' => 'application/json' ),
		) );
		if ( is_wp_error( $res ) || 200 !== wp_remote_retrieve_response_code( $res ) ) { break; }
		$data = json_decode( wp_remote_retrieve_body( $res ), true );
		foreach ( (array) ( $data['results'] ?? array() ) as $r ) {
			$city  = trim( (string) ( $r['city'] ?? '' ) );
			$state = trim( (string) ( $r['state']['abbreviation'] ?? '' ) );
			$loc   = trim( $city . ( $city && $state ? ', ' : '' ) . $state );
			$remote = (string) ( $r['remote_option'] ?? '' );
			$tag = match ( $remote ) { 'remote' => 'Remote', 'hybrid' => 'Hybrid', 'on_site', 'onsite' => 'On-site', default => '' };
			if ( '' === $tag && ! empty( $r['posted_date'] ) ) { $tag = 'Posted ' . wp_date( 'M j', strtotime( $r['posted_date'] ) ); }
			if ( ! empty( $r['featured_on_job_board'] ) ) { $tag = 'Featured'; }
			$jobs[] = array(
				'title'    => (string) ( $r['position_title'] ?? '' ),
				'industry' => $tag,
				'location' => $loc ?: 'Location on request',
				'href'     => home_url( hsg_jobs_board_path() . '#!/' . rawurlencode( (string) ( $r['id'] ?? '' ) ) . '/detail' ),
			);
		}
		if ( empty( $data['pagination']['next_page'] ) ) { break; }
	}
	$jobs = array_slice( array_filter( $jobs, fn( $j ) => '' !== $j['title'] ), 0, $count );
	$jobs = apply_filters( 'hsg_live_jobs', $jobs );
	set_transient( $key, $jobs, $jobs ? 15 * MINUTE_IN_SECONDS : 2 * MINUTE_IN_SECONDS );
	return $jobs;
}
