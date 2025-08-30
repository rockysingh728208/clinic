import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);

  return (
    atoken && (
      <div className="w-64 min-h-screen bg-white border-r p-4 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin-dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 transition"
            >
              <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/all-appointments"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 transition"
            >
              <img src={assets.appointment_icon} alt="Appointments" className="w-6 h-6" />
              <span>All Appointments</span>
            </Link>
          </li>
          <li>
            <Link
              to="/add-doctor"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 transition"
            >
              <img src={assets.add_icon} alt="Add Doctor" className="w-6 h-6" />
              <span>Add Doctor</span>
            </Link>
          </li>
          <li>
            <Link
              to="/doctor-list"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-100 text-gray-700 transition"
            >
              <img src={assets.people_icon} alt="Doctor List" className="w-6 h-6" />
              <span>Doctor List</span>
            </Link>
          </li>
        </ul>
      </div>
    )
  );
};

export default Sidebar;
