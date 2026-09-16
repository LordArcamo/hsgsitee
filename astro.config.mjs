// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import { SITE } from "./src/data/site";

/** Paths rendered with `noindex` in BaseLayout — kept out of the sitemap. */
const NOINDEX_PATHS = ["/situations-wanted/"];

// https://astro.build/config
export default defineConfig({
  // Drives canonical URLs, Open Graph tags and the generated sitemap.
  // TODO: confirm the production domain before launch (see src/data/site.ts).
  /*
   * Production (Vercel) serves from the domain root with the real domain.
   * The GitHub Pages preview sets PAGES_SITE/PAGES_BASE in the workflow so
   * it can serve the same build from lordarcamo.github.io/hsgsitee/ without
   * changing anything the production build sees.
   */
  site: process.env.PAGES_SITE ?? SITE.url,
  base: process.env.PAGES_BASE,

  integrations: [
    sitemap({
      // Pages that carry demonstration data are noindexed in BaseLayout;
      // keep them out of the sitemap too, so the two never disagree.
      filter: (page) => !NOINDEX_PATHS.some((p) => page.endsWith(p)),
    }),
  ],

  // The mockup relies on whitespace between inline elements to separate words
  // (e.g. body copy followed by a <span>). Astro's HTML compressor strips it,
  // running those words together — so leave the markup as authored.
  compressHTML: false,

  server: {
    // Honour PORT when the dev server is launched by tooling that assigns one.
    port: Number(process.env.PORT) || 4321,
  },
});
