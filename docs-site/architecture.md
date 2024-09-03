---
layout: default
title: Architecture
---

## Architecture

### Controllers

- **App Controller**: Manages the initialization of the application and handles generic routes (e.g., checking API status).
- **JournalEntries Controller**: Handles all operations related to journal entries, including creating, reading, updating, and deleting entries.
- **User Controller**: Manages user-related operations, such as registration, profile management, and account deletion.
- **Auth Controller**: Handles authentication and authorization processes, including user login, token generation, password resets, and token validation.

### Models

- **JournalEntry Model**: Represents the structure of a journal entry within the database, including fields such as title, content, and visibility (public/private).
- **User Model**: Represents user information within the database, including fields such as full name, nickname, email, and password.

### Utilities

- **db.js**: Manages the connection to the MongoDB database.
- **jwt.js**: Provides functions for generating and verifying JSON Web Tokens (JWT).
- **mailer.js**: Handles sending emails, such as welcome emails, password reset instructions, and notifications for changes to user accounts.
- **logger.js**: Implements Winston for logging crucial information and errors to files.

### Middleware

Middleware functions are used throughout the application to handle tasks such as:
- **Validating incoming requests** using Joi schemas.
- **Checking user authentication status** using JWTs.
- **Logging application activity** with Winston and Morgan.
- **Implementing rate limiting** to protect against abuse.

---
