/* ============================================================
   SITE-WIDE CONSTANTS

   Name, address, phone and email are taken from the design mockup's
   footer. Confirm them — and the production `url` below — before launch:
   `url` drives canonical tags, Open Graph, JSON-LD and the sitemap.
   ============================================================ */

export const SITE = {
  name: "Hiring Solutions Group",
  shortName: "HSG",
  tagline: "Leading Candidates to Leading Companies.",
  title: "Hiring Solutions Group — Executive Recruiting & Career Solutions in New Jersey",
  description:
    "Executive recruiting and career solutions in New Jersey. Hiring Solutions Group helps companies identify, evaluate and hire exceptional talent, and helps accomplished professionals find where they create the greatest value.",

  /** TODO: confirm the production domain before launch. */
  url: "https://hiringsolutionsgroup.com",

  /** Open Graph share image, relative to `url`. See public/README.md. */
  ogImage: "/og-image.png",

  founder: "Michael Schlager",

  address: {
    street: "105 Van Houten Ave",
    locality: "Passaic",
    region: "NJ",
    postalCode: "07055",
    country: "US",
  },
  phone: "973-773-4473",
  /** E.164, for tel: links and structured data. */
  phoneHref: "+19737734473",
  email: "contact@hiringsolutionsgroup.com",

  /** Counties named on the page, used for areaServed in structured data. */
  areaServed: [
    "Passaic County, NJ",
    "Bergen County, NJ",
    "Essex County, NJ",
    "Hudson County, NJ",
    "Morris County, NJ",
  ],

  /** Sister company linked from the footer. */
  relatedCompany: {
    name: "Business Solutions Group",
    url: "https://bsg-edge.com/",
  },
} as const;
