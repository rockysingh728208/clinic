import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors, changeAvailablity } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="w-full md:w-[90vw] mx-auto bg-gray-50 min-h-screen p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-600">
        All Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 sm:h-72 object-cover"
              />
              <div
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium ${
                  item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {item.available ? 'Available' : 'Unavailable'}
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 mb-3">{item.speciality}</p>

              <div className="flex items-center gap-2">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={() => changeAvailablity(item._id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                        item.available ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        item.available ? 'translate-x-5' : ''
                      }`}
                    ></div>
                  </div>
                  <span className="ml-3 text-gray-700 font-medium select-none">
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
