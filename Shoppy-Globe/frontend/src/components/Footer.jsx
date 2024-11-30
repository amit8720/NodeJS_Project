import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    console.log("Footer component rendered");
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Shoppy Globe. All rights reserved.</p>
                <div className="footer-logo">
                    <Link to="/" className="logo-link">

                        <img
                            src="https://img.freepik.com/free-photo/shopping-cart-3d-render-icon_460848-6902.jpg?ga=GA1.1.918818175.1715698361&semt=ais_hybrid"
                            alt="Shopping Cart"
                            className="cart-icon"
                        />
                        Shoppy Globe
                    </Link>
                </div>
                <div className='linkks'>
                    <div className="follow-us">
                        <p>Follow us on:</p>
                        <div className="social-links">
                            <ul>
                                <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                                <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                                <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>

                            </ul>
                        </div>
                    </div>
                    <div className="explore-us">
                        <p>Explore Links:</p>
                        <div className="explore-links">
                            <ul>
                                <li><a href="/explore">Explore</a></li>
                                <li><a href="/cart">Cart</a></li>
                                <li><a href="/contact">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
