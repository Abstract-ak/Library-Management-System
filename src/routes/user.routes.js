const express = require("express");
const router = express.Router();

// Import controllers
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  activateUser,
} = require("../controllers/user.controller");

// Import middleware
const { authenticate, authorize } = require("../middleware/auth.middleware");
const { validate, userSchema } = require("../middleware/validation.middleware");

// Protect all routes
router.use(authenticate);
router.use(authorize("admin"));

// Define routes
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", validate(userSchema.update), updateUser);
router.delete("/:id", deleteUser);
router.patch("/:id/activate", activateUser);

module.exports = router;
