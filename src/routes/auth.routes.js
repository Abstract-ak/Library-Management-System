const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const { validate, userSchema } = require("../middleware/validation.middleware");

router.post("/register", validate(userSchema.register), register);
router.post("/login", validate(userSchema.login), login);

module.exports = router;
