import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { HiMenu, HiX } from 'react-icons/hi';

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!atoken) return null;

  const menuItems = [
    { name: 'Dashboard', icon: assets.home_icon, path: '/admin-dashboard' },
    { name: 'All Appointments', icon: assets.appointment_icon, path: '/all-appointments' },
    { name: 'Add Doctor', icon: assets.add_icon, path: '/add-doctor' },
    { name: 'Doctor List', icon: assets.people_icon, path: '/doctor-list' },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="sm:hidden flex justify-between items-center bg-white shadow-md px-4 py-3">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700 focus:outline-none">
          {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden sm:flex sm:flex-col sm:w-64 sm:min-h-screen sm:bg-white sm:border-r sm:p-4 sm:shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 transition"
              >
                <img src={item.icon} alt={item.name} className="w-6 h-6" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Sidebar Menu */}
      {mobileOpen && (
        <div className="sm:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h2>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)} // close menu on click
                  className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 transition"
                >
                  <img src={item.icon} alt={item.name} className="w-6 h-6" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
