import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/services",
    ...services.map((service) => `/services/${service.slug}`),
    "/plans",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
