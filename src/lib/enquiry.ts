import { plans } from "@/data/plans";
import { services } from "@/data/services";

export const serviceCategories = [
  ...services.map((service) => ({ value: service.slug, label: service.title })),
  { value: "monthly-plans", label: "Monthly Business Support Plans" },
  { value: "general", label: "General enquiry" },
];

export const planOptions = plans.map((plan) => ({ value: plan.id, label: `${plan.name} Plan` }));

export type EnquiryInput = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  plan: string;
  message: string;
  privacy: boolean;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export const emptyEnquiry: EnquiryInput = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  plan: "",
  message: "",
  privacy: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]{7,20}$/;

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Normalises and validates an enquiry. Used by both the form and the API route. */
export function validateEnquiry(raw: unknown): { data: EnquiryInput; errors: EnquiryErrors } {
  const source = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;

  const data: EnquiryInput = {
    fullName: text(source.fullName, 120),
    company: text(source.company, 160),
    email: text(source.email, 200),
    phone: text(source.phone, 30),
    service: text(source.service, 60),
    plan: text(source.plan, 60),
    message: text(source.message, 3000),
    privacy: source.privacy === true,
  };

  const errors: EnquiryErrors = {};

  if (data.fullName.length < 2) errors.fullName = "Enter your full name.";
  if (!EMAIL_PATTERN.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.phone && !PHONE_PATTERN.test(data.phone)) errors.phone = "Enter a valid phone number.";
  if (!serviceCategories.some((option) => option.value === data.service)) {
    errors.service = "Select a service category.";
  }
  if (data.plan && !planOptions.some((option) => option.value === data.plan)) {
    errors.plan = "Select a plan from the list.";
  }
  if (data.message.length < 10) errors.message = "Tell us a little about your requirements.";
  if (!data.privacy) errors.privacy = "Confirm that you have read the privacy notice.";

  return { data, errors };
}
