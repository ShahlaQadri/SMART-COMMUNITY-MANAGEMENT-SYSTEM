import express from 'express';
import { signup, login } from '../controllers/authController.js'; 
import { authenticate } from '../middleware/authMiddleware.js'; 
import { authorizeRole } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Route for signup (no authentication required)
router.post('/signup', signup);

// Route for login (no authentication required)
router.post('/login', login);


router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({
    message: 'This is a protected route!',
    user: req.user, // Optionally return user details to confirm authentication
  });
});

//protected route for admins only
router.get('/admin-only', authenticate, authorizeRole('admin'), (req, res) => {
  res.status(200).json({
    message: 'Welcome Admin!',
    user: req.user, // Optionally return user details to confirm authentication
  });
});

export default router;
