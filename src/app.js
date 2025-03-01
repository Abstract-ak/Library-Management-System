require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require("./routes/auth.routes");
// console.log("Auth routes:", authRoutes);

const bookRoutes = require("./routes/book.routes");
// console.log("Book routes:", bookRoutes);

const userRoutes = require("./routes/user.routes");
// console.log("User routes:", userRoutes);

const borrowRoutes = require("./routes/borrow.routes");
// console.log("Borrow routes:", borrowRoutes);

// Use routes one by one to identify the problematic route
try {
  app.use("/api/auth", authRoutes);
  // console.log("Auth routes mounted successfully");

  app.use("/api/books", bookRoutes);
  console.log("Book routes mounted successfully");

  app.use("/api/users", userRoutes);
  // console.log("User routes mounted successfully");

  app.use("/api/borrow", borrowRoutes);
  // console.log("Borrow routes mounted successfully");
} catch (error) {
  console.error("Error mounting routes:", error);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
