const express = require("express");
const router = express.Router();
const {
  borrowBook,
  returnBook,
  getBorrowedBooks,
} = require("../controllers/borrow.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  validate,
  borrowSchema,
} = require("../middleware/validation.middleware");

// All routes require authentication
router.use(authenticate);

// Member routes
router.post(
  "/borrow",
  authorize("member"),
  validate(borrowSchema.borrow),
  borrowBook
);
router.post(
  "/return",
  authorize("member"),
  validate(borrowSchema.return),
  returnBook
);
router.get("/history", getBorrowedBooks);

// Librarian routes
router.post(
  "/record-borrow",
  authorize("librarian", "admin"),
  validate(borrowSchema.borrow),
  borrowBook
);
router.post(
  "/record-return",
  authorize("librarian", "admin"),
  validate(borrowSchema.return),
  returnBook
);
router.get("/all", authorize("librarian", "admin"), getBorrowedBooks);

module.exports = router;
