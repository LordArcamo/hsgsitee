#!/bin/sh
# Builds the theme's shipped assets from source. Run after editing anything in
# assets/css/partials/ or src/. Requires the design repo's node_modules for esbuild.
set -e
T="$(cd "$(dirname "$0")/.." && pwd)"
ESBUILD="$T/../../design/node_modules/.bin/esbuild"
# CSS: fonts first, then the partials in the SAME order as the design's global.css
{ cat "$T/assets/css/fonts.css"; for f in tokens logo header sections footer widgets imagery blog jobs situations wp; do echo; echo "/* ===== $f ===== */"; cat "$T/assets/css/partials/$f.css"; done; } > "$T/assets/css/hsg.css"
# JS: one deferred bundle, no modules, ES2019 so it runs everywhere the design targets
"$ESBUILD" "$T/src/main.ts" --bundle --minify --target=es2019 --format=iife --outfile="$T/assets/js/main.js" --log-level=warning
printf "hsg.css %s KB · main.js %s KB\n" "$(du -k "$T/assets/css/hsg.css" | cut -f1)" "$(du -k "$T/assets/js/main.js" | cut -f1)"
