import { useState,useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes,Route } from 'react-router-dom'
import AddDoctor from './pages/Admin/AddDoctor'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import DoctorsList from './pages/Admin/DoctorsList'
function App() {
  const {atoken}=useContext(AdminContext)

  return atoken ? (
<div>
  <ToastContainer/>
  <Navbar/>
  <div className='flex items-start'>
    <Sidebar/>
    <Routes>
<Route path='/' element={<></>}/>
<Route path='/admin-dashboard' element={<><Dashboard/></>}/>
<Route path='/all-appointments' element={<><AllAppointments/></>}/>
<Route path='/add-doctor' element={<><AddDoctor/></>}/>
<Route path='/doctor-list' element={<><DoctorsList/></>}/>

    </Routes>
  </div>
</div>
  ):(
    <>
      <Login/>
  <ToastContainer/>
    </>
  )
}

export default App
