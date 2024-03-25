/**
 * The product controller.
 */

// The product model.
const Product = require("../models/product.model");
// The logger.
const logger = require("../logger/logger");

/**
 * Finding all products
 * @param {*} req The request of all products
 * @param {*} res The result of all products
 */
exports.findAll = async(req, res) =>{
    console.log("Find all products");

    try {
        const result = await Product.find();
        res.status(200).json({data:result});
        logger.debug("Sucess in reading all products");
        logger.info("Success in reading all products");
    } catch (err) {
        console.log(`Problem in reading all products, ${err} `);
        logger.error(`Problem in reading all products ${err}`);
    }
}

/**
 * Finding a specific product
 * @param {*} req   the requested product.
 * @param {*} res   The result of the requested product.
 */
exports.findOne = async(req, res) =>{
    console.log("Find one specific product");
    const product = req.params.product;

    try {
        const result = await Product.findOne({product: product});
        res.status(200).json({data:result});
    } catch (err) {
        console.log(`Problem in reading a specific product ${err}`);
        logger.error(`Problem in reading a specific product ${err}`)
    }
}

/**
 * Creating a new product.
 * @param {*} req   Request with all values of the new product.
 * @param {*} res   Response 200 and the result after succesfull creation.
 */
exports.create = async(req, res) =>{
    console.log("Insert a product");

    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    });

    try {
        const result = await newProduct.save();
        res.status(200).json({data: result});
        console.log("New product saved");
        logger.info("New product saved");
    } catch (err) {
        res.status(400).json({data: err});
        console.log("Problem in saving product", err);
    }
}

/**
 * Updating a product.
 * @param {*} req  The request with all values of the new product.
 * @param {*} res  Response 200 and the result after succesfull updating
 */
exports.update = async(req, res) =>{
    const product = req.params.product;

    console.log("Update product with product name:", product);

    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }

    try {
        const result = await Product.findOneAndUpdate({product: product}, updateProduct, {new: true});
        res.status(200).json({data: result});
        console.log("Successfully updated product with product name : ", product);
    } catch(err) {
        res.status(400).json({data: err});
        console.log("Problem in updating product with product name: ", product);
    }

}

/**
 * Deleting a product.
 * @param {*} req  The request with the product to delete.
 * @param {*} res  Response 200 and the result after succesfull deletion.
 */
exports.delete = async(req, res) =>{
    const product = req.params.product;

    console.log("Delete product", product);

    try {
        const result = await Product.findOneAndDelete({product: product});
        res.status(200).json({data: result});
        console.log("Successfully deleted product: ", product);
    } catch(err) {
        res.status(400).json({data: err});
        console.log("Problem in deleting product: ", product);
    }
}