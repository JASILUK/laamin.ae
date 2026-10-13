import nodemailer from "nodemailer";
import { site } from "@/data/site";
import { planOptions, serviceCategories, validateEnquiry } from "@/lib/enquiry";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body === "object" && body !== null && "website" in body && body.website) {
    return Response.json({ ok: true });
  }

  const { data, errors } = validateEnquiry(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "validation_failed", errors }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ENQUIRY_TO_EMAIL) {
    console.error("Enquiry form: SMTP environment variables are not configured.");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const service = serviceCategories.find((option) => option.value === data.service)?.label;
  const plan = planOptions.find((option) => option.value === data.plan)?.label;
  const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ");

  try {
    await transporter.sendMail({
      from: `"${site.name} Website" <${ENQUIRY_FROM_EMAIL || SMTP_USER}>`,
      to: ENQUIRY_TO_EMAIL,
      replyTo: data.email,
      subject: singleLine(`Website enquiry: ${service} — ${data.fullName}`),
      text: [
        `Name: ${singleLine(data.fullName)}`,
        `Company: ${singleLine(data.company) || "—"}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "—"}`,
        `Service category: ${service}`,
        `Monthly plan: ${plan ?? "—"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("Enquiry form: email delivery failed.", error);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
