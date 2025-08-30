// import React, { useEffect, useContext } from 'react';
// import { AdminContext } from '../../context/AdminContext';

// const DoctorsList = () => {
//   const { doctors, atoken, getAllDoctors,changeAvailablity } = useContext(AdminContext);

//   useEffect(() => {
//     if (atoken) {
//       getAllDoctors();
//     }
//   }, [atoken]);

//   return (
//     <div className="w-[90vw] bg-gray-50 p-6">
//       <h1 className="text-3xl font-semibold text-center mb-8 text-blue-600">All Doctors</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {doctors.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-[300px] object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
//               <p className="text-gray-600 mb-2">{item.speciality}</p>
//               <div className="flex items-center gap-2 mt-4">
//                 <input
//                 onChange={()=>changeAvailablity(item._id)}
//                   type="checkbox"
//                   checked={item.available}
//                   readOnly
//                   className="w-4 h-4 text-green-600"
//                 />
//              <p>Available</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DoctorsList;



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
    <div className="w-[90vw] bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-blue-600">All Doctors</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.speciality}</p>

              <div className="flex items-center gap-2 mt-4">
                <input
                  onChange={() => changeAvailablity(item._id)}
                  type="checkbox"
                  checked={item.available}
                  readOnly
                  className="w-4 h-4"
                />
                {item.available ? (
                  <p className="text-green-600 font-medium">Available</p>
                ) : (
                  <p className="text-red-600 font-medium">Unavailable</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;

