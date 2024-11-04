import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Navigate,useNavigate,useParams} from 'react-router-dom';
import ErrorMessage from '../../ErrorMessage';
import { useAuth } from '../../AuthContext';
export default function EditProduct() {
    const { id} = useParams();
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState('345h-78hj-i89u-iouy6');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    async function fetchData() {
        try {
          const env_url = process.env.REACT_APP_API_URL;
      const apiUrl =`${env_url}/products/${id}`;
            //const apiUrl = 'http://localhost:3003/products/'+id;
            const response = await axios.get(apiUrl, {}, {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
              },
            });
            console.log('Success:', response.data);
            setProductName(response.data.product_name)
            setDescription(response.data.description)
            
            
          } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message)
          }
      }
    useEffect(() =>{
        fetchData()
    },[]);
   const handleSubmit= async(e)=>{
    e.preventDefault();
    const env_url = process.env.REACT_APP_API_URL;
    const apiUrl =`${env_url}/products/${id}`;
    
    const userData = {
      product_name:productName,
      description: description,
    };
  
    try {
      const response = await axios.patch(apiUrl, userData, {
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

    
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
    <ErrorMessage error={error}/>
  </form>
  
      </div>
    )
  }
  