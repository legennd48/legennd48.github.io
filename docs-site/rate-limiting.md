---
layout: default
title: Home
---

## Rate Limiting

### Overview

JournalHub implements rate limiting across all API endpoints to ensure fair usage and protect against abuse. These limits help prevent denial-of-service attacks and ensure that all users have fair access to the API.

### Global Rate Limit

- **Limit**: 50 requests per 15-minute window
- **Scope**: Per IP address
- **Application**: This limit applies to all API endpoints.

If a user exceeds this limit, they will receive a `429 Too Many Requests` response, along with a message indicating that the rate limit has been exceeded.

**Example Response**:
```json
{
  "statusCode": 429,
  "error": "Too Many Requests",
  "message": "You have exceeded the number of allowed requests. Please try again later."
}
```

### Password Reset Request Limits

To further enhance security, the API enforces stricter rate limits on password reset requests. This is designed to prevent automated attacks and reduce the risk of account compromise.

- **Limit**: 5 requests per 1-hour window
- **Scope**: Per user
- **Application**: This limit applies specifically to the user password reset request endpoint.

If a user exceeds this limit, they will also receive a `429 Too Many Requests` response, similar to the global rate limit response.

**Example Response**:
```json
{
  "statusCode": 429,
  "error": "Too Many Requests",
  "message": "You have exceeded the number of allowed password reset requests. Please try again later."
}
```

### Implementation

The rate limiting is implemented using middleware (`express-rate-limit`) that tracks the number of requests from each IP address or user. These limits are enforced across all endpoints to ensure consistent and fair usage.

---
