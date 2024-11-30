const express = require('express');
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /register - Register user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body; // Assuming you're using 'username' here
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /login - User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Assuming you're using 'username'
  try {
    const user = await User.findOne({ username }); // Use 'username' for lookup
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
