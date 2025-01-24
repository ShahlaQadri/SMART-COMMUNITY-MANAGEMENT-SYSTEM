import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit with failure
  });

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Test route to check if the server is up and running
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test route works!' });
});

// Handle 404 Errors (Route not found)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
