import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Ensure this path points to your User model

const JWT_SECRET = 'your_jwt_secret'; // Replace with a strong, secure secret key

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Signup failed: Email already in use");
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password during signup:", hashedPassword);

    // Assign a default role 'user' to the new user
    const user = new User({
      username,
      email,
      password: hashedPassword, // Save the hashed password
      role: 'user', // Default role
    });

    // Save the new user to the database
    await user.save();
    console.log("User registered successfully:", user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login failed: User not found for email:", email);
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the entered password with the hashed password in the database
    console.log("Stored hashed password:", user.password);
    console.log("Entered password:", password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Login failed: Password comparison failed");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with user ID and role
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    console.log("Login successful for user:", user.email);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
