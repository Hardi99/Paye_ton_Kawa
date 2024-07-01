// middleware/authenticateJWT.js

const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        // Renvoie un message d'erreur détaillé si le token est invalide
        return res.status(403).json({ message: 'Accès refusé. Token invalide.' });
      }

      req.user = user;
      next();
    });
  } else {
    // Renvoie un message d'erreur si aucun token n'est fourni
    res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }
};

module.exports = authenticateJWT;
