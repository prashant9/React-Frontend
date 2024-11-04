// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Header from './Header';
import Login from './Components/users/Login'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Check local storage for authentication status on initial render
        return localStorage.getItem('isAuthenticated') === 'true';
    });
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Load user data from local storage if available
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);
    
     
    
    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true'); // Store in local storage
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); // Remove from local storage
        localStorage.removeItem('user');
    };

    

    useEffect(() => {
        // Optionally, you can listen for changes in local storage
        const handleStorageChange = () => {
            setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
            setUser(localStorage.getItem('user'))
        };

        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout,user }}>
          {isAuthenticated ? <Header  loggedin ={children} />:<>{children}</>}
            
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
