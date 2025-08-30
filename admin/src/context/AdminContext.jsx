import { useState } from "react";
import { createContext } from "react";
import axios from "axios"
import {toast} from "react-toastify"
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [atoken,setAToken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):"")
    const [doctors,setDoctors]=useState([])
    const backendUrl=import.meta.env.VITE_BACKEND_URL

const getAllDoctors = async () => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/admin/all-doctors",
      {},
      {
        headers: { atoken },
      }
    );

    if (data.success) {
      setDoctors(data.doctors);
      console.log(data.doctors);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};


const changeAvailablity=async(docId)=>{
  try {
    const {data}=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{atoken}})

if(data.success){
  toast.success(data.message)
  getAllDoctors()
}else{
  toast.error(error.message)
}

  } catch (error) {
    toast.error(error.message)
  }
}


  const value = {
   atoken,setAToken,backendUrl,doctors,getAllDoctors,changeAvailablity
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
