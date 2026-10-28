import { isValidEmailAddress } from '../src/lib/contactValidation';

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  message: string;
  turnstileToken: string;
}

const recipient = 'sales@akhiltechnology.com';

function hasTurnstileSiteKey(siteKey: string | undefined): siteKey is string {
  return Boolean(siteKey && !siteKey.startsWith('REPLACE_WITH_'));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readOptionalText(value: unknown): string | null {
  if (value === undefined || value === null || value === '') return '';
  return typeof value === 'string' ? value.trim() : null;
}

function parseContactPayload(value: unknown): ContactPayload | null {
  if (!isRecord(value)) return null;

  const { name, email, message } = value;
  const turnstileToken = value.turnstileToken;
  const phone = readOptionalText(value.phone);
  const company = readOptionalText(value.company);
  const serviceInterest = readOptionalText(value.serviceInterest);

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    typeof turnstileToken !== 'string' ||
    turnstileToken.length === 0 ||
    turnstileToken.length > 2048 ||
    phone === null ||
    company === null ||
    serviceInterest === null
  ) {
    return null;
  }

  const normalizedName = name.trim();
  const normalizedEmail = email.trim();
  const normalizedMessage = message.trim();

  if (
    normalizedName.length === 0 ||
    normalizedName.length > 200 ||
    !isValidEmailAddress(normalizedEmail) ||
    normalizedMessage.length === 0 ||
    normalizedMessage.length > 5000 ||
    phone.length > 50 ||
    company.length > 200 ||
    serviceInterest.length > 200
  ) {
    return null;
  }

  return {
    name: normalizedName,
    email: normalizedEmail,
    phone,
    company,
    serviceInterest,
    message: normalizedMessage,
    turnstileToken,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return Response.json(body, { status });
}

async function verifyTurnstile(
  token: string,
  request: Request,
  secretKey: string,
): Promise<boolean> {
  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });
  const remoteIp = request.headers.get('CF-Connecting-IP');
  if (remoteIp) body.set('remoteip', remoteIp);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    console.error('Turnstile verification endpoint returned an error.', response.status);
    return false;
  }

  const result: unknown = await response.json();
  return isRecord(result) && result.success === true;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  let payload: ContactPayload | null;
  try {
    payload = parseContactPayload(await request.json());
  } catch {
    return jsonResponse({ error: 'Invalid JSON request.' }, 400);
  }

  if (!payload) {
    return jsonResponse({ error: 'Please provide a valid name, email address, and message.' }, 400);
  }

  if (!env.TURNSTILE_SECRET_KEY || !hasTurnstileSiteKey(env.TURNSTILE_SITE_KEY)) {
    console.error('Turnstile is not configured.');
    return jsonResponse({ error: 'Security verification is not configured yet.' }, 503);
  }

  try {
    if (!(await verifyTurnstile(payload.turnstileToken, request, env.TURNSTILE_SECRET_KEY))) {
      return jsonResponse({ error: 'Security check failed. Please try again.' }, 400);
    }
  } catch (error) {
    console.error('Unable to verify Turnstile response.', error);
    return jsonResponse({ error: 'Unable to verify the security check. Please try again.' }, 502);
  }

  try {
    await env.DB.prepare(
      `INSERT INTO contact_submissions
        (id, name, email, phone, company, message, service_interest)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        crypto.randomUUID(),
        payload.name,
        payload.email,
        payload.phone || null,
        payload.company || null,
        payload.message,
        payload.serviceInterest || null,
      )
      .run();
  } catch (error) {
    console.error('Failed to store contact submission in D1.', error);
    return jsonResponse({ error: 'Unable to save your message. Please try again.' }, 500);
  }

  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured.');
    return jsonResponse(
      { error: 'Your message was saved, but email notification is not configured.' },
      503,
    );
  }

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safePhone = escapeHtml(payload.phone || 'Not provided');
  const safeCompany = escapeHtml(payload.company || 'Not provided');
  const safeService = escapeHtml(payload.serviceInterest || 'Not specified');
  const safeMessage = escapeHtml(payload.message).replaceAll('\n', '<br />');
  const subjectService = (payload.serviceInterest || 'General inquiry').replace(/[\r\n]+/g, ' ');
  const subjectName = payload.name.replace(/[\r\n]+/g, ' ');

  let emailResponse: Response;
  try {
    emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL ?? 'Akhil Technology <onboarding@resend.dev>',
        to: [recipient],
        reply_to: payload.email,
        subject: `${subjectService}: ${subjectName}`,
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
  } catch (error) {
    console.error('Resend request failed after saving the contact submission.', error);
    return jsonResponse(
      { error: 'Your message was saved, but the email notification could not be sent.' },
      502,
    );
  }

  if (!emailResponse.ok) {
    const errorBody = await emailResponse.text();
    console.error('Resend rejected the email request.', emailResponse.status, errorBody);
    return jsonResponse(
      { error: 'Your message was saved, but the email notification could not be sent.' },
      502,
    );
  }

  return jsonResponse({ sent: true }, 200);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/turnstile-config' && request.method === 'GET') {
      if (!hasTurnstileSiteKey(env.TURNSTILE_SITE_KEY)) {
        return jsonResponse({ error: 'Security verification is not configured yet.' }, 503);
      }
      return jsonResponse({ siteKey: env.TURNSTILE_SITE_KEY }, 200);
    }
    if (url.pathname === '/api/contact') {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
