// server.js

const express = require('express');
const httpProxy = require('http-proxy');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const proxy = httpProxy.createProxyServer();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized if no token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

app.use('/api/clients', authenticateToken, (req, res) => {
    proxy.web(req, res, { target: 'http://client-service:3002' });
  });
  
  app.use('/api/coffees', authenticateToken, (req, res) => {
    proxy.web(req, res, { target: 'http://coffee-service:3003' });
  });
  
  app.use('/api/orders', authenticateToken, (req, res) => {
    proxy.web(req, res, { target: 'http://order-service:3004' });
  });

app.listen(process.env.PORT, () => console.log(`API Gateway is running on port ${process.env.PORT}`));
