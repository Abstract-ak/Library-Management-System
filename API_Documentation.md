# Library Management System API Documentation

## Base URL

http://localhost:3000

## Sample Data Examples

### Users

1. Members:

   - Rajesh Kumar (rajesh.kumar@gmail.com)
   - Neha Gupta (neha.gupta@gmail.com)
   - Amit Patel (amit.patel@gmail.com)

2. Librarians:

   - Priya Sharma (priya.sharma@library.com)
   - Suresh Verma (suresh.verma@library.com)

3. Admin:
   - Anand Singh (anand.singh@library.com)

### Books

1. Indian Literature:

   - "Wings of Fire" by A.P.J. Abdul Kalam
   - "The Guide" by R.K. Narayan
   - "Train to Pakistan" by Khushwant Singh
   - "The God of Small Things" by Arundhati Roy

2. Academic Books:

   - "Indian Polity" by M. Laxmikanth
   - "Indian Economy" by Ramesh Singh
   - "Modern India" by Bipan Chandra

3. Popular Fiction:
   - "Half Girlfriend" by Chetan Bhagat
   - "The Immortals of Meluha" by Amish Tripathi
   - "2 States" by Chetan Bhagat

## API Endpoints

### 1. Authentication

#### Register User

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "Rajesh Kumar",
  "email": "rajesh.kumar@gmail.com",
  "phone": "+91-9876543210",
  "role": "member"
}
```

Response:

```json
{
  "status": "success",
  "message": "User registered successfully. Please check your email for credentials.",
  "data": {
    "id": 1,
    "name": "Rajesh Kumar",
    "email": "rajesh.kumar@gmail.com",
    "role": "member",
    "isActive": false
  }
}
```

### 2. Books Management

#### Add Book (Admin)

```http
POST /api/books
```

Request:

```json
{
  "title": "Wings of Fire",
  "author": "A.P.J. Abdul Kalam",
  "isbn": "978-8173711466",
  "quantity": 5,
  "category": "autobiography",
  "description": "Autobiography of former President of India",
  "publishedYear": 1999,
  "location": "Section A, Shelf 1"
}
```

#### Search Books

```http
GET /api/books?search=wings of fire&category=autobiography
```

Response:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "Wings of Fire",
      "author": "A.P.J. Abdul Kalam",
      "isbn": "978-8173711466",
      "quantity": 5,
      "availableQuantity": 3,
      "category": "autobiography",
      "description": "Autobiography of former President of India",
      "publishedYear": 1999,
      "location": "Section A, Shelf 1"
    }
  ]
}
```

### 3. Borrowing Operations

#### Borrow Book

```http
POST /api/borrow/borrow
```

Request:

```json
{
  "bookId": 1,
  "dueDate": "2024-03-28T00:00:00.000Z"
}
```

Response:

```json
{
  "status": "success",
  "message": "Book borrowed successfully",
  "data": {
    "id": 1,
    "bookId": 1,
    "userId": 1,
    "borrowDate": "2024-02-28T00:00:00.000Z",
    "dueDate": "2024-03-28T00:00:00.000Z",
    "status": "borrowed",
    "bookDetails": {
      "title": "Wings of Fire",
      "author": "A.P.J. Abdul Kalam"
    }
  }
}
```

### 4. User Management

#### Get All Users (Admin)

```http
GET /api/users
```

Response:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Rajesh Kumar",
      "email": "rajesh.kumar@gmail.com",
      "role": "member",
      "isActive": true
    },
    {
      "id": 2,
      "name": "Priya Sharma",
      "email": "priya.sharma@library.com",
      "role": "librarian",
      "isActive": true
    }
  ]
}
```

## Common Categories

1. Fiction

   - Indian Fiction
   - Contemporary Fiction
   - Classic Literature

2. Non-Fiction

   - Autobiography
   - History
   - Politics
   - Economics

3. Academic

   - Engineering
   - Medical
   - Civil Services
   - Management

4. Regional Literature
   - Hindi
   - Bengali
   - Tamil
   - Malayalam
