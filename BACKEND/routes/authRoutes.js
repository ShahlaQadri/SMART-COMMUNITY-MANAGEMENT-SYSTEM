import express from 'express';
import { signup, login } from '../controllers/authController.js'; // Adjust path if needed

const router = express.Router();

// Debugging: Log when the signup route is hit
router.post('/signup', (req, res, next) => {
  console.log('Signup route hit');
  next();
}, signup);

// Debugging: Log when the login route is hit
router.post('/login', (req, res, next) => {
  console.log('Login route hit');
  next();
}, login);

export default router;
