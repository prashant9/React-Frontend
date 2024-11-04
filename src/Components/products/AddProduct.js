import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Navigate,useNavigate} from 'react-router-dom';
import ErrorMessage from '../../ErrorMessage';
import { useAuth } from '../../AuthContext';
export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('345h-78hj-i89u-iouy6');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleSubmit = async (e) =>{
    
    console.log(user)
    e.preventDefault();
    const env_url = process.env.REACT_APP_API_URL;
      const apiUrl =`${env_url}/products`;
    //const apiUrl = 'http://localhost:3003/products/';
    const userData = {
      product_name:productName,
      description: description,
      file_id:userId,
      user_id:user._id,
      deleted:0
    };
  
    try {
      const response = await axios.post(apiUrl, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
      });
      console.log('Success:', response.data);      
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message)
    }
  }
  return (
    <div>
        

<form className="max-w-sm" onSubmit={handleSubmit}>
  <div className="mb-5">
    <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
    <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={productName}
            onChange={(e) => setProductName(e.target.value)}/>
  </div>
  <div className="mb-5">
    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={description}
            onChange={(e) => setDescription(e.target.value)}/>
  </div>
  <div className="mb-5">
  <div className="flex items-center justify-start w-full">
  <label className="flex flex-col items-center px-4 py-0 bg-blue-500 text-white shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-600">
    <span>Select a file</span>
    <input type="file" className="hidden" />
  </label>
</div>
</div>
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  <ErrorMessage error={error}/>
</form>

    </div>
  )
}
