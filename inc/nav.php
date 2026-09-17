<?php
/**
 * Navigation. The design builds the nav around the two service lines with
 * in-page anchors; these arrays mirror it exactly. Filter them to change the
 * nav without touching the templates.
 */
defined( 'ABSPATH' ) || exit;

function hsg_nav_menus(): array {
	return apply_filters( 'hsg_nav_menus', array(
		array( 'id' => 'hiring',  'label' => 'Hiring',  'items' => array(
			array( 'href' => 'hiring',        'label' => 'Hiring Solutions' ),
			array( 'href' => 'collaborative', 'label' => 'Collaborative Search<sup>®</sup>' ),
			array( 'href' => 'story',         'label' => 'Success Stories' ),
			array( 'href' => '/situations-wanted/', 'label' => 'Situations Wanted' ),
		) ),
		array( 'id' => 'careers', 'label' => 'Careers', 'items' => array(
			array( 'href' => 'career',         'label' => 'Career Solutions' ),
			array( 'href' => '/job-search-2/', 'label' => 'Job Board' ),
			array( 'href' => '/submit-resume/', 'label' => 'Submit Resume' ),
		) ),
	) );
}
function hsg_nav_about(): array {
	return apply_filters( 'hsg_nav_about', array( 'id' => 'about', 'label' => 'About', 'items' => array(
		array( 'href' => 'michael', 'label' => 'Meet Michael' ),
		array( 'href' => '/faqs/',  'label' => 'FAQ' ),
		array( 'href' => 'close',   'label' => 'Contact' ),
	) ) );
}
function hsg_nav_insights(): array { return apply_filters( 'hsg_nav_insights', array( 'href' => '/articles/', 'label' => 'Articles' ) ); }

function hsg_footer_columns(): array {
	return apply_filters( 'hsg_footer_columns', array(
		'Hiring' => array( array('hiring','Hiring Solutions'), array('hiring','Executive Recruiting'), array('collaborative','Collaborative Search<sup>®</sup>'), array('hiring','Candidate Assessment'), array('vetting','Private Vetting'), array('forensic','Interviewing'), array('/situations-wanted/','Situations Wanted') ),
		'Career' => array( array('career','Career Solutions'), array('career','Career Assessment'), array('career','Executive Career Strategy'), array('career','Interview Preparation'), array('/job-search-2/','Job Board'), array('/submit-resume/','Submit Resume') ),
		'Company' => array( array('michael','About'), array('michael','Michael Schlager'), array('story','Success Stories'), array('/articles/','Articles'), array('/faqs/','FAQ'), array('close','Contact') ),
	) );
}
function hsg_area_served(): array {
	return apply_filters( 'hsg_area_served', array( 'Passaic County, NJ', 'Bergen County, NJ', 'Essex County, NJ', 'Hudson County, NJ', 'Morris County, NJ' ) );
}
