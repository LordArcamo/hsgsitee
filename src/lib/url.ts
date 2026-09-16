/**
 * Build an internal URL that survives being served under a base path.
 *
 * Production (Vercel) serves the site from the domain root, so `base` is "/"
 * and this is a no-op. The GitHub Pages preview serves it from
 * /hsgsitee/, where every absolute "/…" link would otherwise escape the
 * deployment and 404 against lordarcamo.github.io itself.
 *
 * Use it for every internal href, asset path and canonical path. Fragments
 * on the current page ("#main") do not need it.
 */
const BASE = import.meta.env.BASE_URL;

export function url(path: string): string {
  // BASE is "/" at the root and "/hsgsitee" or "/hsgsitee/" under Pages,
  // depending on how `base` was written — normalise before joining.
  const base = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
  const rest = path.startsWith("/") ? path : `/${path}`;
  return `${base}${rest}`;
}
