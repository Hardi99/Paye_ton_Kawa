// src/utils/metrics.js
const client = require('prom-client');

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'payetonkawa'
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Define a custom histogram metric
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500, 600, 800, 1000] // buckets for response time from 50ms to 1000ms
});

// Register the histogram
register.registerMetric(httpRequestDurationMicroseconds);

// Middleware to measure response time
const metricsMiddleware = (req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route ? req.route.path : '', code: res.statusCode });
  });
  next();
};

// Route to expose metrics
const metricsRoute = async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
};

module.exports = {
  metricsMiddleware,
  metricsRoute,
};
