# Hiring Solutions Group

Astro port of the HSG homepage design mockup. The design is a faithful 1:1
reproduction of the approved mockup — treat the visual design as fixed and
change it only deliberately.

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the production build
npx astro check  # typecheck .astro and .ts
npm run standalone  # one self-contained .html per page, in standalone/
```

`npm run build` output in `dist/` links its CSS, JS and images with absolute
`/_astro/…` paths and loads the scripts as ES modules, so **opening
`dist/…/index.html` from the file system gives you unstyled markup** — it has
to be served (`npm run preview`). To send someone a page, or open one without a
server, run `npm run standalone` after a build: `tools/make-standalone.mjs`
inlines the stylesheet, the module scripts (resolving the chunks' relative
imports into `data:` URLs), the woff2 subsets and every image, and writes
`standalone/<name>-standalone.html`. The `.woff` fallbacks are deliberately
left out — every browser that matters takes the inlined woff2.

Output goes to `standalone/`, not `dist/`: **Astro wipes `dist/` on every
build**, so anything hand-placed there is destroyed by the next `npm run
build`.

## Layout

```
src/
  data/            content and configuration — edit these, not the markup
    site.ts        name, address, phone, email, canonical URL, area served
    facts.ts       the headline statistics (30 years, 1,200+ placements, …)
    jobs.ts        opportunities board — DESIGN EXAMPLES, replace before launch
    candidates.ts  shortlist demonstration — all profiles fictional
    role-groups.ts the ten role groups and their fictional candidate pools
    situations.ts  Situations Wanted — the search criteria and stat columns
  layouts/
    BaseLayout.astro   <head>, meta, Open Graph, JSON-LD, global CSS, reveals
  components/
    Header.astro  AudienceBar.astro  Footer.astro  MockNote.astro
    sections/     one component per homepage section, in page order
    situations/   the Situations Wanted page, in page order
  scripts/         client behaviour, one module per widget
  styles/          global.css imports the partials IN ORDER — keep that order
pages/
  index.astro              composes the homepage from the section components
  situations-wanted/
    [role].astro           employer-side results page, one per role group
    index.astro            role index; forwards ?role= to the right page
```

### Where things live

| To change… | Edit |
| --- | --- |
| A statistic shown on the page | `src/data/facts.ts` |
| Address, phone, email, domain | `src/data/site.ts` |
| The rotating job listings | `src/data/jobs.ts` |
| The shortlist demo profiles | `src/data/candidates.ts` |
| The Situations Wanted candidate profiles | `src/data/role-groups.ts` |
| The role selector's options and search aliases | `src/data/role-groups.ts` |
| Situations Wanted criteria wording and stat columns | `src/data/situations.ts` |
| Copy or markup of a section | the matching `src/components/sections/*.astro` |
| Visual design | `src/styles/*.css` |

## Notes for maintainers

**Styles are global, not scoped.** The opportunities board and the shortlist
demonstration build markup at runtime with `innerHTML`; Astro's scoped styles
would not apply to nodes created after render. `src/styles/global.css` imports
the partials in the same order they appeared in the original single-file
mockup — several rules share specificity and depend on that order.

**`compressHTML` is off** (`astro.config.mjs`). The mockup relies on whitespace
between inline elements to separate words; Astro's HTML compressor strips it and
runs those words together.

**The mockup rendered in quirks mode.** The original file had no `<!DOCTYPE>`,
so browsers rendered it in `BackCompat` mode. This port emits a proper doctype
and renders in standards mode, which is correct — but it means wrapped text in
narrow columns sits ~3px per line taller than the original mockup did. Verified:
the original *with* a doctype added matches this port exactly.

**The nav is four items and two menus.** The mockup had eight flat links and
two buttons in the header, which need ~1450px inside a 1260px wrap and never
fit at any screen size — the wordmark broke onto four lines and "Find a Job"
onto three. The nav is now built around the site's two audiences:

| Top level | Opens to |
| --- | --- |
| Hiring ▾ | Hiring Solutions · Collaborative Search® · Success Stories |
| Careers ▾ | Career Solutions · Current Jobs |
| Insights | — |
| About ▾ | Meet Michael · Contact |

plus a `tel:` phone CTA and Find Talent. The groups live in one array at the
top of `src/components/Header.astro`; the mobile menu renders the same array
flat, with a heading per group. "Industries" is deliberately left out until
it has a page — a link to `#` scrolls to the top and reads as broken.

**The menus are called Hiring and Careers, not "For Companies" and "For
Professionals", on purpose.** The audience jump bar directly beneath the
header owns those two phrases. An earlier draft used them for the nav menus
too, and the two rows — same words, same chevrons, stacked — read as one
repeated, broken menu. Hiring and Careers are the footer's own column
headings, so the wording is consistent site-wide without echoing the bar.

**Mobile menu.** The drawer hangs off the sticky header (`position: absolute;
top: 100%`) instead of sitting in the page flow, so opening it no longer makes
the header 800px tall and shoves the hero down; it scrolls on its own past
`100dvh` and `header.ts` locks page scroll behind it. Two mockup bugs were
fixed along the way: the burger's "open" rule set the same box-shadow as
closed, so it never became an ✕ (the bars are now pseudo-elements that fold
into one); and `.mobile-nav a` matched the `<a class="btn">` CTAs as well as
the list links, stripping their padding and centring — it is now scoped to
`.mobile-nav ul a`. The drawer's actions are Find Talent and a tap-to-call
link; "Find a Job" is the Current Jobs row just above them.

Menu behaviour is in `src/scripts/nav-menus.ts`: hover-open with a short
close delay on pointer devices, click and Enter/Space toggle everywhere,
ArrowDown enters the menu, Escape returns focus to the trigger, and focus or
a click landing outside closes it. One menu is open at a time.

Nothing in the header may flex-shrink — an item allowed to shrink below its
content silently overflows, which is how an earlier version ended up with the
nav sitting on top of the buttons. Everything is `flex: none`, so a bad fit
shows as overflow rather than overlap. Breakpoints: full nav from 960px; the
phone CTA needs ~165px more and shows from 1100px, dropping into the burger
menu below that, where a tap-to-call link is more useful anyway. Verified
390px–1440px with the last top-level item's edge measured against the CTA,
not the nav box edge, which stays plausible even while its contents overflow.

The `<button>` triggers need `line-height: inherit` — the UA default of
`normal` sits them 4px off the plain links beside them.

**The palette is pinned to light.** `src/layouts/BaseLayout.astro` sets
`data-theme="light"` on `<html>`, so the site is the white ground on every
machine. Delete that attribute to follow the visitor's system preference
instead — the dark palette is complete and still maintained in `tokens.css`,
and the logo swaps with it.

Note that `--panel` surfaces (the footer, the Private Vetting block, the final
CTA) stay near-black in *both* palettes by design. Artwork placed on one must
not follow the page theme, which is what `<Logo onPanel />` is for: it renders
only the light-on-dark file. Without it the slate wordmark lands on a
near-black panel and disappears.

**Brand assets are the real ones**, taken from the live site at
hiringsolutionsgroup.com and kept in `src/assets/brand/`:

| File | Use |
| --- | --- |
| `hsg-logo.png` | mark + wordmark — the header, 44px tall |
| `hsg-logo-full.png` | adds the rule and slogan — the footer, 72px tall |
| `hsg-logo-*-dark.png` | same artwork with the slate wordmark lifted to near-white |
| `hsg-mark.png` | the squirrel roundel on its own; source of the favicons |
| `michael-schlager-portrait.webp` | the About portrait (886×1024, fits the 4/5 frame) |
| `michael-schlager-headshot.webp` | square headshot, 478px — unused, kept for a future avatar slot |

Two logo files rather than a CSS filter: the wordmark is slate grey and
vanishes on the dark panel, while the squirrel and ring have to keep their
brand purple and green — a filter cannot do one without the other.
`src/components/Logo.astro` renders both and `src/styles/logo.css` swaps them
on the same three-state rule the colour tokens use. Every variant rule there is
written as `.logo-img img.logo-img--x`: a bare `.logo-img--dark` loses on
specificity to the `.logo-img img` base rule, and both logos render at once.

The real lockup is ~185px wide at 44px tall against 269px for the placeholder
wordmark it replaced, which is what buys the nav back its designed 14.5px.

`public/og-image.png` is generated from the full dark lockup on the brand ink
background — regenerate it if the logo changes.

**Inter is self-hosted** via `@fontsource/inter`, imported in `BaseLayout.astro`
at the weights the design uses (400/600/700/800/900). The design's font stack
names Inter first but the mockup never loaded it, so it silently fell back on
machines without Inter installed. Add an import if you introduce a new weight.

**Situations Wanted is one page per role group.** The "For Companies" intake
in the audience bar no longer takes a free-text job title: it offers a
controlled list of ten HSG role groups plus Custom Search, defined in
`src/data/role-groups.ts`. The group that was chosen becomes the URL segment —
`/situations-wanted/operations/` — and every group is prerendered with its own
six candidates. Nothing on a role page can show another profession's people,
because no other profession's data is on it. A role outside the ten never
reaches a results page at all: Custom Search ends inside the form, on a state
that asks HSG to build the search instead.

That is a deliberate departure from the spec's suggested
`/situations-wanted?role=operations`. On a static build, one page plus a query
string has to ship one group's candidates and swap them in the browser, so a
phone on a slow connection sees six of the wrong people first. The spec's URL
still works — `/situations-wanted/` forwards `?role=` to the matching page
before the browser paints.

The rest of the search — location, experience band, new/replacement, career
path and salary range — does travel as a query string, and
`src/scripts/situations.ts` writes it onto the criteria line. Because each page
is a static file it ships carrying the spec's worked example, so on a real
search the criteria line is held invisible by `[data-sw-pending]` until the
real answers are in place. Four of those five answers are controlled
vocabularies round-tripped as short tokens (`experience=15-20`); only location
and salary are typed freely.

**The six are ranked, and the ranking is applied in one place.** The role is a
hard requirement, and it is settled before ranking runs — the page holds one
profession's people, so nothing can reach across professions. Within them,
`rankCandidates` in `src/data/situations.ts` orders by how closely each person
fits the submitted experience band and salary range: experience is the strong
factor, salary secondary, put on one scale by `SALARY_PER_YEAR`. Nobody is
shown a score — no percentage, no badge. With "Flexible / Not Sure" experience
and a salary of "DOE" there is nothing to rank on, so the six keep the order
they are written in.

Location, new/replacement and career path are deliberately NOT ranked on. The
candidate records have no location, opening type or career-path field, so
ranking on them would be theatre; they confirm the employer's search and
nothing more until real data gives them something to match.

The criteria line repeats the employer's own answer rather than interpreting
it — "Career Path: No" means they answered no, which is not the same claim as
"No Career Path".

**One array, three renderings.** `[role].astro` builds `matchedCandidates` and
hands that same array to the cards, the quick comparison and the full table.
Each rendering is marked `data-sw-order` and each of its rows carries
`data-sw-id`, so when the browser ranks the six it re-orders all three from one
id list — they cannot end up holding different people, or the same people in a
different order. The cards also carry `data-sw-exp` and `data-sw-salary`, which
is how ranking happens in the browser without the whole dataset being shipped
to it.

All sixty profiles are fictional. The pages are `noindex`ed and excluded from
the sitemap (`NOINDEX_PREFIXES` in `astro.config.mjs`) until real, consented
candidate data replaces them — and note that prerendering puts every candidate
in a public file, so a real feed needs SSR or an endpoint behind auth, not
this.

**Header and Footer anchors take a `home` prop.** Empty on the homepage, where
the links are same-page jumps; `"/"` on any other page, so they travel home
first. A new page that uses either component must pass it.

## Before launch

- [ ] Confirm the production domain in `src/data/site.ts` (`url`) — it drives
      canonical tags, Open Graph, JSON-LD and the sitemap. Update the `Sitemap:`
      line in `public/robots.txt` to match.
- [ ] Replace `src/data/jobs.ts` with the real HSG job feed. Per the copy doc
      these placeholders must **not** ship as live openings.
- [ ] Verify every figure in `src/data/facts.ts`.
- [ ] Replace the remaining image placeholders — the hero image and the featured
      article thumbnail — and the example social-proof block. The Michael
      Schlager portrait and the logo are now the real assets.
- [ ] Remove the mockup banner: delete `src/components/MockNote.astro`,
      `src/styles/mock-note.css`, its `@import` in `global.css`, and its usage
      in `src/pages/index.astro`.
- [ ] Resolve the two phone numbers — the footer uses 973-773-4473 while the
      Private Vetting section uses 347-665-7733, as specified in the copy doc.
- [ ] Confirm the Representation wording (still flagged "pending review").
- [ ] Replace `src/data/situations.ts` with a real, consented candidate feed,
      then drop the page's `noindex` and its `NOINDEX_PATHS` entry.
- [ ] Confirm the criteria wording in `situations.ts` that the copy doc does
      not specify: "Replacement Position", "No Career Path" and "Career Path
      Undecided", plus the "See Matching Professionals" submit button.
