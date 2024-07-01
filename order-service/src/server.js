// server.js
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./orderRoutes');
const authenticateJWT = require('./middleware/authenticateJWT'); // Votre middleware d'authentification
const connectToMessageBroker = require('../utils/messageBroker'); // Mettez à jour ce chemin en fonction de l'emplacement réel de votre fichier messageBroker.js
const { metricsMiddleware } = require('../utils/metrics')

const app = express();

app.use(express.json());
app.use(metricsMiddleware)

mongoose.connect(process.env.ORDER_SERVICE_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
    setTimeout(() => { connectToMessageBroker }, 30000);
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use('/api', authenticateJWT, orderRoutes); // Protéger les routes orders avec le middleware d'authentification

module.exports = app;
