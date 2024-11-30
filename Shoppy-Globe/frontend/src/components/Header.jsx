
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/" className="logo-link">

                    <img
                        src="https://img.freepik.com/free-photo/shopping-cart-3d-render-icon_460848-6902.jpg?ga=GA1.1.918818175.1715698361&semt=ais_hybrid"
                        alt="Shopping Cart"
                        className="cart-icon"
                    />
                    Shoppy Globe
                </Link>
            </div>
            <nav className="header-nav">
                <Link to="/">Home</Link>
                <Link to="/explore">Explore</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/cart">Cart</Link>
            </nav>
        </header>
    );
};

export default Header;
