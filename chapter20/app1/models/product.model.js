/**
 * Product Model
 */

// Load mongoose
const mongoose = require('mongoose');
// Schema
const Schema = mongoose.Schema
// Define collection and schema for Product
// Load unique validator
const uniqueValidator = require('mongoose-unique-validator');

let productSchema = new Schema({
  product: { type: String, required: true },
  cost: {
     type: Number,
     min: 0,
     required: true,
    },
  description: { type: String, required: true},
  quantity: {
     type: Number,
     min: 0,
     required: true,}
}, {
  collection: 'products',
  timestamps: true
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);