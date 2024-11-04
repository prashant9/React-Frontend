// src/Header.js
import React, { useState } from 'react';
import { FaTachometerAlt, FaUser, FaCog, FaSignOutAlt,FaEdit } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link,Navigate, useNavigate} from 'react-router-dom';
import { useAuth } from './AuthContext';
import Home from './Home';
import About from './About';
import Contact from './Contact';


function Header({loggedin}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const { logout,user } = useAuth();
console.log("****************")
  console.log(user)
  console.log("****************")
  const handleLogOut = (e)=>{
e.preventDefault();
logout(); // Call login function
        navigate('/login'); // Redirect to dashboard
  }

  return (
    <>
   
    <header className="bg-blue-600 shadow-lg">
      <div className="grid justify-items-end p-4">
        {/* Logo */}
        <div className="text-white text-1xl">Welcome, {user && user.name}</div>

       

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

        
    </header>
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-blue-950 text-white transition-width duration-300 ease-in-out ${
          isExpanded ? "w-64" : "w-20"
        } flex flex-col p-4 space-y-6 shadow-lg`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white bg-blue-700 p-2 rounded-md mb-4"
        >
          <svg
            className="w-6 h-6 transform transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isExpanded
                  ? "M20 12H4" // Arrow pointing left
                  : "M6 18L18 12L6 6" // Arrow pointing right
              }
            />
          </svg>
        </button>

        {/* Navigation Links */}
       
        <nav className="space-y-4">
          <Link to="/"
            className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700"
          >
            <FaTachometerAlt className="text-xl" />
            {isExpanded && <span>Products</span>}
          </Link>
          {user.type == 'admin' &&
            <Link to="/users"
              className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700"
            >
              <FaUser className="text-xl" />
              {isExpanded && <span>Users</span>}
            </Link>
          }
          <a
            href="#logout"
            className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700"
          onClick={handleLogOut}
          >
            <FaSignOutAlt className="text-xl" />
            {isExpanded && <span>Logout</span>}
          </a>
        </nav>
       
      </aside>
      

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        
       
        {loggedin}
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
       
      </main>
    </div>
    
    </>
  );
}

export default Header;
