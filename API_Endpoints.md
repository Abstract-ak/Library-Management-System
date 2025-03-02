# Library Management System API Endpoints

## Base URL

## 1. Authentication APIs

### 1.1 Register User

- **POST** `/api/auth/register`
- **Access:** Public
- **Description:** Register a new user

### 1.2 Login

- **POST** `/api/auth/login`
- **Access:** Public
- **Description:** Authenticate user and get JWT token

## 2. Book Management APIs

### 2.1 Get All Books

- **GET** `/api/books`
- **Access:** Public
- **Description:** Get list of all books with optional filters

### 2.2 Get Book by ID

- **GET** `/api/books/:id`
- **Access:** Public
- **Description:** Get details of a specific book

### 2.3 Add Book

- **POST** `/api/books`
- **Access:** Admin only
- **Description:** Add a new book to the library

### 2.4 Update Book

- **PUT** `/api/books/:id`
- **Access:** Admin only
- **Description:** Update book details

### 2.5 Delete Book

- **DELETE** `/api/books/:id`
- **Access:** Admin only
- **Description:** Remove a book from the library

## 3. Borrowing Operations APIs

### 3.1 Borrow Book

- **POST** `/api/borrow/borrow`
- **Access:** Member
- **Description:** Request to borrow a book

### 3.2 Return Book

- **POST** `/api/borrow/return`
- **Access:** Member
- **Description:** Return a borrowed book

### 3.3 Get Borrowed Books History

- **GET** `/api/borrow/history`
- **Access:** Member (own history), Librarian/Admin (all history)
- **Description:** View borrowing history

### 3.4 Record Borrow

- **POST** `/api/borrow/record-borrow`
- **Access:** Librarian, Admin
- **Description:** Record a book borrowing

### 3.5 Record Return

- **POST** `/api/borrow/record-return`
- **Access:** Librarian, Admin
- **Description:** Record a book return

## 4. User Management APIs

### 4.1 Get All Users

- **GET** `/api/users`
- **Access:** Admin only
- **Description:** Get list of all users

### 4.2 Get User by ID

- **GET** `/api/users/:id`
- **Access:** Admin only
- **Description:** Get details of a specific user

### 4.3 Update User

- **PUT** `/api/users/:id`
- **Access:** Admin only
- **Description:** Update user details

### 4.4 Delete User

- **DELETE** `/api/users/:id`
- **Access:** Admin only
- **Description:** Remove a user from the system

### 4.5 Activate User

- **PATCH** `/api/users/:id/activate`
- **Access:** Admin only
- **Description:** Activate a registered user

## Common Response Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Authentication

All protected routes require a JWT token in the Authorization header:
