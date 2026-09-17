/**
 * Bundle a built page into ONE self-contained .html file.
 *
 *   node tools/make-standalone.mjs <route> <output-name>
 *   node tools/make-standalone.mjs situations-wanted/operations hsg-situations-wanted
 *
 * The normal build links its CSS, JS and images with absolute "/_astro/…"
 * paths and loads the scripts as ES modules — neither of which resolves over
 * file://, so double-clicking dist/<route>/index.html gives you unstyled
 * markup. This inlines everything so the file works when opened directly,
 * emailed, or dropped on a machine with no server.
 *
 * Output goes to standalone/, NOT dist/ — Astro wipes dist/ on every build.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const outDir = path.join(root, "standalone");

const MIME = {
  ".woff2": "font/woff2",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

/** Resolve a site-absolute URL ("/_astro/x.webp") to a file in dist/. */
const distFile = (url) => path.join(dist, url.replace(/^\//, "").split("?")[0]);

async function dataUri(url) {
  const file = distFile(url);
  if (!existsSync(file)) return null;
  const ext = path.extname(file).toLowerCase();
  const mime = MIME[ext];
  if (!mime) return null;
  const buf = await readFile(file);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

/*
 * The JS chunks import each other by relative path ("./prefers-reduced-motion
 * .js"). An inline module has no base URL to resolve those against, so each
 * import target is itself inlined as a data: URL — recursively, depth-first.
 */
const moduleCache = new Map();
async function inlineModule(url) {
  if (moduleCache.has(url)) return moduleCache.get(url);
  const file = distFile(url);
  if (!existsSync(file)) return null;

  let code = await readFile(file, "utf8");
  const specifiers = [...code.matchAll(/(from|import)\s*"(\.\/[^"]+)"/g)];
  for (const [, , spec] of specifiers) {
    const target = path.posix.join(path.posix.dirname(url), spec.slice(2));
    const inlined = await inlineModule(target);
    if (!inlined) continue;
    code = code.replaceAll(
      `"${spec}"`,
      `"data:text/javascript;base64,${Buffer.from(inlined, "utf8").toString("base64")}"`,
    );
  }
  moduleCache.set(url, code);
  return code;
}

async function build(route, outName) {
  const pageFile =
    route === "index"
      ? path.join(dist, "index.html")
      : path.join(dist, route, "index.html");
  if (!existsSync(pageFile)) {
    throw new Error(`No build at ${pageFile} — run "npm run build" first.`);
  }

  let html = await readFile(pageFile, "utf8");
  const missing = new Set();

  /* ---------- stylesheets ---------- */
  for (const [tag, href] of [
    ...html.matchAll(/<link\s+rel="stylesheet"[^>]*href="(\/_astro\/[^"]+)"[^>]*>/g),
  ].map((m) => [m[0], m[1]])) {
    const cssFile = distFile(href);
    if (!existsSync(cssFile)) {
      missing.add(href);
      continue;
    }
    let css = await readFile(cssFile, "utf8");

    /* fonts and images referenced from inside the CSS */
    const urls = [...css.matchAll(/url\((\/_astro\/[^)"']+)\)/g)].map((m) => m[1]);
    for (const u of new Set(urls)) {
      // woff is only a fallback for browsers that lack woff2; inlining both
      // would roughly double the file for no one's benefit.
      if (u.endsWith(".woff")) continue;
      const uri = await dataUri(u);
      if (uri) css = css.replaceAll(`url(${u})`, `url(${uri})`);
      else missing.add(u);
    }
    html = html.replace(tag, `<style>\n${css}\n</style>`);
  }

  /* ---------- module scripts ---------- */
  for (const [tag, src] of [
    ...html.matchAll(/<script\s+type="module"\s+src="(\/_astro\/[^"]+)"><\/script>/g),
  ].map((m) => [m[0], m[1]])) {
    const code = await inlineModule(src);
    if (!code) {
      missing.add(src);
      continue;
    }
    html = html.replace(tag, `<script type="module">\n${code}\n</script>`);
  }

  /* ---------- images: src, srcset, and the favicons ---------- */
  const assets = new Set(
    [...html.matchAll(/(?:\/_astro\/|\/favicon-)[A-Za-z0-9._-]+\.(?:webp|png|jpg|svg)/g)].map(
      (m) => m[0],
    ),
  );
  for (const a of assets) {
    const uri = await dataUri(a);
    if (uri) html = html.replaceAll(a, uri);
    else missing.add(a);
  }

  await mkdir(outDir, { recursive: true });
  const out = path.join(outDir, `${outName}-standalone.html`);
  await writeFile(out, html, "utf8");

  const leftover = [...html.matchAll(/["'(](\/_astro\/[^"')]+)/g)].map((m) => m[1]);
  return { out, bytes: Buffer.byteLength(html), missing: [...missing], leftover };
}

const [route, outName] = process.argv.slice(2);
if (!route || !outName) {
  console.error("usage: node tools/make-standalone.mjs <route> <output-name>");
  process.exit(1);
}
const r = await build(route, outName);
console.log(`wrote ${r.out}`);
console.log(`size  ${(r.bytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`skipped (woff fallbacks / not found): ${r.missing.length}`);
console.log(`UNRESOLVED /_astro refs left in output: ${r.leftover.length}`);
if (r.leftover.length) console.log(r.leftover.slice(0, 10));
