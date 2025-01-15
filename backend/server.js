const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password', // Use your MySQL password here
  database: 'user_registration',
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Register User
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if email already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error hashing password' });
      }

      // Insert user data into database
      const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
      db.query(query, [firstName, lastName, email, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error inserting user' });
        }

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
});

// Forgot Password: Send email with reset link
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  // Check if email exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Create a link for the user to reset their password
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Click the link below to reset your password:\n${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset email sent' });
    });
  });
});

// Reset Password
app.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;

  // Verify the reset token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const { email } = decoded;

    // Hash new password
    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error hashing password' });
      }

      // Update password in database
      db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating password' });
        }
        res.status(200).json({ message: 'Password successfully reset' });
      });
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
