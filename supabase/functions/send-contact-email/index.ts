const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const recipient = "gethelp@akhiltechnology.com";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceInterest?: string | null;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isContactPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return (
    typeof payload.name === "string" &&
    payload.name.trim().length > 0 &&
    typeof payload.email === "string" &&
    payload.email.includes("@") &&
    typeof payload.message === "string" &&
    payload.message.trim().length > 0
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload: unknown = await req.json();
    if (!isContactPayload(payload)) {
      return new Response(JSON.stringify({ error: "Please provide a name, email, and message." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: "Email delivery is not configured yet." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") ?? "Akhil Technology <onboarding@resend.dev>";
    const safeName = escapeHtml(payload.name.trim());
    const safeEmail = escapeHtml(payload.email.trim());
    const safePhone = escapeHtml(payload.phone?.trim() || "Not provided");
    const safeCompany = escapeHtml(payload.company?.trim() || "Not provided");
    const safeService = escapeHtml(payload.serviceInterest?.trim() || "Not specified");
    const safeMessage = escapeHtml(payload.message.trim()).replaceAll("\n", "<br />");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipient],
        reply_to: payload.email.trim(),
        subject: `New website inquiry from ${payload.name.trim()}`,
        html: `
          <h2>New website inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Service:</strong> ${safeService}</p>
          <p><strong>Message:</strong><br />${safeMessage}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      return new Response(JSON.stringify({ error: `Resend error (${response.status}): ${errBody}` }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ sent: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Unable to send the email notification." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
