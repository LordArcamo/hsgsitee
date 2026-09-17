<?php


function avada_lang_setup() {
	$lang = get_stylesheet_directory() . '/languages';
	load_child_theme_textdomain( 'Avada', $lang );
}
add_action( 'after_setup_theme', 'avada_lang_setup' );

add_filter(
  "simple_history/db_purge_days_interval", 
  function( $days ) {
    $days = 183;
    return $days;
  }
);

function hsg_star_checkbox_script() {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function () {
        var groups = document.querySelectorAll(
            '#forminator-module-29957 .forminator-field-checkbox'
        );

        groups.forEach(function (group) {
            var labels = group.querySelectorAll('.forminator-checkbox');

            labels.forEach(function (label, index) {

                label.addEventListener('click', function (e) {
                    e.preventDefault();

                    labels.forEach(function (l) {
                        l.querySelector('input').checked = false;
                        l.classList.remove('star-active');
                    });

                    labels.forEach(function (l, i) {
                        if (i <= index) {
                            l.querySelector('input').checked = true;
                            l.classList.add('star-active');
                        }
                    });
                });

                label.addEventListener('mouseenter', function () {
                    labels.forEach(function (l, i) {
                        l.classList.toggle('star-hover', i <= index);
                    });
                });

                label.addEventListener('mouseleave', function () {
                    labels.forEach(function (l) {
                        l.classList.remove('star-hover');
                    });
                });
            });
        });
    });
    </script>
    <?php
}
// add_action('wp_footer', 'hsg_star_checkbox_script',5);
/**
 * ---------------------------------------------------------------------------
 * Avada 7.16 / Fusion Builder 3.15.6 script-handle compatibility shim.
 *
 * Avada 7.16 renamed its bundled Bootstrap libraries from `bootstrap-*` to
 * `awb-*`. Fusion Builder 3.15.6 still declares its element scripts as
 * depending on the OLD `bootstrap-*` handles. WordPress silently refuses to
 * output any script whose dependency is not registered, so fusion-toggles,
 * fusion-modal, fusion-tabs and fusion-tooltip never load -- leaving
 * accordions, modals, tabs and tooltips rendered but completely inert.
 *
 * This registers the old handles pointing at the files Avada 7.16 actually
 * ships, so the dependencies resolve and the element scripts load again.
 *
 * REMOVE THIS once Fusion Builder is updated to 3.16+, which depends on the
 * `awb-*` handles directly. Added 2026-08-25.
 * ---------------------------------------------------------------------------
 */
function hsg_avada716_bootstrap_handle_shim() {

	if ( ! class_exists( 'Fusion_Dynamic_JS' ) ) {
		return;
	}

	$lib_url  = get_template_directory_uri() . '/includes/lib/assets/min/js/library';
	$lib_path = get_template_directory() . '/includes/lib/assets/min/js/library';

	$aliases = array(
		'bootstrap-transition' => array( 'awb-transition',     array() ),
		'bootstrap-collapse'   => array( 'awb-panel-collapse', array( 'bootstrap-transition' ) ),
		'bootstrap-modal'      => array( 'awb-modal',          array( 'bootstrap-transition' ) ),
		'bootstrap-tab'        => array( 'awb-tab',            array( 'bootstrap-transition' ) ),
		'bootstrap-tooltip'    => array( 'awb-tooltip',        array( 'bootstrap-transition' ) ),
		'bootstrap-popover'    => array( 'awb-popover',        array( 'bootstrap-tooltip' ) ),
	);

	foreach ( $aliases as $old_handle => $data ) {

		list( $file, $deps ) = $data;

		if ( ! file_exists( $lib_path . '/' . $file . '.js' ) ) {
			continue;
		}

		Fusion_Dynamic_JS::register_script(
			$old_handle,
			$lib_url . '/' . $file . '.js',
			$lib_path . '/' . $file . '.js',
			$deps,
			'1',
			true
		);
	}
}
add_action( 'wp', 'hsg_avada716_bootstrap_handle_shim', 20 );

/**
 * ---------------------------------------------------------------------------
 * Directory listing pages have no <h1> and never show the business name.
 *
 * The Directories plugin renders its detail view without a title heading,
 * Avada's page title bar is disabled site-wide and overridden by Layout
 * Builder on these pages, so nothing supplies one. Semrush flags all 33
 * listing URLs for "missing h1", and visitors never see the business name.
 *
 * Hook choice matters: `the_content` fires six times on these pages and
 * `avada_before_main_content` never fires. `avada_before_main_container`
 * fires exactly once, immediately before the content. Added 2026-09-04.
 * ---------------------------------------------------------------------------
 */
function hsg_directory_listing_h1() {

	if ( is_tax( array( 'employment_dir_cat', 'employment_loc_loc', 'employment_dir_tag' ) ) ) {
		$term = get_queried_object();
		if ( $term && ! empty( $term->name ) ) {
			echo '<div class="hsg-listing-title-wrap"><h1 class="hsg-listing-title">'
				. esc_html( $term->name ) . '</h1></div>';
		}
		return;
	}

	if ( ! is_singular( 'employment_dir_ltg' ) ) {
		return;
	}

	$title = trim( (string) get_the_title() );
	if ( '' === $title ) {
		return;
	}

	echo '<div class="hsg-listing-title-wrap"><h1 class="hsg-listing-title">'
		. esc_html( $title ) . '</h1></div>';
}
add_action( 'avada_before_main_container', 'hsg_directory_listing_h1' );

/**
 * Styling for the injected listing heading.
 */
function hsg_directory_listing_h1_css() {

	if ( ! is_singular( 'employment_dir_ltg' )
		&& ! is_tax( array( 'employment_dir_cat', 'employment_loc_loc', 'employment_dir_tag' ) ) ) {
		return;
	}

	echo '<style id="hsg-listing-title-css">'
		. '.hsg-listing-title-wrap{max-width:none;margin:0;padding:28px 30px 6px;}'
		. '.hsg-listing-title{font-size:34px;line-height:1.2;margin:0;}'
		. '@media(max-width:768px){.hsg-listing-title{font-size:26px;}}'
		. '</style>';
}
add_action( 'wp_head', 'hsg_directory_listing_h1_css' );
