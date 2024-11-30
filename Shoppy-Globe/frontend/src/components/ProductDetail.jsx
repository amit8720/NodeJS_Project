import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cart/cartActions';
import CircularProgress from '@mui/material/CircularProgress';
import './ProductDetail.css';


const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(true); // Track image loading state
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items); // Access cart items from Redux store

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/products/${id}`);
                if (!response.ok) throw new Error('Product not found');
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProduct();
    }, [id]);

    const isInCart = cartItems?.data?.items?.some(item => item.productId === product._id); // Check if the product is in the cart

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart(product)); // Dispatch action to add product to cart
        }
    };

    const handleImageLoad = () => {
        setIsImageLoading(false); // Set loading to false when image is loaded
    };

    const handleImageError = () => {
        setIsImageLoading(false); // Set loading to false if image fails to load
    };

    if (error) return <div>{error}</div>;
    if (!product) return <div>Loading...</div>;

    return (
        <div className="background-container">
            <div className="product-detail-container">
                {/* Product Image */}

                <div className="product-image" style={{ position: 'relative' }}>
                    {isImageLoading && (
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
                        src={product.thumbnail} // Assuming the API provides a thumbnail
                        alt={product.title}
                        loading="lazy" // Enable lazy loading for the image
                        onLoad={handleImageLoad}  // When the image is loaded, trigger handleImageLoad
                        onError={handleImageError}  // If the image fails to load, trigger handleImageError
                        style={{ display: isImageLoading ? 'none' : 'block' }} // Hide image while loading
                    />
                </div>

                {/* Product Details */}
                <div className="product-details">
                    <h1>{product.title}</h1>

                    {/* Display additional details */}
                    <p className="description">{product.description}</p>
                    <p className="category">Category: {product.category}</p>
                    <p className="discount">Discount: {product.discountPercentage}%</p>
                    <p className="price">Price: ${product.price}</p>
                    <p className="warranty">Warranty: {product.warrantyInformation}</p>
                    <p className="shipping">Shipping: {product.shippingInformation}</p>
                    <p className="availability">Availability: {product.availabilityStatus}</p>
                    <p className="return-policy">Return Policy: {product.returnPolicy}</p>
                    <p className="minimum-order">Minimum Order Quantity: {product.minimumOrderQuantity}</p>

                    {/* Rating */}
                    <div className="rating">
                        {Array.from({ length: 5 }, (_, index) => (
                            <span key={index} className={index < product.rating ? 'filled-star' : 'empty-star'}>
                                ★
                            </span>
                        ))}
                        <span className="rating-text">({product.rating})</span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        className="add-to-cart-button"
                        style={{ backgroundColor: isInCart ? 'green' : '#3d246c' }} // Change color based on cart status
                        onClick={isInCart ? null : handleAddToCart} // Disable if the item is already in the cart
                    >
                        {isInCart ? 'Added' : 'Add to Cart'} {/* Change button text based on cart state */}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Lazy load the ProductDetail component itself
const LazyProductDetail = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <ProductDetail />
    </Suspense>
);

export default LazyProductDetail;
