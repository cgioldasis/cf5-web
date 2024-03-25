/**
 * The user routes
 */

// Initilize express
const express = require('express');
// Initilize the router
const router = express.Router();
// The user controller
const userController = require('../controllers/user.controller');
// The routes
router.get('/', userController.findAll);
router.get('/:username', userController.findOne);
router.post('/', userController.create);
router.patch('/:username', userController.update);
router.delete('/:username', userController.delete);
// Export the router
module.exports = router;