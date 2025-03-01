const { Book } = require("../models");
const { Op } = require("sequelize");

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const { search, category, available } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { author: { [Op.like]: `%${search}%` } },
        { isbn: { [Op.like]: `%${search}%` } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (available === "true") {
      where.availableQuantity = { [Op.gt]: 0 };
    }

    const books = await Book.findAll({ where });
    res.json({ status: "success", data: books });
  } catch (error) {
    console.error("Error getting books:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error retrieving books" });
  }
};

// Get a single book
const getBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ status: "error", message: "Book not found" });
    }
    res.json({ status: "success", data: book });
  } catch (error) {
    console.error("Error getting book:", error);
    res.status(500).json({ status: "error", message: "Error retrieving book" });
  }
};

// Create a new book
const createBook = async (req, res) => {
  try {
    const book = await Book.create({
      ...req.body,
      availableQuantity: req.body.quantity,
    });
    res.status(201).json({
      status: "success",
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ status: "error", message: "Error creating book" });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ status: "error", message: "Book not found" });
    }

    if (req.body.quantity) {
      const quantityDiff = req.body.quantity - book.quantity;
      req.body.availableQuantity = book.availableQuantity + quantityDiff;
    }

    await book.update(req.body);
    res.json({
      status: "success",
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ status: "error", message: "Error updating book" });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ status: "error", message: "Book not found" });
    }

    await book.destroy();
    res.json({
      status: "success",
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ status: "error", message: "Error deleting book" });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
