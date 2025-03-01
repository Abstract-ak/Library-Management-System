const { BorrowedBook, Book, User } = require("../models");
const { sendBorrowConfirmation } = require("../utils/email.utils");

// Borrow a book
const borrowBook = async (req, res) => {
  try {
    const { bookId, userId, dueDate } = req.body;

    // Check if book exists and is available
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Book not found",
      });
    }

    if (book.availableQuantity <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Book is not available for borrowing",
      });
    }

    // Check if user exists and is active
    const user = await User.findByPk(userId);
    if (!user || !user.isActive) {
      return res.status(404).json({
        status: "error",
        message: "User not found or inactive",
      });
    }

    // Create borrow record
    const borrowedBook = await BorrowedBook.create({
      bookId,
      userId,
      dueDate,
      status: "borrowed",
    });

    // Update book available quantity
    await book.update({
      availableQuantity: book.availableQuantity - 1,
    });

    // Send confirmation email
    await sendBorrowConfirmation(user, book, dueDate);

    res.status(201).json({
      status: "success",
      message: "Book borrowed successfully",
      data: borrowedBook,
    });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({
      status: "error",
      message: "Error borrowing book",
    });
  }
};

// Return a book
const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    // Find borrow record
    const borrowedBook = await BorrowedBook.findByPk(borrowId, {
      include: [Book],
    });

    if (!borrowedBook) {
      return res.status(404).json({
        status: "error",
        message: "Borrow record not found",
      });
    }

    if (borrowedBook.status === "returned") {
      return res.status(400).json({
        status: "error",
        message: "Book already returned",
      });
    }

    // Calculate fine if overdue
    const fine =
      new Date() > borrowedBook.dueDate
        ? calculateFine(borrowedBook.dueDate)
        : 0;

    // Update borrow record
    await borrowedBook.update({
      returnDate: new Date(),
      status: "returned",
      fine,
    });

    // Update book available quantity
    await borrowedBook.Book.update({
      availableQuantity: borrowedBook.Book.availableQuantity + 1,
    });

    res.json({
      status: "success",
      message: "Book returned successfully",
      data: {
        borrowedBook,
        fine,
      },
    });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({
      status: "error",
      message: "Error returning book",
    });
  }
};

// Get borrowed books
const getBorrowedBooks = async (req, res) => {
  try {
    const where = {};

    // If user is a member, only show their books
    if (req.user.role === "member") {
      where.userId = req.user.id;
    }

    const borrowedBooks = await BorrowedBook.findAll({
      where,
      include: [
        {
          model: Book,
          attributes: ["title", "author", "isbn"],
        },
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });

    res.json({
      status: "success",
      data: borrowedBooks,
    });
  } catch (error) {
    console.error("Error getting borrowed books:", error);
    res.status(500).json({
      status: "error",
      message: "Error retrieving borrowed books",
    });
  }
};

// Helper function to calculate fine
const calculateFine = (dueDate) => {
  const daysOverdue = Math.floor(
    (new Date() - dueDate) / (1000 * 60 * 60 * 24)
  );
  const finePerDay = 1.0; // $1 per day
  return Math.max(0, daysOverdue * finePerDay);
};

module.exports = {
  borrowBook,
  returnBook,
  getBorrowedBooks,
};
