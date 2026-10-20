// lib/clientReviewsData.ts
// All client review content lives here. Edit text only in this file.

export type ClientReview = {
    id: number;
    index: string; // "01", "02"...
    industry: string;
    company: string;
    quote: string;
  };
  
  export const clientReviewsContent = {
    eyebrow: "CLIENT REVIEWS",
    heading: "What Our Clients Say",
    description:
      "Businesses from different industries share their experience working with LAAMIN.",
  };
  
  export const clientReviews: ClientReview[] = [
    {
      id: 1,
      index: "01",
      industry: "Painting and contracting",
      company: "Favorite Plus Painting Contracting LLC",
      quote:
        "Having a reliable point of contact for business documentation and administrative requirements makes coordination much easier. Clear communication and a well-organized approach are important when managing business operations.",
    },
    {
      id: 2,
      index: "02",
      industry: "Pest control",
      company: "MASTROGEN PEST CONTROL L.L.C",
      quote:
        "Managing business requirements involves careful attention to documentation and procedures. We value a professional approach, clear expectations, and timely communication throughout the process.",
    },
    {
      id: 3,
      index: "03",
      industry: "Cleaning services",
      company: "HYGEIA CLEANING SERVICES L.L.C",
      quote:
        "For a service business, keeping administrative tasks organized is essential. Having clear guidance on documentation and business procedures can make day-to-day coordination more straightforward.",
    },
    {
      id: 4,
      index: "04",
      industry: "Food company",
      company: "OMANI GULF FOOD COMPANY L.L.C",
      quote:
        "Business administration requires consistency, attention to detail, and clear communication. A structured approach to documentation and related procedures helps businesses manage their requirements with greater clarity.",
    },
    {
      id: 5,
      index: "05",
      industry: "Air cargo",
      company: "Prime Matters Air Cargo Services L.L.C",
      quote:
        "When managing a business, efficient coordination and clear communication are valuable. Having support with administrative requirements helps keep documentation and procedural matters organized.",
    },
    {
      id: 6,
      index: "06",
      industry: "Technical services",
      company: "TIKE TECHNICAL SERVICES L.L.C",
      quote:
        "A professional and organized approach to business documentation makes administrative requirements easier to navigate. Clear guidance and transparent expectations are important for building a dependable working relationship.",
    },
    {
      id: 7,
      index: "07",
      industry: "Air and sea cargo",
      company: "LOGIFEX AIR & SEA CARGO SERVICES L.L.C",
      quote:
        "Business operations depend on coordination, accurate documentation, and effective communication. A structured approach to administrative procedures helps keep essential requirements clear and manageable.",
    },
    {
      id: 8,
      index: "08",
      industry: "Packing services",
      company: "PROFESSIONAL PACKING SERVICES L.L.C",
      quote:
        "Clear processes and organized documentation are important for running a business smoothly. Professional guidance on administrative requirements can help reduce confusion and make the next steps easier to understand.",
    },
    {
      id: 9,
      index: "09",
      industry: "Tours and travel",
      company: "FORTUNE ROYAL TOURS & TRAVELS L.L.C",
      quote:
        "Clear communication and careful handling of business documentation are valuable when managing administrative requirements. A professional, transparent approach helps create a more straightforward experience.",
    },
  ];