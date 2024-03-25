/**
 * The user products routes
 */

// Initialize express
const express = require('express');
// Initialize the router
const router = express.Router();
// The user product controller
const userProductController = require('../controllers/user.products.controller');
// The routes
router.get('/', userProductController.findAll);
router.get('/:username', userProductController.findOne);
router.post('/', userProductController.create);
router.patch('/:username', userProductController.update);
router.delete('/:username/products/:id', userProductController.delete);
// Export the router
module.exports = router;