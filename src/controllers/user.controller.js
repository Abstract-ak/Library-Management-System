const { User } = require("../models");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({
      status: "error",
      message: "Error retrieving users",
    });
  }
};

// Get a single user
const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({
      status: "error",
      message: "Error retrieving user",
    });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    await user.update(req.body);

    res.json({
      status: "success",
      message: "User updated successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: "error",
      message: "Error updating user",
    });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    await user.destroy();

    res.json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      status: "error",
      message: "Error deleting user",
    });
  }
};

// Activate a user
const activateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    await user.update({ isActive: true });

    res.json({
      status: "success",
      message: "User activated successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Error activating user:", error);
    res.status(500).json({
      status: "error",
      message: "Error activating user",
    });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  activateUser,
};
