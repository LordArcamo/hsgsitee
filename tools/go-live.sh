#!/bin/sh
# PRODUCTION SWITCH for hiringsolutionsgroup.com. Run ONLY on explicit instruction.
# Everything up to "activate" is reversible; rollback.sh restores the old theme.
# Usage: ./tools/go-live.sh   (from the theme dir; needs the siteground-hsg SSH alias)
set -e
T="$(cd "$(dirname "$0")/.." && pwd)"
H=siteground-hsg; R="www/hiringsolutionsgroup.com/public_html"; STAMP=$(date +%Y%m%d-%H%M)
echo "1/7 backup (DB + old child theme + wp-config) -> ~/site-backups/live-$STAMP/"
ssh $H "mkdir -p ~/site-backups/live-$STAMP && cd ~/$R && wp db export ~/site-backups/live-$STAMP/db.sql --quiet && tar czf ~/site-backups/live-$STAMP/Avada-Child-Theme.tgz -C wp-content/themes Avada-Child-Theme && cp wp-config.php ~/site-backups/live-$STAMP/ && ls -la ~/site-backups/live-$STAMP"
echo "2/7 upload theme"
rsync -az --exclude .DS_Store --exclude node_modules "$T/" $H:$R/wp-content/themes/hsg/
echo "3/7 pages: Situations Wanted (create if missing) + templates"
ssh $H "cd ~/$R && ID=\$(wp post list --post_type=page --name=situations-wanted --field=ID | head -1); [ -z \"\$ID\" ] && ID=\$(wp post create --post_type=page --post_title='Situations Wanted' --post_name=situations-wanted --post_status=publish --porcelain); wp post meta update \$ID _wp_page_template page-situations.php; wp post meta update 5639 _wp_page_template page-jobs.php; wp option update page_for_posts 32; echo situations page \$ID"
echo "4/7 activate theme (the switch)"
ssh $H "cd ~/$R && wp theme activate hsg && wp option update show_on_front page && wp option update page_on_front 20772"
echo "5/7 clear caches"
ssh $H "cd ~/$R && rm -rf wp-content/cache/min/* wp-content/cache/wp-rocket/hiringsolutionsgroup.com/* wp-content/cache/used-css/* 2>/dev/null; wp cache flush; wp rewrite flush"
echo "6/7 verify (server-side fetch; the WAF blocks outside curl)"
ssh $H "cd ~/$R && for p in / /articles/ /job-search-2/ '/situations-wanted/?role=finance' /about-us/; do printf '%-40s ' \"\$p\"; curl -s -o /tmp/p.html -w '%{http_code} ' \"https://hiringsolutionsgroup.com\$p\"; grep -c 'class=\"hdr\"' /tmp/p.html | tr -d '\n'; echo ' hdr'; done"
echo "7/7 done. Rollback: ./tools/rollback.sh $STAMP"
