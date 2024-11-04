// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Components/users/Login';
import Dashboard from './Components/products/Dashboard';
import AddProduct from './Components/products/AddProduct'
import EditProduct from './Components/products/EditProduct'
import Users from './Components/users/Users';
import AddUser from './Components/users/AddUser';
import EditUser from './Components/users/EditUser'
import Signup from './Signup';
import { AuthProvider } from './AuthContext'; // Assuming you have an Auth context

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Dashboard />} exact/>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/product/add" element={<AddProduct />} />
                    <Route path="/product/edit/:id" element={<EditProduct />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/add" element={<AddUser />} />
                    <Route path="/users/edit/:id" element={<EditUser />} />
                    
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
