const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the product
  description: { type: String, required: true }, // Detailed description of the product
  category: { type: String, required: true }, // Category of the product
  price: { type: Number, required: true }, // Price of the product
  discountPercentage: { type: Number, default: 0, min: 0, max: 100 }, // Discount percentage (optional, defaults to 0)
  rating: { type: Number, default: 0, min: 0, max: 5 }, // Rating (optional, defaults to 0)
  stock: { type: Number, required: true }, // Available stock count
  warrantyInformation: { type: String }, // Warranty information (optional)
  shippingInformation: { type: String }, // Shipping information (optional)
  availabilityStatus: { type: String, enum: ['In Stock', 'Out of Stock', 'Limited'], default: 'In Stock' }, // Product availability status
  returnPolicy: { type: String }, // Return policy information (optional)
  minimumOrderQuantity: { type: Number, default: 1, min: 1 }, // Minimum order quantity (defaults to 1)
  thumbnail: { type: String, required: true }, // URL for the product image
});

module.exports = mongoose.model('Product', ProductSchema);
