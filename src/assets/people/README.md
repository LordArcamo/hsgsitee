# Portraits for the career continuum

Ten files are here, one per person, at 800x800.

    adam.png     marcus.png   priya.png
    rachel.png   dana.png     omar.png
    david.png    elaine.png   ray.png
    nicole.png

The file name is the whole wiring: `Face.astro` globs this folder and looks
for `<key>.png`. A missing or misnamed file does not error — that card falls
back to the person's initial, which looks like a broken feature when it is
only a typo. All lower case, no spaces, no `(1)`.

PNG, JPG and WebP all work. Square, 400x400 or larger, with headroom around
the shoulders: they are cropped to a circle at 48px for the three leads and
Nicole, 28px for the two examples under each lead, so anything tight to the
edges loses its ears.

To replace one, keep the name and re-run `npm run build`; Astro regenerates
the WebP. Keep the source under about 1.5MB — these live in the repo, and the
served file ends up around 1-2kB after conversion.

The prompts that produced this set are in the appendix of
HSG-Instructions-for-Lord/HSG-CAREER-CONTINUUM-9-PEOPLE.md. Keep the shared style block at the top of
every prompt and generate in one chat; a fresh chat per image is the usual
reason a set stops matching.
