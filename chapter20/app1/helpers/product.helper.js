/**
 * Helper functions for product.
 */


// prouct model
const product = require('../models/product.model');

/**
 * Find the last inserted product. 
 * @returns The last inserted product.
 */
async function findLastInsertedProduct(){
  console.log('Find last inserted product');

  try {
    const result = await product.find({}).sort({_id: -1}).limit(1);
    return result[0];
  } catch (err) {
    console.log("Problem in finding product", err)
    return false
  }
}

module.exports = { findLastInsertedProduct }