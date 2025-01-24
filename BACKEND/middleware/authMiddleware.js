import express from 'express';
import { signup, login } from '../controllers/authController.js'; // Adjust path if needed
import { authenticate } from '../middleware/authMiddleware.js'; // Add authentication middleware
import { authorizeRole } from '../middleware/checkRole.js'; // Add role-based authorization middleware

const router = express.Router();

// Route for signup (no authentication required)
router.post('/signup', signup);

// Route for login (no authentication required)
router.post('/login', login);

// Example of a protected route (for any authenticated user)
router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({
    message: 'This is a protected route!',
    user: req.user // Optionally return user details to confirm authentication
  });
});

// Example of a protected route for admins only
router.get('/admin-only', authenticate, authorizeRole('admin'), (req, res) => {
  res.status(200).json({
    message: 'Welcome Admin!',
    user: req.user // Optionally return user details to confirm authentication
  });
});

export default router;
