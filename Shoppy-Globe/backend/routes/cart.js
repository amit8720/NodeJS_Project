const express = require('express');
const Cart = require('../models/Cart');
const { authenticateToken } = require('../middleware/authenticate');  // Correctly import the middleware
const Product = require('../models/Product');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({userId});

    let cartData = cart;

    let cartDataList = [];

    if(cartData!=null){
      for(const elementIndex in cartData.items){
        const productId = cartData.items[elementIndex].productId;
        const productData = await Product.findOne({_id: productId});
        cartDataList.push({product: productData, cart: cartData.items[elementIndex]});
      }
    }

    res.json({data: cartData, cart: cartDataList});
  } catch (err) {
    
    const userId = req.user.id;
    res.status(500).json({ error: 'Failed to fetch products', em: err, userId: userId});
  }
});

router.get('/place', authenticateToken, async (req, res)=>{
  try{
    const userId = req.user.id;
    await Cart.deleteMany({userId: userId});
    res.status(200).json({"status" : "Success"});
  }catch(e){
    res.status(501).json({"status" : "Failed"});
  }
})

// POST /cart - Add a product to cart
router.post('/', authenticateToken, async (req, res) => {  // Use authenticateToken as middleware
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;  // Access user info from decoded JWT

    // Find the user's cart, or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      // If product exists, update the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // If product doesn't exist, add it to the cart
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// PUT /cart - Update the quantity of a product in the cart
router.put('/', authenticateToken, async (req, res) => {  // Use authenticateToken as middleware
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;  // Access user info from decoded JWT

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found', userId: userId});
    }

    // Find the product in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart', cart: cart, productId: productId });
    }

    // Update the quantity of the product
    cart.items[itemIndex].quantity = quantity;

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// DELETE /cart - Remove a product from the cart
router.delete('/', authenticateToken, async (req, res) => {  // Use authenticateToken as middleware
  try {
    const { productId } = req.body;
    const userId = req.user.id;  // Access user info from decoded JWT

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the product in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    // Remove the product from the cart
    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

module.exports = router;
