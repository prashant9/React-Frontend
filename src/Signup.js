// src/LoginForm.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Navigate,useNavigate} from 'react-router-dom';
import { useAuth } from './AuthContext';
import ErrorMessage from './ErrorMessage'

const Signup = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
     
    // Basic client-side validation
    if(!validatePhoneNumber(phone)){
      setError({'message':'Invalid phone number'});
    }
    else if(name !=='' && email !=='' && phone !=='' && confirmPassword !== password)
    {
     
      setError({'message':'Password and Confirm password are mismatched'});
      
    }
else{
    
    const env_url = process.env.REACT_APP_API_URL;
      const apiUrl =`${env_url}/users`;
   
    const userData = {
      name:name,
      email:email,
      password: password,
      phone:phone,
      deleted:0,
      type:"users"
    };
  
    try {
      const response = await axios.post(apiUrl, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
      });
      console.log('Success:', response.data);
          
      navigate('/login'); // Redirect to dashboard
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
     
      setError(error.response ? error.response.data : error.message);
        
    }
  }
  };
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Signup</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Name <span className=' text-red-800 text-xs dark:bg-red-900 dark:text-red-300'>*</span>
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              value={name}
            onChange={(e) => setName(e.target.value)}
              />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email <span className=' text-red-800 text-xs dark:bg-red-900 dark:text-red-300'>*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              value={email}
            onChange={(e) => setEmail(e.target.value)}
              />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
              Phone <span className=' text-red-800 text-xs dark:bg-red-900 dark:text-red-300'>*</span>
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Ex. (122) 345-2345' autoComplete='off'/>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Confirm Password <span className=' text-red-800 text-xs dark:bg-red-900 dark:text-red-300'>*</span>
            </label>
            <input
              type="password"
              id="confirmpassword"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-200"
          >
            Signup
          </button>

          <ErrorMessage error={error}/>
        </form>
      </div>
    </div>
  );
}

export default Signup;
