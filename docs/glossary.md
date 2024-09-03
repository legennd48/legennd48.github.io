---
layout: default
title: Glossary
---

## Glossary

- **API (Application Programming Interface)**: A set of rules and protocols for building and interacting with software applications. The JournalHub API allows developers to interact with the journaling platform programmatically.
  
- **CRUD**: Create, Read, Update, Delete – the four basic operations for managing resources in a database. For example, CRUD operations are used to manage journal entries in the JournalHub API.

- **JWT (JSON Web Token)**: A compact, URL-safe means of representing claims to be transferred between two parties. In JournalHub, JWTs are used to authenticate users and authorize access to resources.

- **TTL (Time to Live)**: A mechanism that automatically removes expired data from the database. JournalHub uses TTL indexes in MongoDB to manage the lifecycle of blacklisted tokens.

- **MongoDB**: A NoSQL document-oriented database used to store user and journal data in the JournalHub API. It is known for its scalability and flexibility in handling various data types.

- **Winston**: A versatile logging library for Node.js used in JournalHub to log crucial information and errors. Winston supports multiple logging levels and outputs logs to files, the console, and other destinations.

- **Morgan**: An HTTP request logger middleware for Node.js. Morgan is used in JournalHub to track and log incoming HTTP requests, helping with monitoring and debugging.

- **Rate Limiting**: A technique used to control the number of requests a client can make to the API within a certain time period. JournalHub implements rate limiting to prevent abuse and ensure fair usage of the API.

- **Middleware**: Functions that execute during the processing of HTTP requests in a Node.js application. In JournalHub, middleware is used for tasks such as logging, authentication, and request validation.

- **Joi**: A powerful schema description language and data validator for JavaScript. Joi is used in JournalHub to validate incoming API requests, ensuring that the data meets the expected structure and constraints.

---