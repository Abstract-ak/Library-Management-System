# Library Management System

A RESTful API for a Library Management System built with Node.js, Express, and MySQL, featuring role-based authentication.

## Features

- Role-based authentication (Admin, Librarian, Member)
- JWT-based authentication
- Book management
- User management
- Borrowing operations
- Request validation using Joi
- MySQL database with Sequelize ORM

## Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT for authentication
- Joi for validation
- Nodemailer for email notifications

## Project Structure

```
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/        # Database models
│   ├── routes/        # Route definitions
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   └── app.js         # App entry point
├── .env.example       # Example environment variables
├── .gitignore        # Git ignore file
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and update the values.

4. Create the database:

   ```bash
   npm run db:create
   ```

5. Run migrations:

   ```bash
   npm run db:migrate
   ```

6. Start the server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication Endpoints

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and get JWT token

### Book Management Endpoints

- GET /api/books - Get all books
- POST /api/books - Add a new book (Admin only)
- PUT /api/books/:id - Update a book (Admin only)
- DELETE /api/books/:id - Delete a book (Admin only)

### Borrowing Operations Endpoints

- POST /api/borrow - Borrow a book
- POST /api/return - Return a book
- GET /api/borrowed - Get borrowed books history

### User Management Endpoints

- GET /api/users - Get all users (Admin only)
- POST /api/users - Create a user (Admin only)
- PUT /api/users/:id - Update a user (Admin only)
- DELETE /api/users/:id - Delete a user (Admin only)

## Role-Based Access

1. Admin

   - Full access to all endpoints
   - Can manage users and books
   - Can view all records

2. Librarian

   - Can view all books
   - Can record borrowing/returning of books
   - Limited access to user management

3. Member
   - Can view available books
   - Can borrow/return books
   - Can view own borrowing history

## Author

Akash Sharma
