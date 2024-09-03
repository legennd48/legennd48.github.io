---
layout: default
title: Usage Examples
---

## Examples

This section provides detailed examples of how to use the JournalHub API endpoints using `curl` commands. These examples demonstrate the typical flow of user interactions with the API.

### User Registration and Authentication

#### Register a New User

```bash
curl -X POST http://localhost:5000/api/user/register \
-H "Content-Type: application/json" \
-d '{
  "fullName": "John Doe",
  "nickname": "johnny",
  "email": "john_doe@example.com",
  "password": "randomPassword"
}'
```

**Response:**
```json
{"userId":"66cdb573a4f329c5533e2c02"}
```
- **Explanation**: The server responds with the `userId` of the newly registered user.

#### User Login

```bash
curl -X POST http://localhost:5000/api/user/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john_doe@example.com",
  "password": "randomPassword"
}'
```

**Response:**
```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```
- **Explanation**: Upon successful login, the server returns a JWT token, which must be used in the `Authorization` header for subsequent requests.

### User Profile Management

#### Get User Profile

```bash
curl -X GET http://localhost:5000/api/user/profile/ \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "user":{
    "_id":"66cdb573a4f329c5533e2c02",
    "fullName":"John Doe",
    "nickname":"johnny",
    "email":"john_doe@example.com",
    "profilePic":"data:image/jpg;base64,...",
    "role":"user",
    "isPrivate":false
  }
}
```
- **Explanation**: The server returns the user's profile details, including their `fullName`, `nickname`, `email`, and other attributes.

#### Update User Profile

```bash
curl -X PUT http://localhost:5000/api/user/profile/ \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
-H "Content-Type: application/json" \
-d '{
  "fullName": "John Q. Doe",
  "nickname": "Johnny Q.",
  "email": "johnny_q@example.com"
}'
```

**Response:**
```json
{"message":"User profile updated successfully"}
```
- **Explanation**: The server confirms that the user's profile has been successfully updated.

### Journal Entries

#### Create a New Journal Entry

```bash
curl -X POST http://localhost:5000/api/journal-entries \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
-H "Content-Type: application/json" \
-d '{
  "title": "Killing a Dragon",
  "content": "It's easy to kill a dragon. Just poke its eye with a sword.",
  "isPublic": true
}'
```

**Response:**
```json
{
  "title":"Killing a Dragon",
  "content":"It's easy to kill a dragon. Just poke its eye with a sword.",
  "author_id":"66cdb573a4f329c5533e2c02",
  "author_name":"johnny",
  "createdAt":"2024-08-27T11:42:28.185Z",
  "isPublic":true,
  "_id":"66cdbba4a58183d1271a46df"
}
```
- **Explanation**: The server returns the details of the newly created journal entry, including the `title`, `content`, and the author's information.

### Error Handling Examples

#### Incorrect Password During Login

```bash
curl -X POST http://localhost:5000/api/user/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john_doe@example.com",
  "password": "wrongPassword"
}'
```

**Response:**
```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Invalid credentials."
}
```
- **Explanation**: The server returns an `Unauthorized` error if the provided password is incorrect.

### Conclusion

These examples provide a practical overview of how to interact with the JournalHub API using `curl`. it shows the typical workflow for managing users and journal entries.

---