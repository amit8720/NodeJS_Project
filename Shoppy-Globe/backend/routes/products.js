const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /products - Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /products/:id - Fetch product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /products - Add a new product
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      discountPercentage,
      rating,
      stock,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      returnPolicy,
      minimumOrderQuantity,
      thumbnail,
    } = req.body;

    // Validation: Check if required fields are provided
    if (
      !title ||
      !description ||
      !category ||
      !thumbnail ||
      price === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        error:
          'All required fields (title, description, category, price, stock, and thumbnail) must be provided',
      });
    }

    // Validation: Check for valid stock, price, discountPercentage, and rating
    if (
      isNaN(price) ||
      price < 0 ||
      isNaN(stock) ||
      stock < 0 ||
      (discountPercentage && (discountPercentage < 0 || discountPercentage > 100)) ||
      (rating && (rating < 0 || rating > 5))
    ) {
      return res.status(400).json({
        error: 'Invalid values for price, stock, discountPercentage, or rating',
      });
    }

    // Create a new product
    const newProduct = new Product({
      title,
      description,
      category,
      price,
      discountPercentage: discountPercentage || 0,
      rating: rating || 0,
      stock,
      warrantyInformation,
      shippingInformation,
      availabilityStatus: availabilityStatus || 'In Stock',
      returnPolicy,
      minimumOrderQuantity: minimumOrderQuantity || 1,
      thumbnail,
    });

    // Save the product to the database
    await newProduct.save();

    // Respond with the newly created product
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT /products/:id - Update an existing product
router.put('/:id', async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      discountPercentage,
      rating,
      stock,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      returnPolicy,
      minimumOrderQuantity,
      thumbnail,
    } = req.body;

    // Validation: Check if required fields are provided
    if (
      !title ||
      !description ||
      !category ||
      !thumbnail ||
      price === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        error:
          'All required fields (title, description, category, price, stock, and thumbnail) must be provided',
      });
    }

    // Validation: Check for valid stock, price, discountPercentage, and rating
    if (
      isNaN(price) ||
      price < 0 ||
      isNaN(stock) ||
      stock < 0 ||
      (discountPercentage && (discountPercentage < 0 || discountPercentage > 100)) ||
      (rating && (rating < 0 || rating > 5))
    ) {
      return res.status(400).json({
        error: 'Invalid values for price, stock, discountPercentage, or rating',
      });
    }

    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        price,
        discountPercentage,
        rating,
        stock,
        warrantyInformation,
        shippingInformation,
        availabilityStatus,
        returnPolicy,
        minimumOrderQuantity,
        thumbnail,
      },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /products/:id - Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({
      message: 'Product deleted successfully',
      product: deletedProduct,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
