// import React, { useState} from 'react';
// import { useContext } from 'react';
// import {AdminContext} from "../context/AdminContext"
// import axios from 'axios'
// import {toast} from 'react-toastify'
// const Login = () => {
//   const [state, setState] = useState('Admin');
//   const [email,setEmail]=useState('')
//   const [password,setPassword]=useState('')
// const {setAtoken,backendUrl}=useContext(AdminContext)

// const onSubmitHandler= async(event)=>{
//     event.preventDefault()
//     try {
//    if(state==='Admin'){
// const {data}= await axios.post(backendUrl+'/api/admin/login',{email,password},{ validateStatus: () => true } )
//    if(data.success){
//     // console.log(data.token)
//       toast.success("Login success");

//     localStorage.setItem('atoken',data.token)
//     setAtoken(data.token)
//    }else{
//     toast.error(data.message)
//    }
// }else{

// // mai isme doctor ke login ka logic likhunga


//    }
// } catch (error) {
    
  
// }
// }

//   return (
//     <div className="flex items-start justify-center min-h-[80vh] bg-gray-100 pt-20">
//       <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <div className="mb-6 text-center">
//           <p className="text-2xl font-semibold text-gray-700">
//             <span className="text-blue-600">{state}</span> Login
//           </p>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
//           <input
//           onChange={(e)=>setEmail(e.target.value)}
//           value={email}
//             type="email"
//             placeholder="Enter your email"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
//           <input
//             onChange={(e)=>setPassword(e.target.value)}
//           value={password}
//             type="password"
//             placeholder="Enter your password"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Login
//         </button>

//         <p className="mt-4 text-sm text-center text-gray-600">
//           {state === 'Admin' ? (
//             <>
//               Doctor Login?{' '}
//               <span
//                 onClick={() => setState('Doctor')}
//                 className="text-blue-600 hover:underline cursor-pointer font-medium"
//               >
//                 Click here
//               </span>
//             </>
//           ) : (
//             <>
//               Admin Login?{' '}
//               <span
//                 onClick={() => setState('Admin')}
//                 className="text-blue-600 hover:underline cursor-pointer font-medium"
//               >
//                 Click here
//               </span>
//             </>
//           )}
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { setAToken, backendUrl } = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('Admin');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${backendUrl}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('atoken', data.token); // Save token in localStorage
        setAToken(data.token);                      // Update context to re-render App
        toast.success("Login successful");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <p className="text-2xl font-semibold">
            <span className="text-blue-600">{state}</span> Login
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

