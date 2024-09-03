---
layout: default
title: Authentication
---


## Authentication

### Overview

JournalHub uses JWT (JSON Web Token) for authentication. JWT is a secure and stateless authentication mechanism, allowing users to authenticate themselves once and then use the token for subsequent requests without having to re-authenticate.

### Obtaining a Token

To authenticate a user and obtain a JWT, send a POST request to the `/api/user/login` endpoint with the user's credentials (email and password). Upon successful authentication, the server will return a JWT, which must be included in the Authorization header of subsequent requests.


### Registration

- **Endpoint**: `/api/user/register`
- **Method**: POST
- **Request Body**: JSON object containing `fullName`, `nickname`, `email`, and `password`.
- **Response**: Success message or error details.

### Login

- **Endpoint**: `/api/user/login`
- **Method**: POST
- **Request Body**: JSON object containing `email` and `password`.
- **Response**: JWT token or error message.

### Logout

- **Endpoint**: `/api/user/logout`
- **Method**: POST
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Success message or error details.

---

## JWT Security
JournalHub uses JSON Web Tokens (JWT) for authentication, which provides a secure and stateless mechanism for managing user sessions. However, to maintain the security of your application and users, it's essential to handle these tokens properly.