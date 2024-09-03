---
layout: default
title: User Management Endpoints
---

## User Management

### Get User Profile

- **Endpoint**: `/api/user/profile`
- **Method**: GET
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User details or error message.

### Update User Profile

- **Endpoint**: `/api/user/profile`
- **Method**: PUT
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: JSON object containing fields to update (`fullName`, `nickname`).
- **Response**: Updated user details or error message.

### Delete User Account

- **Endpoint**: `/api/user/profile`
- **Method**: DELETE
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Success message or error details.

### Update Password

- **Endpoint**: `/api/user/profile/password`
- **Method**: PUT
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: JSON object containing `password` and `newPassword`.
- **Response**: Success message or error details.

---