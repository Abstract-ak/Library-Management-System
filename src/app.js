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

const bookRoutes = require("./routes/book.routes");

const userRoutes = require("./routes/user.routes");

const borrowRoutes = require("./routes/borrow.routes");

// Use routes one by one to identify the problematic route
try {
  app.use("/api/auth", authRoutes);

  app.use("/api/books", bookRoutes);

  app.use("/api/users", userRoutes);

  app.use("/api/borrow", borrowRoutes);
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
