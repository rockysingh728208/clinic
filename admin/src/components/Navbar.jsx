import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const { atoken, setAToken } = useContext(AdminContext);
const navigate=useNavigate()
  const handleLogout = () => {
    navigate("/")
    atoken &&setAToken('')
   atoken && localStorage.removeItem('atoken');
  
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={assets.admin_logo} alt="Logo" className="h-10 w-auto" />
        <p className="text-lg font-semibold text-gray-700">
          {atoken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
