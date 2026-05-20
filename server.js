const express = require('express');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/basic-login-system';
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Essential built-in parsing middleware 
app.use(express.json());

// Mount the modular user routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
