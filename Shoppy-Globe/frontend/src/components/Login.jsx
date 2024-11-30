import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {

                const data = await response.json();
                localStorage.setItem('token', data.token);
                // Redirect to another page
                navigate(`/explore`);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert('Registration successful!');
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                setIsRegistering(false); // Switch back to login after successful registration
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div
            className="login-container"

        >
            <div className="hero-card">
                <div className="hero-content">
                    <div className="login-form-container">
                        <form
                            className="login-form"
                            onSubmit={isRegistering ? handleRegister : handleLogin}
                        >
                            <h2 className="login-title">
                                {isRegistering ? 'Register' : 'Login'}
                            </h2>

                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            {isRegistering && (
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </div>
                            )}
                            <button type="submit" className="login-button">
                                {isRegistering ? 'Register' : 'Login'}
                            </button>
                            {error && <p className="error-message">{error}</p>}
                            <p className="register-prompt">
                                {isRegistering
                                    ? 'Already have an account? '
                                    : "Don't have an account? "}
                                <span
                                    className="register-link"
                                    onClick={() => setIsRegistering(!isRegistering)}
                                >
                                    {isRegistering ? 'Login now' : 'Register now'}
                                </span>
                            </p>
                        </form>
                    </div>

                    <div className="hero-image">
                        <img
                            src="https://img.freepik.com/free-vector/social-media-stalking-invasion-online-privacy-cyberstalking-following-geotagging-guy-with-binoculars-looking-girls-social-profile-vector-isolated-concept-metaphor-illustration_335657-1283.jpg?t=st=1732969092~exp=1732972692~hmac=38b502bbb2e1c14d8755f68fef9d7ecb0dcc5c5c121491f47416ee7c82f99cbc&w=740"
                            alt="E-commerce services"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
