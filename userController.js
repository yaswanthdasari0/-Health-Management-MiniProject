// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Signup controller
const createUser = async (req, res) => {
  try {
    const { userId, email, name, password } = req.body;

    const existingUser = await User.findOne({ 
      $or: [{ userId }, { email }] 
    });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this userId or email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ userId, email, name, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
};

// Login controller
const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
};

module.exports = { createUser, loginUser };
