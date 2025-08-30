import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi'; // for hamburger menu

const Navbar = () => {
  const { atoken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (atoken) setAToken('');
    localStorage.removeItem('atoken');
    navigate('/');
  };

  return (
    <nav className="w-full bg-white shadow-md px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Left side: logo + role */}
      <div className="flex items-center space-x-3">
        <img src={assets.admin_logo} alt="Logo" className="h-10 w-auto" />
        <p className="text-lg sm:text-xl font-semibold text-gray-700">
          {atoken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      {/* Hamburger for mobile */}
      <div className="sm:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Desktop menu */}
      <div className="hidden sm:flex sm:items-center sm:space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-2 sm:hidden">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white w-3/4 text-center px-4 py-2 rounded-md hover:bg-red-700 transition my-1"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
