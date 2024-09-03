---
layout: default
title: Error Handling
---

## Error Handling

The JournalHub API implements comprehensive error handling to ensure that any issues encountered during API requests are communicated effectively to the client. Errors are logged using Winston for further investigation and are returned to the client in a standardized format.

### Error Response Structure

All error responses follow this JSON structure:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Detailed description of the error."
}
```

- **statusCode**: The HTTP status code that represents the error.
- **error**: A brief description of the error type.
- **message**: A more detailed message providing context or specific reasons for the error.

### Types of Errors

1. **Validation Errors**:
   - **Occurs when**: Input data fails validation checks (e.g., missing required fields, incorrect data types).
   - **HTTP Status Code**: `400 Bad Request`
   - **Example**: Missing required fields during journal entry creation.

2. **Authentication Errors**:
   - **Occurs when**: Authentication fails (e.g., missing or invalid token).
   - **HTTP Status Code**: `401 Unauthorized`
   - **Example**: Missing JWT in the Authorization header during a request.

3. **Authorization Errors**:
   - **Occurs when**: A user attempts to access a resource they do not have permission to access.
   - **HTTP Status Code**: `403 Forbidden`
   - **Example**: Attempting to delete another user's journal entry.

4. **Resource Not Found Errors**:
   - **Occurs when**: The requested resource does not exist (e.g., journal entry or user not found).
   - **HTTP Status Code**: `404 Not Found`
   - **Example**: Requesting a journal entry by an ID that does not exist.

5. **Rate Limiting Errors**:
   - **Occurs when**: The rate limit for API requests is exceeded.
   - **HTTP Status Code**: `429 Too Many Requests`
   - **Example**: Exceeding the number of allowed password reset requests.

6. **Server Errors**:
   - **Occurs when**: An unexpected error occurs on the server (e.g., database connection issues).
   - **HTTP Status Code**: `500 Internal Server Error`
   - **Example**: An error occurring during user login due to a server-side issue.

### Logging Errors

All critical errors are logged using Winston to ensure that they can be analyzed and addressed. Logged information includes:
- Error type and message
- Relevant request details
- Timestamp of when the error occurred

Error logs are stored in the `error.log` file, and unhandled rejections are logged separately in `rejections.log`. These log files can be found in the server's log directory, typically under `logs/`.

### Standard Error Responses

The following are common error responses that the JournalHub API might return. Each error is associated with an HTTP status code and a brief explanation of the circumstances under which it occurs.

#### 400 Bad Request

- **Description**: The server cannot process the request due to client-side errors.
- **Common Causes**:
  - Invalid or missing parameters in the request body.
  - Data validation failure (e.g., incorrect data type, missing required fields).
- **Example**:
  ```json
  {
    "statusCode": 400,
    "error": "Bad Request",
    "message": "The 'title' field is required."
  }
  ```

#### 401 Unauthorized

- **Description**: The client must authenticate itself to get the requested response.
- **Common Causes**:
  - Missing or invalid JWT token in the Authorization header.
  - Expired JWT token.
- **Example**:
  ```json
  {
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "Token is invalid or expired."
  }
  ```

#### 403 Forbidden

- **Description**: The client does not have access rights to the content.
- **Common Causes**:
  - User attempting to access a resource they are not permitted to view or modify.
- **Example**:
  ```json
  {
    "statusCode": 403,
    "error": "Forbidden",
    "message": "You do not have permission to access this resource."
  }
  ```

#### 404 Not Found

- **Description**: The server cannot find the requested resource.
- **Common Causes**:
  - The requested journal entry or user does not exist in the database.
- **Example**:
  ```json
  {
    "statusCode": 404,
    "error": "Not Found",
    "message": "The requested resource was not found."
  }
  ```

#### 429 Too Many Requests

- **Description**: The user has sent too many requests in a given amount of time.
- **Common Causes**:
  - Exceeding the rate limit for API requests.
- **Example**:
  ```json
  {
    "statusCode": 429,
    "error": "Too Many Requests",
    "message": "You have exceeded the number of allowed requests. Please try again in 500 seconds."
  }
  ```

#### 500 Internal Server Error

- **Description**: The server encountered a situation it doesn't know how to handle.
- **Common Causes**:
  - Unhandled exceptions in the server code.
  - Database connection failures.
- **Example**:
  ```json
  {
    "statusCode": 500,
    "error": "Internal Server Error",
    "message": "An unexpected error occurred. Please try again later."
  }
  ```

---