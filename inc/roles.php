<?php
/**
 * Role groups for the "For Companies" intake. The design replaced the free-text
 * job title with a controlled selector: the HSG role groups (inc/situations-data.json — the same pools the
 * Situations Wanted results page shows) as suggestions. The form submits the KEY; the lead stores and emails the
 * LABEL. `search` is what the combobox matches on — the label, the results
 * heading and the titles people actually type ("Controller" finds Finance).
 * Mirrors design/src/data/role-groups.ts. Filter `hsg_role_groups` to change.
 */
defined( 'ABSPATH' ) || exit;

function hsg_role_groups(): array {
	$out = array();
	foreach ( hsg_sw_groups() as $key => $g ) { $out[ $key ] = array( 'label' => $g['label'], 'title' => $g['resultTitle'], 'aliases' => $g['aliases'] ); }
	return apply_filters( 'hsg_role_groups', $out );
}

/** A role outside the ten: the employer typed it; the text is stored as the lead's title. */
function hsg_custom_role(): array { return array( 'key' => 'custom', 'label' => 'Typed by the employer (not a preset)' ); }

/** Human label for a submitted key, or '' when the key is not one we offer. */
function hsg_role_label( string $key ): string {
	if ( 'custom' === $key ) { return hsg_custom_role()['label']; }
	$g = hsg_role_groups();
	return isset( $g[ $key ] ) ? (string) $g[ $key ]['label'] : '';
}

/** The combobox's search text for a group: label · results heading · aliases. */
function hsg_role_search( array $g ): string {
	return implode( ' · ', array_merge( array( $g['label'], $g['title'] ), $g['aliases'] ) );
}
