const express = require('express');
const { register, login,getDashboardUsers ,getProfile,addProject} = require('../controllers/authController');
const router = express.Router();

// Routes for user registration and login
router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', getDashboardUsers);
router.get('/profile', getProfile);

// POST request to add a new project
router.post('/profile', addProject);


module.exports = router;
