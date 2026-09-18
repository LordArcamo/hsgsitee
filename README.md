# Hiring Solutions Group — theme

Avada **child** theme. Avada renders every page; this theme owns four page families outright — the homepage, the Insights journal (index, archives, search, single articles) and the Job Board page — with its own header/footer, CSS and JS, and no page builder.

## Run it locally
```
cd ~/WordPress\ HSG/rebuild/wp && php -S localhost:8080 router.php     # site
./wp.sh <command>                                                        # WP-CLI
```
Admin at /wp-admin/ — credentials in `rebuild/LOCAL-ADMIN-LOGIN.txt`.

## Build
Edit `assets/css/partials/*.css` or `src/**/*.ts`, then:
```
tools/build.sh
```
`assets/css/hsg.css` and `assets/js/main.js` are build outputs — never edit them directly. After deploying to a WP Rocket site, clear `wp-content/cache/min/*`, `cache/wp-rocket/<host>/*` and `cache/used-css/*`.

## Where things live
| Need to… | File |
|---|---|
| Change homepage copy | wp-admin → Home page → the tab for that section. Defaults: `inc/fields.php` |
| Add an editable string | `inc/fields.php` (registry). Read it with `hsg_field('name')` |
| Add / reorder a homepage section | `template-parts/home/NN-name.php` (natural order) |
| Change the nav or footer links | `inc/nav.php` (filterable arrays) |
| Change which pages the new chrome renders | `hsg_uses_new_chrome()` in `inc/blog.php` |
| Style the journal | `assets/css/partials/blog.css` |
| Style the job board widget | `assets/css/partials/jobs.css` (scoped `.jobs-board`) |
| Job feed | `inc/jobs.php` — Top Echelon API, 15-min transient |
| Keep Avada off the new pages | `inc/avada.php`, `inc/homepage-isolation.php` |
| Old child-theme behaviour on Avada pages | `inc/avada-legacy.php`, `assets/css/avada-pages.css` |

## Conventions
- ACF for content, hooks for behaviour, one concern per file under `inc/`, everything prefixed `hsg_`.
- Escape on output. No jQuery on the new pages. No inline styles beyond the design's `--d` reveal delays.
- The design repo (`rebuild/design/`) is the reference; its CSS partials are copied verbatim, ours are `blog.css` and `jobs.css`.

## Situations Wanted
`/situations-wanted/?role=<group>&location=…&experience=…&position=…&career_path=…&salary=…` — template `page-situations.php`, logic `inc/situations.php`, data `inc/situations-data.json` (11 groups × 6 FICTIONAL profiles; the same file feeds the role selector via `hsg_role_groups()`). The For Companies form stores the lead, then redirects here with the answers; a typed (custom) role stays on the recap. Ranking (experience band strong, salary secondary) and the criteria line are server-side, so "Print this shortlist" prints what is on screen (print rules at the end of `partials/situations.css`). Page is noindexed until real, consented data replaces the JSON (filter `hsg_sw_groups`).

## FAQ page
`/faqs/` (staging page 9749, local 28) uses `page-faq.php`: it parses the page's own Avada content (`fusion_toggle` accordions under `fusion_title`/h2 headings) via `inc/faq.php`, renders them as `<details>` in the new chrome and prints FAQPage JSON-LD (39 Q&As). Questions render as `<h3>` inside `<summary>`; the H1 is SEOPress's title when set; JSON-LD is a graph (Organization, WebSite, BreadcrumbList, FAQPage with dateModified). `/llms.txt` is served by `inc/faq.php` (rewrite rule; flush permalinks after deploy). Edit the FAQ where it always lived. The Business Solutions and Coaching Solutions groups are hidden (filter `hsg_faq_hidden_groups`) because that content belongs to bsg-edge.com.

## Client review of 17 Sep 2026
Applied 18 Sep: Careers gold → `--career` (nav + hero word); hero "30 years" pill removed; proof-bar counters animate (`src/scripts/counters.ts`); "Both sides" eyebrow removed and both cards got photos (`two_hire_image`/`two_career_image`); shortlist demo replaced by a static six-stage layout (`70-shortlist.php`, `.slx-*`); duplicate stats section disabled (`template-parts/home/_off/`); journal intro line (`ins_intro`); success story rewritten with a "How HSG helped" list and a working CTA (/success-stories/); Submit Resume → /submit-resume/; Find Talent → /situations-wanted/ (Michael asked for the job board; switched 18 Sep on the developer's call because that page is where companies find talent — revert by changing the two header links and `hero_cta1_link`); `#` CTAs mapped (/find-talent/, /contact/, /about-us/); `plan_cite_image` slot for the Rabbi Dr. Maynard Schlager portrait; FAQ page with schema + nav/footer links; topic filters skip categories that 301 to old pages and need ≥3 posts; article body drops the featured image when the post repeats it (`the_content` at 12). Hero photo + card photos are CC BY 2.0 from Wikimedia Commons — the credit is the attachment caption and prints as a small overlay; keep it.

## Deploy
Rehearsed on staging38. Production switch only on explicit instruction — `tools/go-live.sh` does it end to end (backup → upload → pages → activate → caches → verify), `tools/rollback.sh` undoes it. Manual sequence: backup → upload theme → activate → `page_for_posts` = the Articles page, job page template = `page-jobs.php` → clear Rocket caches → verify. Rollback: `wp theme activate Avada-Child-Theme/Avada-Child-Theme`.

Full documentation: `HSG-Rebuild-Documentation.pdf`.

## Leads
The audience-bar forms post to `POST /wp-json/hsg/v1/lead` (nonce + honeypot + rate limit). Leads are stored as private `hsg_lead` posts (wp-admin → Leads) and emailed to Home → Site → "Where new leads are emailed" (fallback: admin email). Logic in `inc/leads.php`; front end in `src/scripts/audience-menu.ts`. Hook `hsg_lead_stored` for CRM/Slack later.

The For Companies form uses a controlled role selector (design update 2026-09-18): ten HSG role groups plus Custom Search, defined in `inc/roles.php` (filter `hsg_role_groups`). Picking a group submits its key; typing anything else submits `role=custom` with the text as `title` — the design's separate "Custom Search" option and second field were dropped as confusing (user call, 2026-09-18). The server accepts only known keys or `custom`, and stores/emails the label (`lead_role`, `lead_role_key`, `lead_title`). The design's Situations Wanted results pages (fictional candidates) were deliberately not ported. `src/scripts/role-combobox.ts` is a fork of the design's for this reason.
