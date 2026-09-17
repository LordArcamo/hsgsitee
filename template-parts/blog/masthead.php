<?php
/* $args: title (plain text), kicker, dek, show_filters (bool) */
$cats = ! empty( $args['show_filters'] ) ? hsg_blog_categories( 8 ) : array();
$title = (string) ( $args['title'] ?? 'Insights' );
$long = mb_strlen( wp_strip_all_tags( $title ) ) > 14 ? ' jrnl-mast__title--long' : '';
?>
<header class="jrnl-mast">
	<div class="wrap jrnl-mast__in<?php echo $cats ? '' : ' jrnl-mast__in--solo'; ?>">
		<div class="jrnl-mast__lead">
			<p class="jrnl-mast__kicker rv"><?php echo esc_html( $args['kicker'] ?? 'HSG Insights' ); ?></p>
			<h1 class="jrnl-mast__title<?php echo $long; ?> rv" style="--d:1"><?php echo esc_html( $title ); ?></h1>
			<p class="jrnl-mast__dek rv" style="--d:2"><?php echo esc_html( $args['dek'] ?? 'Better decisions start with better questions. Notes on executive recruiting, interviewing and career strategy from thirty years at the table.' ); ?></p>
		</div>
		<?php if ( $cats ) : ?>
		<div class="jrnl-mast__side rv" style="--d:3">
			<p class="jrnl-mast__label">Browse by topic</p>
			<nav class="jrnl-filters" aria-label="Topics">
				<a class="jrnl-filter<?php echo is_home() ? ' is-on' : ''; ?>" href="<?php echo esc_url( home_url( '/articles/' ) ); ?>">All</a>
				<?php foreach ( $cats as $c ) : ?><a class="jrnl-filter<?php echo is_category( $c->term_id ) ? ' is-on' : ''; ?>" href="<?php echo esc_url( get_category_link( $c ) ); ?>" data-lane="<?php echo esc_attr( hsg_category_lane( $c ) ); ?>"><?php echo esc_html( $c->name ); ?><sup><?php echo (int) $c->count; ?></sup></a><?php endforeach; ?>
			</nav>
		</div>
		<?php endif; ?>
	</div>
</header>
