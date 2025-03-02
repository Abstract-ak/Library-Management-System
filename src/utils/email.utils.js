const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send welcome email with credentials
const sendWelcomeEmail = async (user, password) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Welcome to Library Management System",
      html: `
        <h1>Welcome to Library Management System</h1>
        <p>Dear ${user.name},</p>
        <p>Your account has been created successfully. Here are your login credentials:</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>Please change your password after your first login.</p>
        <p>Your account is currently inactive. An administrator will review and activate your account soon.</p>
        <p>Best regards,<br>Library Management Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
    // Don't throw error as email sending failure shouldn't block registration
  }
};

// Send borrow confirmation email
const sendBorrowConfirmation = async (user, book, dueDate) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Book Borrowed Successfully",
      html: `
        <h1>Book Borrowed Confirmation</h1>
        <p>Dear ${user.name},</p>
        <p>You have successfully borrowed the following book:</p>
        <p><strong>Title:</strong> ${book.title}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Due Date:</strong> ${new Date(
          dueDate
        ).toLocaleDateString()}</p>
        <p>Please return the book by the due date to avoid any fines.</p>
        <p>Best regards,<br>Library Management Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Borrow confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending borrow confirmation email:", error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendBorrowConfirmation,
};
