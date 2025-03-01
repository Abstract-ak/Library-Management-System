const { User } = require("../models");
const { generateToken } = require("../utils/jwt.utils");
const { sendWelcomeEmail } = require("../utils/email.utils");

const generatePassword = (user) => {
  // Generate password based on name, email and phone
  const namePart = user.name.substring(0, 3).toUpperCase();
  const emailPart = user.email.split("@")[0].substring(0, 3);
  const phonePart = user.phone.substring(user.phone.length - 4);
  return `${namePart}${emailPart}${phonePart}`;
};

const register = async (req, res) => {
  try {
    const { name, email, phone, role = "member" } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists",
      });
    }

    // Generate password
    const password = generatePassword({ name, email, phone });

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      role,
      password,
      isActive: role === "member" ? false : true, // Admins and librarians are active by default
    });

    // Send welcome email with credentials
    await sendWelcomeEmail(user, password);

    res.status(201).json({
      status: "success",
      message:
        "User registered successfully. Please check your email for credentials.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      status: "error",
      message: "Error registering user",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        status: "error",
        message: "Account is not active. Please wait for admin approval.",
      });
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      status: "success",
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "Error during login",
    });
  }
};

module.exports = {
  register,
  login,
};
