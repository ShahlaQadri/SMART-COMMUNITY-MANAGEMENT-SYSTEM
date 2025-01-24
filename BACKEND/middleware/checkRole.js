export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Ensure `req.user` exists and contains a role
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: 'Forbidden: User role not found' });
      }

      const userRole = req.user.role;

      // Check if the user's role is in the list of allowed roles
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden: You do not have the necessary role' });
      }

      next(); // Proceed if the user has an allowed role
    } catch (error) {
      console.error('Error in authorizeRole middleware:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
};
