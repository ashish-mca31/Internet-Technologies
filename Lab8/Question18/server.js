require('dotenv').config();
const express       = require('express');
const cors          = require('cors');
const db            = require('./db');
const authRoutes    = require('./routes/auth');
const productRoutes = require('./routes/products');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth',     authRoutes);
app.use('/api/products', productRoutes);

// Test DB then start server
db.query('SELECT 1')
  .then(() => {
    console.log('MySQL connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MySQL connection failed:', err.message);
  });
