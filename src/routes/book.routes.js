const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const { validate, bookSchema } = require("../middleware/validation.middleware");

// Public routes
router.get("/", getAllBooks);
router.get("/:id", getBook);

// Protected routes
router.use(authenticate);

// Admin only routes
router.post("/", authorize("admin"), validate(bookSchema.create), createBook);
router.put("/:id", authorize("admin"), validate(bookSchema.update), updateBook);
router.delete("/:id", authorize("admin"), deleteBook);

module.exports = router;
