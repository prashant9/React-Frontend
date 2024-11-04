// Dashboard.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Products from './Products';

const Dashboard = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [isAuthenticated]);

    const data = [
        'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 
        'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 
        'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15'
      ];

    return (
        <div>
           <h1 className="text-3xl font-bold text-gray-700 mb-4">Products</h1>
            <Products data={data} itemsPerPage={5}/>
        </div>
    );
};

export default Dashboard;
