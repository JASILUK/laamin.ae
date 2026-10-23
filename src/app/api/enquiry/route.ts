
import { site } from "@/data/site";
import {
  planOptions,
  serviceCategories,
  validateEnquiry,
} from "@/lib/enquiry";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "invalid_request" },
      { status: 400 },
    );
  }

  // Honeypot: silently accept bot submissions.
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    body.website
  ) {
    return Response.json({ ok: true });
  }

  const { data, errors } = validateEnquiry(body);

  if (Object.keys(errors).length > 0) {
    return Response.json(
      { error: "validation_failed", errors },
      { status: 422 },
    );
  }

  const {
    BREVO_API_KEY,
    ENQUIRY_TO_EMAIL,
    ENQUIRY_FROM_EMAIL,
  } = process.env;

  if (
    !BREVO_API_KEY ||
    !ENQUIRY_TO_EMAIL ||
    !ENQUIRY_FROM_EMAIL
  ) {
    console.error(
      "Enquiry form: required email configuration is missing.",
    );

    return Response.json(
      { error: "not_configured" },
      { status: 503 },
    );
  }

  const service =
    serviceCategories.find(
      (option) => option.value === data.service,
    )?.label ?? data.service;

  const plan = planOptions.find(
    (option) => option.value === data.plan,
  )?.label;

  const singleLine = (value: string) =>
    value.replace(/[\r\n]+/g, " ");

  const textContent = [
    `Name: ${singleLine(data.fullName)}`,
    `Company: ${singleLine(data.company) || "—"}`,
    `Email: ${singleLine(data.email)}`,
    `Phone: ${singleLine(data.phone || "—")}`,
    `Service category: ${service}`,
    `Monthly plan: ${plan ?? "—"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  try {
    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: site.name,
            email: ENQUIRY_FROM_EMAIL,
          },
          to: [
            {
              email: ENQUIRY_TO_EMAIL,
            },
          ],
          replyTo: {
            email: data.email,
            name: singleLine(data.fullName),
          },
          subject: singleLine(
            `Website enquiry: ${service} — ${data.fullName}`,
          ),
          textContent,
        }),
      },
    );

    if (!response.ok) {
      console.error(
        "Enquiry form: Brevo returned HTTP status",
        response.status,
      );

      return Response.json(
        { error: "delivery_failed" },
        { status: 502 },
      );
    }
  } catch {
    console.error(
      "Enquiry form: request to Brevo failed.",
    );

    return Response.json(
      { error: "delivery_failed" },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
