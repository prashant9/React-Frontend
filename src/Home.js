// Dashboard.js
import React from 'react';
import { useAuth } from './AuthContext';

const Home = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <h2>Welcome Back!</h2>
                    <button onClick={logout}>Log Out</button>
                </div>
            ) : (
                <h2>Please log in to continue.</h2>
            )}
        </div>
    );
};

export default Home;
