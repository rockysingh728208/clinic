
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from './Appcontext';

const Doctors = () => {
  const { speciality } = useParams();
  const decodedSpeciality = speciality ? decodeURIComponent(speciality) : null;
  const { doctors = [] } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (decodedSpeciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === decodedSpeciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, decodedSpeciality]);

  const specialties = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist"
  ];

  return (
    <div className="px-4 sm:px-6 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-6">
        Browse Through Specialist Doctors
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-full lg:w-1/4">
          <div className="bg-white shadow p-4 rounded h-fit sticky top-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Filter by Speciality</h3>
            <div className="space-y-2 text-gray-600">
              {specialties.map(spec => (
                <button
                  key={spec}
                  onClick={() =>
                    navigate(
                      decodedSpeciality === spec ? "/doctors" : `/doctors/${encodeURIComponent(spec)}`
                    )
                  }
                  className={`w-full text-left p-2 rounded transition hover:bg-blue-50 ${
                    decodedSpeciality === spec ? 'bg-blue-100 text-blue-700 font-semibold' : ''
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="w-full lg:w-3/4">
          {/* Mobile filters as grid */}
          <div className="lg:hidden mb-6">
            <h3 className="text-base font-semibold mb-3 text-gray-700">Filter by Speciality</h3>
            <div className="grid grid-cols-2 gap-3">
              {specialties.map(spec => (
                <button
                  key={spec}
                  onClick={() =>
                    navigate(
                      decodedSpeciality === spec ? "/doctors" : `/doctors/${encodeURIComponent(spec)}`
                    )
                  }
                  className={`text-sm sm:text-base p-2 rounded border transition ${
                    decodedSpeciality === spec
                      ? 'bg-blue-100 text-blue-700 border-blue-400 font-semibold'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor cards grid */}
          {filterDoc.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No doctors found.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filterDoc.map(item => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  role="button"
                  className="bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transform transition p-4 flex flex-col items-center text-center cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover mb-3"
                  />

                  <div className="mb-2 flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      item.available ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                    }`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>

                  <p className="text-base md:text-lg font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm md:text-base text-gray-500">{item.speciality}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;


