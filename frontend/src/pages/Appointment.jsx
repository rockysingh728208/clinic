
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './Appcontext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, getDoctorsData, backendUrl, userData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();

  const fetchDocInfo = () => {
    const doc = doctors.find((doc) => doc._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlots = async () => {
    const slotsByDate = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotsByDate.push({
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
        day: daysofWeek[(today.getDay() + i) % 7],
        slots: timeSlots
      });
    }

    setDocSlots(slotsByDate);
  };

  const bookAppointment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      toast.warn('Please select a time slot');
      return;
    }

    try {
      const selectedDate = docSlots[slotIndex].date;
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      const slotDate = `${day}-${month}-${year}`;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime, userId: userData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return docInfo && (
    <div className="px-4 sm:px-6 lg:px-12 py-8">
      {/* Doctor Info */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col lg:flex-row gap-8">
       <div className="flex-shrink-0 w-full lg:w-1/3">
  <img
    src={docInfo.image}
    alt={docInfo.name}
    className="w-full max-h-80 object-contain rounded-2xl shadow-md bg-gray-50"
  />
</div>
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{docInfo.name}</h2>
            <img src={assets.verified_icon} alt="Verified" className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            {docInfo.degree} • {docInfo.speciality}
          </p>
          <span className="inline-block w-fit px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium">
            {docInfo.experience} Experience
          </span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-lg font-semibold text-gray-900">About</p>
              <img src={assets.info_icon} alt="Info" className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{docInfo.about}</p>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            Appointment Fee: <span className="text-blue-600">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="max-w-6xl mx-auto mt-10 bg-white p-6 md:p-10 rounded-2xl shadow-lg">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Choose a Date</h3>
        <div className="flex gap-3 overflow-x-auto pb-3 hide-scrollbar">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`flex flex-col items-center justify-center px-4 py-3 min-w-[72px] sm:min-w-[80px] rounded-xl cursor-pointer transition-all duration-200 ${
                slotIndex === index
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <p className="font-semibold text-xs sm:text-sm">{item.day}</p>
              <p className="text-[11px] sm:text-xs">{item.date.getDate()}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg sm:text-xl font-semibold mt-8 mb-4 text-gray-900">Choose a Time</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {docSlots[slotIndex]?.slots.map((slot, index) => {
            const selectedDate = docSlots[slotIndex].date;
            const slotDateStr = `${selectedDate.getDate()}-${selectedDate.getMonth()+1}-${selectedDate.getFullYear()}`;
            const isBooked = docInfo.slots_booked?.[slotDateStr]?.includes(slot.time);

            return (
              <div
                key={index}
                onClick={() => {
                  if (!isBooked) setSlotTime(slot.time);
                  else toast.warn('This slot is already booked');
                }}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-center text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                  slotTime === slot.time
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-800 hover:bg-indigo-50'
                } ${isBooked ? 'bg-red-600 text-white cursor-not-allowed opacity-70' : ''}`}
              >
                {slot.time}
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <button
            onClick={bookAppointment}
            className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 rounded-lg shadow-md"
          >
            Book an Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <div className="mt-12">
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    </div>
  );
};

export default Appointment;

