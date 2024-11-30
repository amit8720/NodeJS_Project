import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartActions';
import CircularProgress from '@mui/material/CircularProgress';
import './Explore.css';

const ProductItem = ({ product, onProductClick, isInCart }) => {
    const [isLoading, setIsLoading] = useState(true); // Track image loading state
    const dispatch = useDispatch();

    const handleImageLoad = () => {
        setIsLoading(false); // Set loading to false when the image is loaded
    };

    const handleImageError = () => {
        setIsLoading(false); // Set loading to false if the image fails to load
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        alert(`${product.title} has been added to the cart!`);
    };

    return (
        <div className="product-card">
            <Link to={`/products/${product._id}`} onClick={() => onProductClick(product._id)}>
                <div className="product-image-wrapper" style={{ position: 'relative' }}>
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
                        src={product.thumbnail}
                        alt={product.title}
                        className="product-image"
                        onLoad={handleImageLoad}  // When the image is loaded, trigger handleImageLoad
                        onError={handleImageError}  // If the image fails to load, trigger handleImageError
                        loading="lazy"  // Lazy load the image
                    />
                </div>
            </Link>
            <h3 className="product-name" onClick={() => onProductClick(product._id)} style={{ cursor: 'pointer' }}>
                {product.title}
            </h3>
            <div className="product-details">
                <span className="product-price">${product.price}</span>
                <span className="product-rating">{product.rating}</span>
            </div>
            <button
                className="add-to-cart-btn"
                style={{
                    backgroundColor: isInCart ? 'green' : '#3d246c',
                    color: 'white'
                }}
                onClick={handleAddToCart}
            >
                {isInCart ? 'Added' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default ProductItem;
