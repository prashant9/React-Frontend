// src/LoginForm.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Navigate,useNavigate,Link} from 'react-router-dom';
import ErrorMessage from '../../ErrorMessage';
import { useAuth } from '../../AuthContext';

function Login({ onLogin }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
     
    // Basic client-side validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    console.log(username+" " +password)
    const env_url = process.env.REACT_APP_API_URL;
      const apiUrl =`${env_url}/users/login`;
   
    const userData = {
      email:username,
      password: password,
    };
  
    try {
      const response = await axios.post(apiUrl, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
      });
      console.log('Success:', response.data);
      login(response.data); // Call login function
      
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message)
      
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the dashboard or home page
      return <Navigate to="/new-path" />;
    }
  }, [isAuthenticated]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email <span className=' text-red-800 text-xs dark:bg-red-900 dark:text-red-300'>*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              value={username}
            onChange={(e) => setUsername(e.target.value)}
              />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password <span className=' text-red-800 text-xs dark:bg-red-900 dark:text-red-300'>*</span>
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-200"
          >
            Login
          </button>
          <ErrorMessage error={error}/>
        

          <p className="text-sm text-center text-gray-500">
            Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
