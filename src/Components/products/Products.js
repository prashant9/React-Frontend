import React, { useState, useEffect } from 'react';
import { FaEdit} from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const Modal = ({ isVisible, onClose,id }) => {
  const navigate = useNavigate();
  


  const deleteProduct  = async(id) =>{
    //e.preventDefault();
    const env_url = process.env.REACT_APP_API_URL;
      const apiUrl =`${env_url}/products/${id}`;
    //const apiUrl = 'http://localhost:3003/products/'+id;
    const userData = {
      deleted:1,
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
      onClose()
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  } 
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Delete User</h2>
        <p className="text-gray-600 mb-4">Are you sure?.</p>

        <div className='flex justify-between'>
        <button
          onClick={() => deleteProduct(id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>

        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
        </div>
      </div>
    </div>
  );
};

const Products = ({ data, itemsPerPage }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [productData, setProductData] = useState([]);
  const [searchProduct, setSearchProduct] = useState('');
  const [prodcutCount, setProductCount] = useState(0);
  
  async function fetchData(startIdx,endIdx) {
    try {
      const env_url = process.env.REACT_APP_API_URL;
      let apiUrl =`${env_url}/products/?deleted=0&page=${startIdx}&limit=5`;
      if(searchProduct !==''){
        apiUrl =`${env_url}/products/search?deleted=0&page=${startIdx}&limit=5&keyword=${searchProduct}`;
      }
    
                 
        const response = await axios.get(apiUrl, {}, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          },
        });
        console.log('Success:', response.data);

        setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage))
        setProductCount(response.data.totalCount)
        setProductData(response.data.records)
        
        
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
  }
  useEffect(() => {
    const startIdx = currentPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentData(data.slice(startIdx, endIdx));
    
    fetchData(startIdx,endIdx)
   
  }, [currentPage, data, itemsPerPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const [deleteId,setDeleteId] = useState('')
  const openModal = (val) => {
    setDeleteId(val);
    setIsModalOpen(true);

  };

  const closeModal = (e) => {
   
    setIsModalOpen(false);

    const startIdx = currentPage;
      const endIdx = startIdx + itemsPerPage;
      setCurrentData(data.slice(startIdx, endIdx));
      
      fetchData(startIdx,endIdx)
  };

  const handleSearch = (event) =>{
    console.log(event.target.value);
    console.log('Key released:', event.key);
      setSearchProduct(event.target.value.trim())

    
    
      const startIdx = currentPage;
      const endIdx = startIdx + itemsPerPage;
      setCurrentData(data.slice(startIdx, endIdx));
      
      fetchData(startIdx,endIdx)
     
    ;
  }

 

  return (
    <div>
        <div className='bg-gray-100 flex justify-between mb-3'>
       <div>
    <div className="relative">
      <input 
        type="text" 
        onChange={(e) => setSearchProduct(e.target.value)} 
        onKeyUp={handleSearch}
        placeholder="Search..." 
        className="w-full py-2 pl-2 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      
    </div>
    
    </div>
    <Link to='/product/add'><button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Product</button></Link>
  </div>

        <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">User</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
        
        {productData && productData.map((item) => (
            <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left" >{item.product_name}</td>
          <td className="py-3 px-6 text-left" >{item.description}</td>
          <td className="py-3 px-6 text-left" >{item.user_id.name}</td>
          <td className="py-3 px-6 text-center flex">
          <Link to ={`/product/edit/${item._id}`}>
          <FaEdit className="text-xl pointer" /></Link>
             <button onClick={() => openModal(item._id)}>
    <MdDelete size={24} color="black" /></button></td>
         
          </tr>
        ))}
        </tbody>
        </table>

      <div className="pagination flex justify-between">
        <div className='mt-2'>Total Records:{prodcutCount}</div>
        <div>
        <button 
          onClick={handlePrevious} 
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded m-2"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={handleNext} 
          disabled={currentPage === totalPages}
          className="bg-gray-300 px-4 py-2 rounded m-2"
        >
          Next
        </button>
        </div>
      </div>
      <Modal isVisible={isModalOpen} onClose={closeModal} id = {deleteId}  />
    </div>
  );
};

export default Products;
