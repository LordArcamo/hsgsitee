<?php /* $args: skip_first (bool) — the lead has already been shown */ $i = 0; $skip = ! empty( $args['skip_first'] ); ?>
<div class="jrnl-grid">
<?php while ( have_posts() ) : the_post(); if ( $skip ) { $skip = false; continue; } get_template_part( 'template-parts/blog/entry', null, array( 'index' => $i++ ) ); endwhile; ?>
</div>
<?php $pg = paginate_links( array( 'type' => 'array', 'prev_text' => '← Newer', 'next_text' => 'Older →', 'mid_size' => 1 ) ); if ( $pg ) : ?>
<nav class="jrnl-pager" aria-label="Pages"><?php echo implode( '', $pg ); ?></nav>
<?php endif; ?>
