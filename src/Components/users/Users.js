import React, { useState, useEffect,useCallback } from 'react';
import { FaEdit} from 'react-icons/fa';
import { MdDelete,MdBackspace   } from 'react-icons/md';
import { BsFillXCircleFill } from "react-icons/bs";
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '../../customDatePicker.css';

const DateRangePickerComponent = ({currentPage,itemsPerPage,onUpdate}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const clearDateRange = () => {
    setStartDate(null);
    setEndDate(null)
    console.log(startDate);
    console.log(endDate);
    onUpdate(currentPage,itemsPerPage,"","")
  };
  return (
    <div className=''>
    <DateRangePicker
      startDate={startDate}
      startDateId="start_date_id"
      endDate={endDate}
      endDateId="end_date_id"
      onDatesChange={({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
        onUpdate(currentPage,itemsPerPage,startDate,endDate)
        
      }}
      focusedInput={focusedInput}      
      onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      isOutsideRange={() => false}
    />
    
    <button type="button" onClick={clearDateRange} className='mr-3'> <MdBackspace   size={24} color="grey" /> </button>
    
    </div>
  );
};

const Modal = ({ isVisible, onClose,id }) => {
  const navigate = useNavigate();
  


  const deleteUser  = async(id) =>{
    //e.preventDefault();
    const env_url = process.env.REACT_APP_API_URL;
      const apiUrl =`${env_url}/users/${id}`;
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
      onClose()  
      navigate('/users'); // Redirect to dashboard
      
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
          onClick={() => deleteUser(id)}
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
const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      
      fetchData(startIdx,endIdx,startDate,endDate)
  };
  const navigate = useNavigate();
  const itemsPerPage = 5
  const data=[]
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [searchUser, setSearchUser] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setendDate] = useState('');
  
  const fetchData = async(startIdx,endIdx,startDate,endDate) =>{
    console.log(startDate+" : "+endDate)
    try {
      let concat_url=''
      if(startDate !=="" && endDate !=="")
      {
        concat_url = '&start='+formatTimestamp(startDate)+'&end='+formatTimestamp(endDate);
      }

      const env_url = process.env.REACT_APP_API_URL;
      //const apiUrl =`${env_url}/users/?deleted=0&page=${startIdx}&limit=5`;
      let apiUrl =`${env_url}/users/?page=${startIdx}&limit=5`+concat_url;
      if(searchUser !==''){
        apiUrl =`${env_url}/users/search?&page=${startIdx}&limit=5&keyword=${searchUser}`+concat_url;
      }
        const response = await axios.get(apiUrl, {}, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
          },
        });
        console.log('Success:', response.data);

        setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage))
        setUsersCount(response.data.totalCount)
        setUsersData(response.data.records)
        
        
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

  useEffect(() => {
    const startIdx = currentPage;
    const endIdx = startIdx + itemsPerPage;
    if(usersData && usersData.length>0)
    {
        setCurrentData(usersData.slice(startIdx, endIdx));
    }
    fetchData(startIdx,endIdx,startDate,endDate)
   
  }, [currentPage, itemsPerPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };


  const handleSearch = (event) =>{
    console.log(event.target.value);
    console.log('Key released:', event.key);
      setSearchUser(event.target.value.trim())

    
    
      const startIdx = currentPage;
      const endIdx = startIdx + itemsPerPage;
      setCurrentData(data.slice(startIdx, endIdx));
      
      fetchData(startIdx,endIdx,startDate,endDate)
     
    ;
  }


 
  return (
    <div>
        <h1 className="text-3xl font-bold text-gray-700 mb-4">Users</h1>
        <div className='bg-gray-100 flex justify-between mb-3'>
       <div>
    <div className="relative">
      <input 
        type="text" 
        placeholder="Search..." 
        onChange={(e) => setSearchUser(e.target.value)} 
        onKeyUp={handleSearch}
        className="w-full py-2 pl-2 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      
    </div>
    
    </div>
    <div className='flex justify-between'>
      <DateRangePickerComponent  currentPage = {currentPage} itemsPerPage={itemsPerPage} onUpdate={fetchData}/>
      <Link to='/users/add'><button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add User</button></Link>
    </div>
  </div>

        <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
        
        {usersData && usersData.map((item) => (
            <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left" >{item.name}</td>
          <td className="py-3 px-6 text-left" >{item.email}</td>
          <td className="py-3 px-6 text-left" >{item.phone}</td>
          <td className="py-3 px-6 text-left" >{item.deleted ==0?
          <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Active</span>:
          <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">InActive</span>}
          </td>
          <td className="py-3 px-6 text-center flex">
          <Link to ={`/users/edit/${item._id}`}>
          <FaEdit className="text-xl pointer" /></Link>
             <button onClick={() => openModal(item._id)}>
    <MdDelete size={24} color="black" /></button></td>
         
          </tr>
        ))}
        </tbody>
        </table>

      <div className="pagination flex justify-between">
        <div className='mt-2'>Total Records:{usersCount}</div>
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

export default Users;
