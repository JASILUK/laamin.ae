const address = {
  lines: [
    "Door No. 17, 5th Floor, Tanvi Business Center",
    "Horizon Building, Near Clock Tower",
    "City Centre Deira, Dubai, UAE",
  ],
  street:
    "Door No. 17, 5th Floor, Tanvi Business Center, Horizon Building, Near Clock Tower, City Centre Deira",
  locality: "Dubai",
  country: "AE",
};

export const site = {
  name: "LAAMIN",
  legalName: "LAAMIN BUSINESS SET UP SERVICES L.L.C",
  tagline: "Business Set Up Services L.L.C",
  description:
    "Business setup, PRO services, visa processing and document clearing support in Dubai and across the UAE.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  email: "info.laamin@gmail.com",
  phones: [
    { display: "+971 56 167 3832", tel: "+971561673832" },
    { display: "+971 52 108 4400", tel: "+971521084400" },
  ],
  // TODO(company): confirm which number receives WhatsApp enquiries before publication.
  whatsapp: "971561673832",
  address,
  // TODO(company): replace with the verified Google Maps listing link before publication.
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Tanvi Business Center, Horizon Building, Near Clock Tower, Deira, Dubai",
  )}`,
  // Shows a "draft pending company approval" notice on the legal pages.
  // Set to false once the company has reviewed and approved both documents.
  legalPagesAreDraft: true,
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}`;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Monthly Plans", href: "/plans" },
  { label: "Contact", href: "/contact" },
] as const;

export const processSteps = [
  {
    title: "Contact LAAMIN",
    text: "Get in touch and explain your requirements.",
  },
  {
    title: "Discuss your options",
    text: "We discuss the appropriate service or monthly plan with you.",
  },
  {
    title: "Confirm scope and fees",
    text: "The service scope and fees are confirmed before any work begins.",
  },
  {
    title: "Proceed",
    text: "We proceed with the agreed services and keep you updated.",
  },
] as const;

export const reasons = [
  {
    title: "Responsive support and clear communication",
    text: "We keep you informed about what is needed and where your request stands.",
  },
  {
    title: "Organised document handling and process follow-up",
    text: "Documents are kept in order and each process is followed up as it progresses.",
  },
  {
    title: "Coordinated administrative support",
    text: "Licensing, labour, immigration and document tasks are coordinated through one team.",
  },
  {
    title: "Service options for different business requirements",
    text: "Enquire about an individual service, or choose from six monthly plans.",
  },
] as const;
