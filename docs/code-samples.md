---
layout: default
title: Code samples
---

## Code Samples

This section provides code samples for common operations using the JournalHub API. These samples are written in JavaScript using the `fetch` API, which is widely supported in modern browsers and Node.js environments.

### User Authentication

#### Register a New User

```javascript
async function registerUser(userData) {
  const response = await fetch('http://localhost:5000/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Usage
const userData = {
  fullName: 'John Doe',
  nickname: 'johnd',
  email: 'john@example.com',
  password: 'securePassword123'
};

try {
  const result = await registerUser(userData);
  console.log('User registered:', result);
} catch (error) {
  console.error('Registration failed:', error.message);
}
```

#### User Login

```javascript
async function loginUser(credentials) {
  const response = await fetch('http://localhost:5000/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Usage
const credentials = {
  email: 'john@example.com',
  password: 'securePassword123'
};

try {
  const { token } = await loginUser(credentials);
  console.log('Login successful. Token:', token);
  // Store the token securely for future API calls
} catch (error) {
  console.error('Login failed:', error.message);
}
```

### Journal Entries

#### Create a New Journal Entry

```javascript
async function createJournalEntry(entryData, token) {
  const response = await fetch('http://localhost:5000/api/journal-entries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(entryData),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Usage
const entryData = {
  title: 'My First Journal Entry',
  content: 'Today was an amazing day!',
  isPublic: false
};

const token = 'your_jwt_token_here';

try {
  const newEntry = await createJournalEntry(entryData, token);
  console.log('New entry created:', newEntry);
} catch (error) {
  console.error('Failed to create entry:', error.message);
}
```

#### Get User's Journal Entries

```javascript
async function getUserJournalEntries(token, page = 1, limit = 10) {
  const response = await fetch(`http://localhost:5000/api/journal-entries/user?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Usage
const token = 'your_jwt_token_here';

try {
  const entries = await getUserJournalEntries(token);
  console.log('User journal entries:', entries);
} catch (error) {
  console.error('Failed to fetch entries:', error.message);
}
```

#### Update a Journal Entry

```javascript
async function updateJournalEntry(entryId, updateData, token) {
  const response = await fetch(`http://localhost:5000/api/journal-entries/${entryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Usage
const entryId = 'entry_id_here';
const updateData = {
  title: 'Updated Title',
  content: 'This entry has been updated!',
  isPublic: true
};
const token = 'your_jwt_token_here';

try {
  const updatedEntry = await updateJournalEntry(entryId, updateData, token);
  console.log('Entry updated:', updatedEntry);
} catch (error) {
  console.error('Failed to update entry:', error.message);
}
```

#### Search Journal Entries

```javascript
async function searchJournalEntries(query, token) {
  const response = await fetch(`http://localhost:5000/api/search/journal-entries?q=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Usage
const searchQuery = 'important';
const token = 'your_jwt_token_here';

try {
  const searchResults = await searchJournalEntries(searchQuery, token);
  console.log('Search results:', searchResults);
} catch (error) {
  console.error('Search failed:', error.message);
}
```