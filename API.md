# API Documentation

This document describes the internal API routes exposed by the KRYPTA 2026 Next.js application.

---

## `POST /api/subscribe`

Proxies an email subscription request to an external submission endpoint (e.g., a Google Apps Script web app or a third-party email service). This route exists to keep the external endpoint URL server-side only.

### Request

**Content-Type:** `application/json`

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | Yes | The subscriber's email address. |

**Example:**
```json
{
  "email": "user@example.com"
}
```

### Responses

| Status | Body | Condition |
|---|---|---|
| `200 OK` | `{ "success": true, "message": "..." }` | Email successfully forwarded to external service. |
| `400 Bad Request` | `{ "success": false, "message": "Email is required" }` | Request body is missing the `email` field. |
| `500 Internal Server Error` | `{ "success": false, "message": "Server misconfiguration" }` | `NEXT_PUBLIC_EMAIL_SUBMISSION_ENDPOINT` environment variable is not set. |
| `5xx` (proxied) | `{ "success": false, "message": "Failed to submit email to external service" }` | The external endpoint returned a non-OK response. |

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_EMAIL_SUBMISSION_ENDPOINT` | Yes (for subscribe to work) | The URL of the external email collection endpoint. |

> **Note:** Although prefixed `NEXT_PUBLIC_`, this variable is read exclusively on the server side within this route handler. It is safe to point it at a private endpoint. The `NEXT_PUBLIC_` prefix was chosen for compatibility with certain deployment environments.

### Source

[`src/app/api/subscribe/route.ts`](./src/app/api/subscribe/route.ts)

---

## Future Endpoints

The following API routes are planned as the event website expands:

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/contact` | `POST` | Contact form submission |
| `/api/register` | `POST` | Hackathon registration |
