require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./authRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));

module.exports = app;
