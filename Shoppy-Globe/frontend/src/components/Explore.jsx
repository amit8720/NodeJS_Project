import React, { useState, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/cart/cartActions';
import useFetchProducts from '../hooks/useFetchProducts';
import backgroundImage from '../assets/tt.jpg';
import './Explore.css';

const ProductItem = lazy(() => import('./ProductItem'));

const categories = [
    { name: 'Beauty', image: 'https://img.freepik.com/free-photo/view-arrangement-with-make-up-brushes-eyeshadows_23-2148301855.jpg?ga=GA1.1.918818175.1715698361' },
    { name: 'Fragrances', image: 'https://img.freepik.com/free-photo/dreamy-aesthetic-cosmetic-product-with-fresh-background_23-2151382785.jpg?ga=GA1.1.918818175.1715698361&semt=ais_hybrid' },
    { name: 'Groceries', image: 'https://img.freepik.com/free-photo/3d-rendering-cartoon-shopping-cart_23-2151680638.jpg?ga=GA1.1.918818175.1715698361&semt=ais_hybrid' },
    { name: 'Furniture', image: 'https://img.freepik.com/free-vector/sweet-home-illustration_1284-44343.jpg?ga=GA1.1.918818175.1715698361&semt=ais_hybrid' },
];

const Explore = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, error: productsError } = useFetchProducts();
    const cartItems = useSelector((state) => state.cart.items);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));

        alert(`${product.title} has been added to the cart!`);
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    // Filter products based on the search term
    const filteredProducts = products.filter((product) => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return (
            product.title.toLowerCase().includes(lowercasedSearchTerm) ||
            product.category.toLowerCase().includes(lowercasedSearchTerm)
        );
    });

    if (productsError) return <div>{productsError}</div>;

    return (
        <div className="explore" style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '20px',
            position: 'relative',
        }}>
            <h1 className="explore-title">Explore Our Products</h1>

            {/* Categories Section */}
            <div className="categories-container">
                <h2 className="categories-title">Categories</h2>
                <div className="categories-grid">
                    {categories.map(({ name, image }) => (
                        <div className="category-card" key={name}>
                            <img src={image} alt={name} className="category-image" />
                            <h3 className="category-name">{name}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Products Section */}
            <div className="products-container">
                <h2 className="products-title">Products</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by product title or category"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="products-grid">
                    {/* If the search field is empty, do not show "No results found" */}
                    {searchTerm && filteredProducts.length === 0 ? (
                        <div className="no-results">No results found</div>
                    ) : (
                        filteredProducts.map((product) => (
                            <Suspense fallback={<div className="loading-placeholder">Loading...</div>} key={product.id}>
                                <ProductItem
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                    onProductClick={handleProductClick}
                                    // isInCart={false}
                                    isInCart={!!cartItems?.data?.items?.find(item => item.productId === product._id)}
                                />
                            </Suspense>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Explore;
