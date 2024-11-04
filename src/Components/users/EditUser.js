import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Navigate,useNavigate,useParams} from 'react-router-dom';
import ErrorMessage from '../../ErrorMessage';
import { useAuth } from '../../AuthContext';
export default function EditUser() {
    const { id} = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function fetchData() {
    try {
      const env_url = process.env.REACT_APP_API_URL;
  const apiUrl =`${env_url}/users/${id}`;
        //const apiUrl = 'http://localhost:3003/products/'+id;
        const response = await axios.get(apiUrl, {}, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          },
        });
        console.log('Success:', response.data);
        setName(response.data.name)
        setEmail(response.data.email)
        setPhone(response.data.phone)
        
        
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data : error.message)
      }
  }
useEffect(() =>{
    fetchData()
},[]);
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const env_url = process.env.REACT_APP_API_URL;
      const apiUrl =`${env_url}/users/${id}`;
    const userData = {
        name:name,
        email: email,       
        phone:phone,
        deleted:0,
        type:"user"
    };
    if(password !=="")
    {
        userData.password = password;
    }
  
    try {
      const response = await axios.patch(apiUrl, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
      });
      console.log('Success:', response.data);      
      navigate('/users'); // Redirect to dashboard
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message)
    }
  }
  return (
    <div>
        

<form className="max-w-sm" onSubmit={handleSubmit}>
<div className="mb-5">
      <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
      <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={name}
              onChange={(e) => setName(e.target.value)}/>
    </div>
    <div className="mb-5">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={email}
              onChange={(e) => setEmail(e.target.value)}/>
    </div>

    <div className="mb-5">
      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={phone}
              onChange={(e) => setPhone(e.target.value)}/>
    </div>

    <div className="mb-5">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
      <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
    </div>
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  <ErrorMessage error={error}/>
</form>

    </div>
  )
}
