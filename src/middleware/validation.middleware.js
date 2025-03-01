const Joi = require("joi");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors,
      });
    }

    next();
  };
};

// User validation schemas
const userSchema = {
  register: Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email(),
    phone: Joi.string()
      .required()
      .pattern(/^\+?[\d\s-]+$/),
    role: Joi.string().valid("admin", "librarian", "member"),
  }),

  login: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),

  update: Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\+?[\d\s-]+$/),
    role: Joi.string().valid("admin", "librarian", "member"),
    isActive: Joi.boolean(),
  }),
};

// Book validation schemas
const bookSchema = {
  create: Joi.object({
    title: Joi.string().required().min(1).max(100),
    author: Joi.string().required().min(1).max(100),
    isbn: Joi.string()
      .required()
      .pattern(/^[\d-]+$/),
    quantity: Joi.number().integer().min(0).required(),
    category: Joi.string().required(),
    description: Joi.string().allow("", null),
    publishedYear: Joi.number()
      .integer()
      .min(1000)
      .max(new Date().getFullYear()),
    location: Joi.string().allow("", null),
  }),

  update: Joi.object({
    title: Joi.string().min(1).max(100),
    author: Joi.string().min(1).max(100),
    isbn: Joi.string().pattern(/^[\d-]+$/),
    quantity: Joi.number().integer().min(0),
    category: Joi.string(),
    description: Joi.string().allow("", null),
    publishedYear: Joi.number()
      .integer()
      .min(1000)
      .max(new Date().getFullYear()),
    location: Joi.string().allow("", null),
  }),
};

// Borrow validation schemas
const borrowSchema = {
  borrow: Joi.object({
    bookId: Joi.number().integer().required(),
    userId: Joi.number().integer().required(),
    dueDate: Joi.date().greater("now").required(),
  }),

  return: Joi.object({
    borrowId: Joi.number().integer().required(),
  }),
};

module.exports = {
  validate,
  userSchema,
  bookSchema,
  borrowSchema,
};
