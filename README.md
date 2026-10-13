# LAAMIN Business Set Up Services — Website

Marketing website for **LAAMIN BUSINESS SET UP SERVICES L.L.C** (Dubai, UAE), built with
Next.js (App Router), TypeScript, Tailwind CSS and Lucide icons.

## Requirements

- Node.js 20.9 or newer (developed on Node 24 LTS)
- npm

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command         | Purpose                               |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the development server          |
| `npm run build` | Create a production build             |
| `npm run start` | Serve the production build            |
| `npm run lint`  | Run ESLint                            |
| `npx tsc --noEmit` | Type-check the project             |

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About LAAMIN |
| `/services` | Services overview |
| `/services/business-setup` | Business Setup Services |
| `/services/pro-services` | PRO Services |
| `/services/visa-processing` | Visa Processing |
| `/services/document-clearing` | Document Clearing |
| `/plans` | Monthly Business Support Plans |
| `/contact` | Contact and enquiry form |
| `/privacy-policy` | Privacy Policy (draft) |
| `/terms` | Terms and Conditions (draft) |
| `/api/enquiry` | Enquiry form endpoint (POST) |

`sitemap.xml` and `robots.txt` are generated automatically. A Client Reviews page is
intentionally not included: no verified reviews have been supplied.

## Project structure

```
src/
  app/                 Routes, layout, global styles, sitemap, robots, API route
    services/[slug]/   The four service detail pages (generated from data)
    api/enquiry/       Server-side enquiry email delivery
  components/          Shared UI (header, footer, hero, form, FAQ, etc.)
  data/                All site content
    site.ts            Company details, contact numbers, navigation
    services.ts        The four services and their page content
    plans.ts           The six monthly plans, prices and inclusions
    faqs.ts            Home and plan FAQs
  lib/enquiry.ts       Enquiry validation shared by the form and the API
public/                Logo files
```

To change prices, plan inclusions, service lists, phone numbers or the address, edit the
files in `src/data/` — every page reads from them.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values. Never commit real credentials.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL, used for canonical URLs, the sitemap and robots.txt |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | SMTP account used to send enquiry emails |
| `ENQUIRY_TO_EMAIL` | Address that receives enquiries |
| `ENQUIRY_FROM_EMAIL` | Sender address (defaults to `SMTP_USER`) |

## Connecting the enquiry form

The form posts to `/api/enquiry`, which validates the enquiry on the server and sends it
by email over SMTP using Nodemailer. Until the SMTP variables are set, the endpoint
returns an error and the form shows an error message — it never reports a false success.

To deliver to the company Gmail mailbox:

1. Turn on 2-Step Verification for the Google account.
2. Create an App Password (Google Account → Security → App passwords).
3. Set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=<the Gmail address>`,
   `SMTP_PASS=<the app password>` and `ENQUIRY_TO_EMAIL=info.laamin@gmail.com`.
4. Submit a test enquiry and confirm it arrives.

Any other SMTP provider works with the same variables. The endpoint includes a honeypot
field and input length limits; add rate limiting or a CAPTCHA at the hosting layer if
spam becomes a problem.

## Deployment

The site needs a Node.js host because of the enquiry API route. The simplest option is
Vercel:

1. Push this folder to a Git repository (GitHub, GitLab or Bitbucket).
2. Import the repository at https://vercel.com/new.
3. Add the environment variables above in the project settings.
4. Deploy, then attach the production domain and set `NEXT_PUBLIC_SITE_URL` to it.

Any platform that runs `npm run build` and `npm run start` also works.

## Before publication — items the company must confirm

- **WhatsApp number** — `site.whatsapp` in `src/data/site.ts` currently uses +971 56 167 3832.
- **Map link** — `site.mapUrl` is a Google Maps search for the address; replace it with the
  verified listing link.
- **Privacy Policy and Terms** — both are drafts and show a draft notice. After approval,
  set `legalPagesAreDraft` to `false` in `src/data/site.ts`.
- **Logo files** — `public/logo-full.png` and `public/logo-mark.png` were extracted from the
  company proposal PDF. Replace them with the original vector artwork if available. The
  logo is white and blue, so it is only used on navy backgrounds.
- **Production domain and business email** — the site uses info.laamin@gmail.com until a
  new address is confirmed.
- **Client reviews** — add a testimonials section only with verified, authorised reviews.
