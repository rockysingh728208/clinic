
import validator from 'validator';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js';
// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long"
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already registered with this email"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(201).json({
      success: true,
      token,
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password"
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(200).json({
      success: true,
      token,
      message: "Login successful"
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // ✅ middleware se aayega

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let parsedAddress = userData.address;
    if (typeof parsedAddress === "string") {
      try {
        parsedAddress = JSON.parse(userData.address);
      } catch (e) {
        parsedAddress = { line1: "", line2: "" };
      }
    }

    res.json({
      success: true,
      userData: {
        ...userData._doc,
        address: parsedAddress,
      },
    });
  } catch (error) {
    console.error("Get Profile error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // token se mila hua userId

    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Update fields
    user.name = name;
    user.phone = phone;
    user.address = JSON.parse(address);
    user.dob = dob;
    user.gender = gender;

    // If image file exists, upload it and set URL
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      user.image = imageUpload.secure_url;
    }

    await user.save(); // ✅ save to persist all updates

    res.json({ success: true, message: "Profile updated" });

  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const bookAppointment=async(req,res)=>{
  try {
    
 const {userId,docId,slotDate,slotTime}=req.body
const docData = await doctorModel.findById(docId).select('-password')

if(!docData.available){
  return res.json({success:false,message:"Doctor not available"})
}
let slots_booked=docData.slots_booked
// checking for slots availablity
if(slots_booked[slotDate]){
  if(slots_booked[slotDate].includes(slotTime)){
    return res.json({success:false,message:"Slot not available"})
  }else{
    slots_booked[slotDate].push(slotTime)
  }
}else{
  if (!slots_booked[slotDate]) {
  slots_booked[slotDate] = [];
}
slots_booked[slotDate].push(slotTime);
}

const userData=await userModel.findById(userId).select('-password')
delete docData.slots_booked
const appointmentData={
  userId,
  docId,
  userData,
  docData,
  amount:docData.fees,
  slotTime,
  slotDate,
  date:Date.now()
}

const newAppointment=new appointmentModel(appointmentData)
await newAppointment.save()
// save new slots data in docData
await doctorModel.findByIdAndUpdate(docId,{slots_booked})
res.json({success:true,message:'Appointment Booked'})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:'Appointment Booking failed'})
  }
}

// api to get uerAppointments for frontend  my_appointment page
export const listAppointment=async(req,res)=>{
  try {
   const userId=req.userId
   const appointments=await appointmentModel.find({userId})
    res.json({success:true,appointments})

  } catch (error) {
      console.log(error)
    res.json({success:false,message:error.message})
  }
}


// api to cancel the appointment
export const cancelAppointment=async(req,res)=>{
  try {
// const {userId,appointmentId}=req.body
   const { appointmentId } = req.body;
    const userId = req.userId; 

const appointmentData=await appointmentModel.findById(appointmentId)
// veryfy appointment user
if(appointmentData.userId!==userId){
return res.json({success:false,message:'unauthorized action'})
}
await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
// releasing doctor slot
const {docId,slotDate,slotTime}=appointmentData
const doctorData=await doctorModel.findById(docId)
let slots_booked=doctorData.slots_booked
slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)

await doctorModel.findByIdAndUpdate(docId,{slots_booked})
res.json({success:true,message:'Appointment cancelled'})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
