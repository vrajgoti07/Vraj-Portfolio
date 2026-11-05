---
name: rest-api-design
description: Design clean, consistent, versioned REST APIs with proper resources, status codes, pagination, errors, and OpenAPI docs. Use this skill whenever the user designs or reviews an API, endpoints, request/response shapes, pagination, idempotency, or says "backend API" in any framework.
---

# REST API Design

## Resources & verbs
Nouns, plural, nested only one level: `GET /users`, `POST /users`, `GET /users/{id}`, `PATCH /users/{id}`, `DELETE /users/{id}`, `GET /users/{id}/orders`. Actions that aren't CRUD: `POST /orders/{id}/cancel`.

## Status codes
200 OK · 201 Created (+`Location`) · 204 No Content · 400 malformed · 401 unauthenticated · 403 forbidden · 404 · 409 conflict · 422 validation · 429 rate limited · 500/503 server.

## Error format (one shape everywhere)
```json
{ "error": { "code": "VALIDATION_FAILED", "message": "Email is invalid", "details": [{"field":"email","issue":"format"}], "requestId": "abc123" } }
```

## Collections
- Pagination: cursor-based (`?limit=20&cursor=...`) for large/changing data, offset for admin tables. Return `nextCursor`.
- Filtering `?status=active&created_gte=...`, sorting `?sort=-created_at`, sparse fields `?fields=id,name`.

## Reliability
- `Idempotency-Key` header for POST payments/orders.
- Optimistic concurrency with `ETag`/`If-Match` or a `version` field.
- Rate limiting + `Retry-After`. Timeouts everywhere.

## Versioning & docs
URL (`/v1`) or header; never break existing fields—add, deprecate, then remove. Write an **OpenAPI 3** spec (source of truth), generate clients/docs from it.

## Security
Authn (JWT/session/OAuth2), authz per resource (check ownership!), validate input, CORS allow-list, no secrets in URLs, log with request IDs.
