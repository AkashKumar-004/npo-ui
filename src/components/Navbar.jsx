import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
       
          <div className="text-lg font-bold">
            <Link to="/" className="hover:text-gray-300">HOME</Link>
          </div>

          <div className="hidden md:flex space-x-8 font-bold text-xl">
            <Link to="/services" className='hover:text-gray-300'>Services</Link>
            <Link to="/admin" className="hover:text-gray-300">Admin</Link>
            <Link to="/donation" className="hover:text-gray-300">Donation</Link>
            <Link to="/about" className="hover:text-gray-300">About Us</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
