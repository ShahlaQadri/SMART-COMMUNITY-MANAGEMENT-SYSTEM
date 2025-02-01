import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is missing in environment variables');
}

// Middleware to authenticate users
export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token,JWT_SECRET ); // ✅ Ensure same secret
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token', error: err.message });
  }
};

// Middleware to authorize users based on role
export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied. You do not have permission.' });
    }
    next();
  };
};
