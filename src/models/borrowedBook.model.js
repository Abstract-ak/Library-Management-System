const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Book = require("./book.model");
const User = require("./user.model");

const BorrowedBook = sequelize.define("BorrowedBook", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: "id",
    },
  },
  borrowDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("borrowed", "returned", "overdue"),
    defaultValue: "borrowed",
  },
  fine: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
});

// Define associations
BorrowedBook.belongsTo(User, { foreignKey: "userId" });
BorrowedBook.belongsTo(Book, { foreignKey: "bookId" });
User.hasMany(BorrowedBook, { foreignKey: "userId" });
Book.hasMany(BorrowedBook, { foreignKey: "bookId" });

module.exports = BorrowedBook;
