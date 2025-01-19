const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const User = require('../models/User');

// User Registration
exports.register = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name,email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      console.log(req.body);
      if (!name || name.trim() === '') {
        return res.status(400).json({ message: 'Name cannot be null or empty' });
      }

      // Hash password and save user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];

// User Login
exports.login = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').exists().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h', });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];



// Controller function to handle the /dashboard request
exports.getDashboardUsers = async (req, res) => {
  try {
    // Fetch all users and select only the name field
    const users = await User.find({}); // Retrieves only the `name` field
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    });
  }
};

// GET request to fetch user details and their projects
exports.getProfile = async (req, res) => {
  try {
    const { id} = req.body;
    console.log(req.body);
    const user = await User.findById(id); // Assuming user is authenticated and their ID is in req.user.id

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details along with their projects
    res.status(200).json({
      name: user.name,
      email: user.email,
      projects: user.Project
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST request to add a new project
exports.addProject = [
  // Add validation checks for required fields
 
  body('title').notEmpty().withMessage('Project title is required'),
  body('description').notEmpty().withMessage('Project description is required'),
  body('gitRepoLink').isURL().withMessage('GitHub repo link must be a valid URL'),
  body('videoLink').isURL().withMessage('Video link must be a valid URL'),
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id,title, description, gitRepoLink, videoLink } = req.body;

    try {
      const user = await User.findById(id); // Assuming user is authenticated

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Add the new project to the user's Project array
      user.Project.push({
        title,
        description,
        gitRepoLink,
        videoLink
      });

      // Save the updated user document
      await user.save();

      res.status(201).json({ message: 'Project added successfully', project: { title, description, gitRepoLink, videoLink } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];