"use client";

import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/data/site";
import {
  emptyEnquiry,
  planOptions,
  serviceCategories,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryInput,
} from "@/lib/enquiry";
import { buttonClasses } from "./button";

type Status = "idle" | "submitting" | "success" | "error";

const fieldOrder: (keyof EnquiryInput)[] = [
  "fullName",
  "company",
  "email",
  "phone",
  "service",
  "plan",
  "message",
  "privacy",
];

const inputClass =
  "mt-1.5 block w-full rounded-lg border bg-white px-3.5 py-2.5 text-base text-ink transition-colors placeholder:text-muted/60 focus:border-navy-900 sm:text-sm";

const fallbackError = `We could not send your enquiry. Please try again, or contact us on ${site.phones[0].display} or ${site.email}.`;

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[13px] font-semibold text-navy-900">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
          <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm() {
  const searchParams = useSearchParams();

  const [values, setValues] = useState<EnquiryInput>(() => {
    const planParam = searchParams.get("plan") ?? "";
    const serviceParam = searchParams.get("service") ?? "";
    const plan = planOptions.some((option) => option.value === planParam) ? planParam : "";
    const service = serviceCategories.some((option) => option.value === serviceParam)
      ? serviceParam
      : plan
        ? "monthly-plans"
        : "";
    return { ...emptyEnquiry, plan, service };
  });
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");

  const update = <K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const showErrors = (next: EnquiryErrors) => {
    setErrors(next);
    const first = fieldOrder.find((key) => next[key]);
    if (first) document.getElementById(`enquiry-${first}`)?.focus();
  };

  const fieldProps = (key: keyof EnquiryInput) => ({
    id: `enquiry-${key}`,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `enquiry-${key}-error` : undefined,
  });

  const borderFor = (key: keyof EnquiryInput) => (errors[key] ? "border-red-600" : "border-line");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const { data, errors: validationErrors } = validateEnquiry(values);
    if (Object.keys(validationErrors).length > 0) {
      showErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setSubmitError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website }),
      });

      if (response.ok) {
        setStatus("success");
        setValues(emptyEnquiry);
        return;
      }

      const result: { errors?: EnquiryErrors } = await response.json().catch(() => ({}));
      if (response.status === 422 && result.errors) {
        setStatus("idle");
        showErrors(result.errors);
        return;
      }
      setSubmitError(fallbackError);
    } catch {
      setSubmitError(fallbackError);
    }
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-line bg-white p-7 shadow-[0_24px_70px_-45px_rgba(4,45,85,0.55)] sm:p-9"
      >
        <CircleCheck aria-hidden="true" className="size-10 text-emerald-700" />
        <h3 className="mt-4 font-display text-2xl text-navy-900 sm:text-3xl">
          Thank you — enquiry sent
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          Your enquiry has been delivered to the LAAMIN team. We will reply using the contact
          details you provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={buttonClasses("outline", "mt-6")}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-[0_24px_70px_-45px_rgba(4,45,85,0.55)] sm:p-6 lg:p-7"
    >
      <div className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2">
        <Field id="enquiry-fullName" label="Full name" error={errors.fullName}>
          <input
            {...fieldProps("fullName")}
            type="text"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            className={`${inputClass} ${borderFor("fullName")}`}
          />
        </Field>

        <Field id="enquiry-company" label="Company name" optional error={errors.company}>
          <input
            {...fieldProps("company")}
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            className={`${inputClass} ${borderFor("company")}`}
          />
        </Field>

        <Field id="enquiry-email" label="Business email" error={errors.email}>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            className={`${inputClass} ${borderFor("email")}`}
          />
        </Field>

        <Field id="enquiry-phone" label="Phone number" optional error={errors.phone}>
          <input
            {...fieldProps("phone")}
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={`${inputClass} ${borderFor("phone")}`}
          />
        </Field>

        <Field id="enquiry-service" label="Service category" error={errors.service}>
          <select
            {...fieldProps("service")}
            required
            value={values.service}
            onChange={(event) => update("service", event.target.value)}
            className={`${inputClass} ${borderFor("service")}`}
          >
            <option value="">Select a service</option>
            {serviceCategories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="enquiry-plan" label="Monthly plan" optional error={errors.plan}>
          <select
            {...fieldProps("plan")}
            value={values.plan}
            onChange={(event) => update("plan", event.target.value)}
            className={`${inputClass} ${borderFor("plan")}`}
          >
            <option value="">No plan selected</option>
            {planOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field id="enquiry-message" label="Message" error={errors.message}>
            <textarea
              {...fieldProps("message")}
              required
              rows={3}
              maxLength={3000}
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              className={`${inputClass} ${borderFor("message")} resize-none`}
            />
          </Field>
          <p className="mt-1.5 text-xs leading-snug text-muted">
            Please do not include passport copies, Emirates ID details or other sensitive identity
            documents.
          </p>
        </div>

        {/* Honeypot field: hidden from visitors and assistive technology. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="enquiry-website">Website</label>
          <input
            id="enquiry-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              {...fieldProps("privacy")}
              type="checkbox"
              required
              checked={values.privacy}
              onChange={(event) => update("privacy", event.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-navy-900"
            />
            <label htmlFor="enquiry-privacy" className="text-xs leading-relaxed text-muted sm:text-[13px]">
              I have read the{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-navy-900 underline underline-offset-4"
              >
                Privacy Policy
              </Link>{" "}
              and agree to LAAMIN using these details to respond to my enquiry.
            </label>
          </div>
          {errors.privacy && (
            <p
              id="enquiry-privacy-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700"
            >
              <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
              {errors.privacy}
            </p>
          )}
        </div>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-relaxed text-red-800"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClasses("navy", "mt-5 w-full sm:w-auto")}
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="size-4" />
            Send Enquiry
          </>
        )}
      </button>
    </form>
  );
}