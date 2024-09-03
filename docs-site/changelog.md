---
layout: default
title: Changelog
---

# Changelog

### Version History

#### Initial Submission
The original JournalHub project, submitted as a final #ALX_SE project, was basic, with several logic flaws and security vulnerabilities.

### Improvements and New Features

#### v1.1.0

##### JWT Enhancement
- **Feature**: JWT now serves as a user data delivery system, extracting user data directly from the token.

<details>
<summary>More details</summary>
Initially, JWT was only used for generating and verifying tokens. Now, it also serves as a user data delivery system. Routes that previously required user ID and other info as parameters now extract these directly from the token. The token now includes the user's full name, nickname, and email.
</details>

##### Token Blacklisting
- **Feature**: Replaced Redis with MongoDB's TTL index for token blacklisting, simplifying the system.

<details>
<summary>More details</summary>
Previously, Redis was used solely for managing token blacklisting. Now, MongoDB's TTL index handles this, simplifying the system by eliminating the need for Redis. Blacklisted tokens are automatically removed upon expiration.
</details>

##### Account Deletion
- **Feature**: Now deletes all associated journal entries and blacklists the access token.

<details>
<summary>More details</summary>
The account deletion process has been enhanced. It now deletes all associated journal entries and blacklists the access token used for the operation.
</details>

##### User Profile
- **Feature**: Added nickname and profile picture support, with the picture stored as a base64-encoded string.

<details>
<summary>More details</summary>
The registration process has been expanded to include a nickname, and the name field has been updated to "fullName." Additionally, user profiles now include a base64-encoded profile picture stored as a string, with a default image provided.
</details>

##### Password Update
- **Feature**: New route for updating passwords.

<details>
<summary>More details</summary>
A new route has been added to allow users to update their passwords, addressing a previous oversight in the user profile update process.
</details>

##### Logging Enhancement
- **Feature**: Implemented Winston and Morgan for logging.

<details>
<summary>More details</summary>
- Implemented Winston for logging crucial information and errors to files, improving debugging and monitoring capabilities.
- Added Morgan logger to track and log API access, providing insights into API usage patterns.
</details>

##### Rate Limiting
- **Feature**: Global rate limit of 50 requests per 15-minute window.

<details>
<summary>More details</summary>
Implemented a global rate limit of 50 requests per 15-minute window for each IP address, enhancing API security and ensuring fair usage.
</details>

##### Request Validation
- **Feature**: Added Joi-based request validation middleware.

<details>
<summary>More details</summary>
Added middleware for request validation using Joi schemas, improving data integrity and reducing invalid requests.
</details>

##### Pagination
- **Feature**: Implemented pagination for journal entry retrieval.

<details>
<summary>More details</summary>
Implemented pagination for journal entry retrieval operations, including both user-specific and public entries. This improves performance and user experience when dealing with large datasets.
</details>

##### Journal Entry Search
- **Feature**: Users can search their entries by title and content.

<details>
<summary>More details</summary>
Users can now search through their entries by title and content using indexed text fields in MongoDB.
</details>

##### Public Entries
- **Feature**: Users can mark entries as public or private.

<details>
<summary>More details</summary>
Users can mark journal entries as public, making them viewable by anyone. Users can also revert public entries to private at any time.
</details>

##### Mailer Integration
- **Feature**: Added automatic email notifications.

<details>
<summary>More details</summary>
A mailer system has been added to automatically send emails for registration, profile updates, and password resets. This was implemented using NodeMailer.
</details>

##### Password Reset Feature
- **Feature**: Enhanced password reset functionality with token-based authentication.

<details>
<summary>More details</summary>
A new password reset functionality has been implemented, enhancing account security and user experience. This feature includes two new routes:
1. **Request Password Reset**: Allows users to initiate a password reset by providing their email. The system generates a reset token and sends an email containing a link with this token.
2. **Reset Password**: Enables users to set a new password using the token received via email. This route verifies the token and updates the user's password securely.

These routes integrate with the new Mailer system, ensuring secure and user-friendly password recovery.
</details>

---

### **Summary:**
These updates are a significant improvements to the JournalHub API, focusing on enhancing security, improving user experience, and simplifying system architecture. Each change is designed to make the API more robust, scalable, and easier to use for developers and end-users alike.