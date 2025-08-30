
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../pages/Appcontext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-10 bg-gray-50 mt-6">
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
          Top Doctors to Book
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Simply browse through our extensive list of trusted doctors
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 sm:p-4 flex flex-col items-center text-center cursor-pointer"
          >
            {/* Doctor Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover mb-3 sm:mb-4"
            />

            {/* Availability Badge */}
            <div className="mb-2 flex items-center justify-center gap-1 sm:gap-2">
              {item.available ? (
                <>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-green-500 text-[10px] sm:text-xs font-semibold bg-green-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                    Available
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="text-red-500 text-[10px] sm:text-xs font-semibold bg-red-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                    Unavailable
                  </span>
                </>
              )}
            </div>

            {/* Doctor Info */}
            <p className="text-sm sm:text-lg font-semibold text-gray-800">{item.name}</p>
            <p className="text-xs sm:text-sm text-gray-500">{item.speciality}</p>
          </div>
        ))}
      </div>

      {/* More Button */}
      <div className="text-center mt-8 sm:mt-10">
        <button
          onClick={() => {
            navigate('/doctors');
            scrollTo(0, 0);
          }}
          className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base"
        >
          More
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
