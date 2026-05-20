const express = require('express');
const userRoutes = require('./routes/userRoutes');
const registerRouter = require('./api/users/register');
const loginRouter = require('./api/users/login');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/basic-login-system';
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message || err);
    process.exit(1);
  });

// Essential built-in parsing middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the modular user routes
app.use('/api/users', userRoutes);
app.use('/', registerRouter);
app.use('/', loginRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
