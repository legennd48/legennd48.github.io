---
layout: default
title: Security
---

## Security

Security is a core focus of the JournalHub API. User passwords are hashed using bcrypt before being stored in the database. JWT tokens are used to manage user sessions, ensuring that only authenticated users can access or modify their data.

### Password Storage

All passwords are securely hashed using a strong hashing algorithm before being stored in the database.

### Token Usage

- **Access Tokens**: Generated using JWT, valid for 8 hours, and must be included in the Authorization header of requests to protected endpoints.
- **Password Reset Tokens**: Valid for 1 hour and used exclusively for password reset processes.

### JWT Security

- **Token Expiration**: Access tokens expire after 8 hours, and reset tokens expire after 1 hour.
- **Blacklisting**: Tokens are blacklisted upon user logout or after use for password resets.

---

## Security Considerations

### JWT Security

JournalHub uses JSON Web Tokens (JWT) for authentication, which provides a secure and stateless mechanism for managing user sessions. To maintain the security of your application and users, it's essential to handle these tokens properly.

#### Storing JWTs Securely

- **Local Storage vs. Cookies:**
  - **Local Storage:** Storing JWTs in localStorage can expose the token to potential Cross-Site Scripting (XSS) attacks. If an attacker can inject malicious JavaScript into your site, they can access tokens stored in localStorage.
  - **Cookies:** Storing JWTs in an HTTP-only cookie is generally more secure as it prevents client-side scripts from accessing the token. However, this approach may require additional setup to handle CSRF (Cross-Site Request Forgery) attacks.

- **Best Practices:**
  - **Use Secure Storage:** If using cookies, ensure they are flagged as HttpOnly and Secure to prevent JavaScript access and ensure transmission over HTTPS only.

#### Token Expiration

- **Expiration Time:** JWTs in JournalHub are configured to expire after 8 hours. This limits the risk if a token is compromised.

#### Handling Token Compromise

- **Token Blacklisting:** JournalHub automatically blacklists JWTs when a user logs out, ensuring that the token cannot be reused. It's recommended to call the logout endpoint when you detect suspicious activity, such as unauthorized access, to invalidate any active tokens

### Conclusion

By following these security practices, you can ensure that JWTs are used securely in your application, protecting your users and their data