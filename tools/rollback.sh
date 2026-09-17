#!/bin/sh
# Restore the old Avada child theme on production. Usage: ./tools/rollback.sh [backup-stamp]
set -e
H=siteground-hsg; R="www/hiringsolutionsgroup.com/public_html"
ssh $H "cd ~/$R && wp theme activate Avada-Child-Theme/Avada-Child-Theme && wp option update page_for_posts 0 && rm -rf wp-content/cache/min/* wp-content/cache/wp-rocket/hiringsolutionsgroup.com/* wp-content/cache/used-css/* 2>/dev/null; wp cache flush"
[ -n "$1" ] && echo "DB backup for a full restore: ~/site-backups/live-$1/db.sql (wp db import)"
echo "rolled back to Avada-Child-Theme; the hsg theme folder is left in place"
