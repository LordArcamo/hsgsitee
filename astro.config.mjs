// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import { SITE } from "./src/data/site";

// https://astro.build/config
export default defineConfig({
  // Drives canonical URLs, Open Graph tags and the generated sitemap.
  // TODO: confirm the production domain before launch (see src/data/site.ts).
  site: SITE.url,
  integrations: [sitemap()],

  // The mockup relies on whitespace between inline elements to separate words
  // (e.g. body copy followed by a <span>). Astro's HTML compressor strips it,
  // running those words together — so leave the markup as authored.
  compressHTML: false,

  server: {
    // Honour PORT when the dev server is launched by tooling that assigns one.
    port: Number(process.env.PORT) || 4321,
  },
});
