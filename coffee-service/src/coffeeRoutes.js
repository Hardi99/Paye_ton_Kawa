const express = require('express');
const router = express.Router();
const cafeController = require('./coffeeController');

router.post('/cafes', cafeController.createCoffee);
router.get('/cafes', cafeController.getCoffees);
router.get('/cafes/:id', cafeController.getCoffee);
router.put('/cafes/:id', cafeController.updateCoffee);
router.delete('/cafes/:id', cafeController.deleteCoffee);

module.exports = router;