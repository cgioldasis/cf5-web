/**
 * The product routes
 */

// Initilize express
const express = require("express");
// Initilize the router
const router = express.Router();
// The product controller
const productController = require("../controllers/product.controller");

// The routes
router.get("/", productController.findAll);
router.get("/:product", productController.findOne);
router.post("/", productController.create);
router.patch("/:product", productController.update);
router.delete("/:product", productController.delete);

module.exports = router;
