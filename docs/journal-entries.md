---
layout: default
title: Journal Entry Endpoints
---

## Journal Entries

### Create Journal Entry

- **Endpoint**: `/api/journal-entries`
- **Method**: POST
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: JSON object containing `title`, `content`, and `isPublic`.
- **Response**: Created journal entry details or error message.

### Get Journal Entries by User ID

- **Endpoint**: `/api/user/:id/journal-entries`
- **Method**: GET
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**: 
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Number of entries per page (default: 10)
- **Response**: Paginated array of journal entries or error message.

### Update Journal Entry

- **Endpoint**: `/api/journal-entries/:id`
- **Method**: PUT
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: JSON object containing fields to update (`title`, `content`, `isPublic`).
- **Response**: Updated journal entry or error message.

### Delete Journal Entry

- **Endpoint**: `/api/journal-entries/:id`
- **Method**: DELETE
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Success message or error details.

### Get Public Journal Entries

- **Endpoint**: `/api/public/journal-entries`
- **Method**: GET


- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Number of entries per page (default: 10)
- **Response**: Paginated array of public journal entries or error message.

### Search Journal Entries

- **Endpoint**: `/api/search/journal-entries`
- **Method**: GET
- **Headers**: `Authorization: Bearer <token>`
- **Query Params**: `q` (search term).
- **Response**: Array of matching journal entries or error message.

---
