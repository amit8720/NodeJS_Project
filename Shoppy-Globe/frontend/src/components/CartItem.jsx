
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cart/cartActions';
import CircularProgress from '@mui/material/CircularProgress';
import './CartItem.css';

const CartItem = ({ item, checkout }) => {
    const [isLoading, setIsLoading] = useState(true); // Track image loading state
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeFromCart(item.cart.productId)); // Remove item from cart
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) {
            alert("Quantity cannot be less than 1.");
            return; // Prevent quantity from going below 1
        }
        dispatch(updateQuantity(item.cart.productId, newQuantity)); // Update the quantity
    };

    const handleImageLoad = () => {
        setIsLoading(false); // Set loading to false when the image is loaded
    };

    const handleImageError = () => {
        setIsLoading(false); // Set loading to false if the image fails to load
    };

    return (
        <div className="cart-item">
            <div className="cart-item-image-wrapper" style={{ position: 'relative' }}>
                {isLoading && (
                    <div className="image-loading-placeholder" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10
                    }}>
                        <CircularProgress /> {/* Circular Progress Spinner */}
                    </div>
                )}
                <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="cart-item-image"
                    onLoad={handleImageLoad} // Trigger when the image is loaded
                    onError={handleImageError} // Trigger if the image fails to load
                    loading="lazy" // Lazy load the image
                />
            </div>
            <div className="cart-item-details">
                <h3 className="cart-item-title">{item.product.title}</h3>
                <p className="cart-item-price">Price: ${item.product.price}</p>
                <div className="quantity-controls">
                    <button className="quantity-btn" onClick={() => handleQuantityChange((item.cart.quantity || 1) - 1)}>-</button>
                    <span className='quanty'>{item.cart.quantity || 1}</span> {/* Default to 1 if undefined */}
                    <button className="quantity-btn" onClick={() => handleQuantityChange((item.cart.quantity || 1) + 1)}>+</button>
                </div>
            </div>

            {checkout ? (
                <button className="placed-btn" style={{ backgroundColor: 'green', color: 'white' }}>
                    Placed
                </button>
            ) : (
                <button className="remove-btn" onClick={handleRemove}>Remove</button>
            )}
        </div>
    );
};

export default CartItem;
