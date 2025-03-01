const User = require("./user.model");
const Book = require("./book.model");
const BorrowedBook = require("./borrowedBook.model");
const sequelize = require("../config/database");

// Export models
module.exports = {
  User,
  Book,
  BorrowedBook,
  sequelize,
};
