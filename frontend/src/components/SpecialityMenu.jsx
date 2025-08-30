
import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center mt-8 sm:mt-10 gap-4 sm:gap-6 px-4">
      {/* Heading */}
      <p className="text-xl sm:text-2xl md:text-3xl font-bold">Find By Speciality</p>
      <p className="text-sm sm:text-base text-gray-600 max-w-xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br className="hidden sm:block" /> 
        Impedit atque quam deleniti nihil ut libero.
      </p>

      {/* Speciality Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-10 mt-8 sm:mt-10 w-full max-w-6xl" id="speciality">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            to={`/doctors/${item.speciality}`}
            key={index}
            className="flex flex-col items-center cursor-pointer hover:-translate-y-2 transition-all duration-300"
          >
            <img className="w-14 sm:w-16 md:w-20 mb-2" src={item.image} alt={item.speciality} />
            <p className="text-sm sm:text-base font-medium">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
