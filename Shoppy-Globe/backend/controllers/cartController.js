const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add product to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;  // Assuming JWT authentication is in place

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the cart exists for the user, otherwise create a new one
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      // Update the quantity if the item exists
      existingItem.quantity += quantity;
    } else {
      // Add the product to the cart
      cart.items.push({ productId, quantity });
    }

    // Calculate the total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      const product = cart.items.find(p => p.productId.toString() === item.productId.toString());
      return total + product.price * item.quantity;
    }, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update quantity of a product in the cart
const updateCartItem = async (req, res) => {
  const { cartItemId, quantity } = req.body;
  const userId = req.user.id;  // Assuming JWT authentication is in place

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart
    const item = cart.items.id(cartItemId);
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Update the quantity
    item.quantity = quantity;

    // Recalculate the total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      const product = cart.items.find(p => p.productId.toString() === item.productId.toString());
      return total + product.price * item.quantity;
    }, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  const { cartItemId } = req.body;
  const userId = req.user.id;  // Assuming JWT authentication is in place

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find and remove the item from the cart
    const itemIndex = cart.items.findIndex(item => item._id.toString() === cartItemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Remove the item
    cart.items.splice(itemIndex, 1);

    // Recalculate the total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      const product = cart.items.find(p => p.productId.toString() === item.productId.toString());
      return total + product.price * item.quantity;
    }, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cart details
const getCart = async (req, res) => {
  const userId = req.user.id;  // Assuming JWT authentication is in place

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
};
