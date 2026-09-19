import {
  buildLeadEmail,
  isSameOriginRequest,
  parseLeadPayload,
} from './leads';

const LEAD_RECIPIENT = 'vonco.partners@gmail.com';
const MAX_REQUEST_BYTES = 10_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const NO_STORE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  Vary: 'Origin',
};

export type LeadEmailMessage = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

type LeadHandlerDependencies = {
  from: string;
  sendEmail: (message: LeadEmailMessage) => Promise<{ id: string }>;
  onError?: (error: unknown) => void;
  now?: () => number;
};

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  headers: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { ...NO_STORE_HEADERS, ...headers },
  });
}

export function createLeadPostHandler(dependencies: LeadHandlerDependencies) {
  const requestLog = new Map<string, number[]>();
  let lastRateLimitCleanup = 0;

  return async function POST(request: Request) {
    if (!isSameOriginRequest(request)) {
      return jsonResponse({ ok: false, error: 'origin_not_allowed' }, 403);
    }

    const mediaType = (request.headers.get('content-type') || '')
      .split(';', 1)[0]
      .trim()
      .toLowerCase();
    if (mediaType !== 'application/json') {
      return jsonResponse({ ok: false, error: 'json_required' }, 415);
    }

    const now = dependencies.now?.() ?? Date.now();
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    if (now - lastRateLimitCleanup >= RATE_LIMIT_WINDOW_MS) {
      for (const [loggedIp, timestamps] of requestLog) {
        const activeTimestamps = timestamps.filter(
          (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
        );
        if (activeTimestamps.length) requestLog.set(loggedIp, activeTimestamps);
        else requestLog.delete(loggedIp);
      }
      lastRateLimitCleanup = now;
    }
    const recentRequests = (requestLog.get(clientIp) || []).filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
    );
    if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
      return jsonResponse(
        { ok: false, error: 'rate_limited' },
        429,
        { 'Retry-After': '60' },
      );
    }
    recentRequests.push(now);
    requestLog.set(clientIp, recentRequests);

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
      return jsonResponse({ ok: false, error: 'request_too_large' }, 413);
    }

    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
    }

    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return jsonResponse({ ok: false, error: 'request_too_large' }, 413);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
    }

    const result = parseLeadPayload(payload);
    if (result.status === 'spam') return jsonResponse({ ok: true });
    if (result.status === 'invalid') {
      return jsonResponse({ ok: false, error: 'invalid_lead' }, 400);
    }
    if (!dependencies.from.trim()) {
      return jsonResponse({ ok: false, error: 'configuration_missing' }, 503);
    }

    const email = buildLeadEmail(result.lead);
    try {
      await dependencies.sendEmail({
        from: dependencies.from,
        to: LEAD_RECIPIENT,
        ...(result.lead.email ? { replyTo: result.lead.email } : {}),
        ...email,
      });
      return jsonResponse({ ok: true });
    } catch (error) {
      (dependencies.onError || console.error)(error);
      return jsonResponse({ ok: false, error: 'send_failed' }, 502);
    }
  };
}
