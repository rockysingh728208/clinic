



// import React, { useContext, useState } from 'react';
// import { assets } from '../../assets/assets';
// import { AdminContext } from '../../context/AdminContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const AddDoctor = () => {
//   const [docImage, setDocImage] = useState(null);
//   const [name, setName] = useState('');
//   const [speciality, setSpeciality] = useState('General Physician');
//   const [email, setEmail] = useState('');
//   const [degree, setDegree] = useState('');
//   const [password, setPassword] = useState('');
//   const [address1, setAddress1] = useState('');
//   const [address2, setAddress2] = useState('');
//   const [experience, setExperience] = useState('1 Year');
//   const [fees, setFees] = useState('');
//   const [about, setAbout] = useState('');

//   const { backendUrl, atoken } = useContext(AdminContext);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!docImage) return toast.error("Please upload the doctor's image");

//     const formData = new FormData();
//     formData.append('image', docImage);
//     formData.append('name', name);
//     formData.append('speciality', speciality);
//     formData.append('email', email);
//     formData.append('degree', degree); // ✅ corrected key
//     formData.append('password', password);
//     formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
//     formData.append('experience', experience);
//     formData.append('fees', fees);
//     formData.append('about', about);

//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/admin/add-doctor`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${atoken}`,
//           },
//         }
//       );

//       if (data.success) {
//         toast.success(data.message || "Doctor added successfully!");

// setDocImage(false)
// setName('')
// setSpeciality('')
// setEmail('')
// setDegree('')
// setPassword('')
// setAddress1('')
// setAddress2('')
// setExperience('')
// setAbout('')
// setFees('')
        
//       } else {
//         toast.error(data.message || "Failed to add doctor.");
//       }
//     } catch (err) {
//       console.error("Submit Error:", err);
//       toast.error(err.response?.data?.message || "Something went wrong while adding doctor");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#f0f4f8] p-4">
//       <form onSubmit={onSubmitHandler} className="bg-white rounded-lg w-full max-w-5xl p-8">
//         <h2 className="text-3xl font-bold text-blue-700 mb-8">Add Doctor</h2>

//         <div className="grid grid-cols-3 gap-8">
//           {/* Upload */}
//           <div className="col-span-1 flex flex-col items-center">
//             <label htmlFor="doc-img" className="cursor-pointer">
//               <img
//                 src={docImage ? URL.createObjectURL(docImage) : assets.upload_area}
//                 alt="Upload"
//                 className="w-32 h-32 object-cover rounded-full border-2"
//               />
//             </label>
//             <input
//               type="file"
//               id="doc-img"
//               hidden
//               onChange={(e) => setDocImage(e.target.files[0])}
//             />
//             <p className="text-sm text-gray-500 text-center mt-3">
//               Upload doctor's <br /> profile picture
//             </p>
//           </div>

//           {/* Inputs */}
//           <div className="col-span-2 grid grid-cols-2 gap-6">
//             <Input label="Doctor Name" value={name} setValue={setName} placeholder="Dr. John Doe" />
//             <Select
//               label="Speciality"
//               value={speciality}
//               setValue={setSpeciality}
//               options={[
//                 "General Physician", "Gynecologist", "Dermatologist",
//                 "Pediatrician", "Neurologist", "Gastroenterologist"
//               ]}
//             />
//             <Input label="Email" value={email} setValue={setEmail} type="email" />
//             <Input label="Degree" value={degree} setValue={setDegree} placeholder="MBBS, MD" />
//             <Input label="Password" value={password} setValue={setPassword} type="password" />
//             <Input label="Address 1" value={address1} setValue={setAddress1} />
//             <Select
//               label="Experience"
//               value={experience}
//               setValue={setExperience}
//               options={[...Array(10).keys()].map(i => `${i + 1} Year`).concat("10+ Years")}
//             />
//             <Input label="Address 2" value={address2} setValue={setAddress2} />
//             <Input label="Fees (₹)" value={fees} setValue={setFees} type="number" />
//           </div>
//         </div>

//         {/* About */}
//         <div className="mt-8">
//           <label className="text-sm text-gray-600">About Me</label>
//           <textarea
//             value={about}
//             onChange={(e) => setAbout(e.target.value)}
//             rows={4}
//             placeholder="Write about your experience, education, and practice..."
//             className="w-full mt-1 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Submit */}
//         <div className="mt-8 text-right">
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
//           >
//             Add Doctor
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const Input = ({ label, value, setValue, type = "text", placeholder }) => (
//   <div>
//     <label className="text-sm text-gray-600">{label}</label>
//     <input
//       type={type}
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       placeholder={placeholder}
//       className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//     />
//   </div>
// );

// const Select = ({ label, value, setValue, options }) => (
//   <div>
//     <label className="text-sm text-gray-600">{label}</label>
//     <select
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//     >
//       {options.map((opt, i) => (
//         <option key={i} value={opt}>{opt}</option>
//       ))}
//     </select>
//   </div>
// );

// export default AddDoctor;


import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImage, setDocImage] = useState(null);
  const [name, setName] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [email, setEmail] = useState('');
  const [degree, setDegree] = useState('');
  const [password, setPassword] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');

  const { backendUrl, atoken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!docImage) return toast.error("Please upload the doctor's image");

    const formData = new FormData();
    formData.append('image', docImage);
    formData.append('name', name);
    formData.append('speciality', speciality);
    formData.append('email', email);
    formData.append('degree', degree);
    formData.append('password', password);
    formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
    formData.append('experience', experience);
    formData.append('fees', fees);
    formData.append('about', about);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${atoken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Doctor added successfully!");

        // Clear all fields after successful add
        setDocImage(null);
        setName('');
        setSpeciality('General Physician');
        setEmail('');
        setDegree('');
        setPassword('');
        setAddress1('');
        setAddress2('');
        setExperience('1 Year');
        setFees('');
        setAbout('');
      } else {
        toast.error(data.message || "Failed to add doctor.");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f4f8] p-4">
      <form onSubmit={onSubmitHandler} className="bg-white rounded-lg w-full max-w-5xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">Add Doctor</h2>

        <div className="grid grid-cols-3 gap-8">
          {/* Upload */}
          <div className="col-span-1 flex flex-col items-center">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img
                src={docImage ? URL.createObjectURL(docImage) : assets.upload_area}
                alt="Upload"
                className="w-32 h-32 object-cover rounded-full border-2"
              />
            </label>
            <input
              type="file"
              id="doc-img"
              hidden
              onChange={(e) => setDocImage(e.target.files[0])}
            />
            <p className="text-sm text-gray-500 text-center mt-3">
              Upload doctor's <br /> profile picture
            </p>
          </div>

          {/* Inputs */}
          <div className="col-span-2 grid grid-cols-2 gap-6">
            <Input label="Doctor Name" value={name} setValue={setName} placeholder="Dr. John Doe" />
            <Select
              label="Speciality"
              value={speciality}
              setValue={setSpeciality}
              options={[
                "General Physician", "Gynecologist", "Dermatologist",
                "Pediatrician", "Neurologist", "Gastroenterologist"
              ]}
            />
            <Input label="Email" value={email} setValue={setEmail} type="email" />
            <Input label="Degree" value={degree} setValue={setDegree} placeholder="MBBS, MD" />
            <Input label="Password" value={password} setValue={setPassword} type="password" />
            <Input label="Address 1" value={address1} setValue={setAddress1} />
            <Select
              label="Experience"
              value={experience}
              setValue={setExperience}
              options={[...Array(10).keys()].map(i => `${i + 1} Year`).concat("10+ Years")}
            />
            <Input label="Address 2" value={address2} setValue={setAddress2} />
            <Input label="Fees (₹)" value={fees} setValue={setFees} type="number" />
          </div>
        </div>

        {/* About */}
        <div className="mt-8">
          <label className="text-sm text-gray-600">About Me</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            placeholder="Write about your experience, education, and practice..."
            className="w-full mt-1 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit */}
        <div className="mt-8 text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, value, setValue, type = "text", placeholder }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

const Select = ({ label, value, setValue, options }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default AddDoctor;


