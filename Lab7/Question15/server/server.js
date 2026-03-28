require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const userRoutes = require('./routes/users');
const db         = require('./db');

const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Test DB connection then start server
db.query('SELECT 1')
  .then(() => {
    console.log('Connected to MySQL');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MySQL connection failed:', err.message);
    console.error('Make sure MySQL is running and your .env is correct.');
  });
