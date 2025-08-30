// // // import dotenv from "dotenv"
// // // dotenv.config()
// // // import bcrypt from "bcrypt";
// // // import validator from "validator";
// // // import {v2 as cloudinary} from "cloudinary"
// // // import doctorModel from "../models/doctorModel.js";
// // // import jwt from"jsonwebtoken"
// // // const addDoctor = async (req, res) => {
// // //   try {
// // //     const {
// // //       name,
// // //       email,
// // //       password,
// // //       speciality,
// // //       degree,
// // //       experience,
// // //       about,
// // //       fees,
// // //       address,
// // //     } = req.body;

// // //     const imageFile = req.file; // Uploaded file from multer

// // //     // ✅ Validate required fields
// // //     if (
// // //       !name ||
// // //       !email ||
// // //       !password ||
// // //       !speciality ||
// // //       !degree ||
// // //       !experience ||
// // //       !about ||
// // //       !fees ||
// // //       !address ||
// // //       !imageFile
// // //     ) {
// // //       return res.status(400).json({ message: "All fields are required." });
// // //     }

// // //     // ✅ Validate email
// // //     if (!validator.isEmail(email)) {
// // //       return res.status(400).json({ message: "Invalid email address." });
// // //     }

// // //     // ✅ Check password strength
// // //     if (password.length < 8) {
// // //       return res
// // //         .status(400)
// // //         .json({ message: "Password must be at least 8 characters long." });
// // //     }

// // //     // ✅ Hash password
// // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // upload image to clodinary
// // // const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
// // // const imageUrl=imageUpload.secure_url 

// // // const doctorData={
// // //     name,
// // //     email,
// // //     image:imageUrl,
// // //     password:hashedPassword,
// // //     speciality,
// // //     degree,
// // //     experience,
// // //     about,
// // //     fees,
// // //     address:JSON.parse(address),
// // //     date:Date.now()
// // // }

// // //   const newDoctor=new doctorModel(doctorData)
// // //   await  newDoctor.save() 
// // //   res.json({success:true,message:"added doctor succeessfully"})
// // //   } catch (error) {
// // //       console.error("Error adding doctor:", error);
  
// // //     res.status(500).json({ message: "Internal server error" });
// // //   }
// // // };

// // // // login admin
// // // const loginAdmin=async(req,res)=>{
// // //   try {
// // //     const {email,password}=req.body;
// // //     if(email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD){
// // // const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

// // // // isi token ke wajah se admin ko login krne ke liye allow krenge
// // // res.json({success:true,token})
// // //     }else{
// // //       res.json({success:false,message:"Invalid Credentials"})
// // //     }


// // //   } catch (error) {
    
// // //     res.status(500).json({ message: "Internal server error" });
// // //   }
// // // }





// // // export {addDoctor,loginAdmin};


// // import dotenv from "dotenv";
// // dotenv.config();
// // import bcrypt from "bcrypt";
// // import validator from "validator";
// // import { v2 as cloudinary } from "cloudinary";
// // import doctorModel from "../models/doctorModel.js";
// // import jwt from "jsonwebtoken";

// // // ✅ Add Doctor Controller
// // // const addDoctor = async (req, res) => {
// // //   try {
// // //     const {
// // //       name,
// // //       email,
// // //       password,
// // //       speciality,
// // //       degree,
// // //       experience,
// // //       about,
// // //       fees,
// // //       address,
// // //     } = req.body;

// // //     const imageFile = req.file; // Uploaded image from multer

// // //     // ✅ Validate fields
// // //     if (
// // //       !name ||
// // //       !email ||
// // //       !password ||
// // //       !speciality ||
// // //       !degree ||
// // //       !experience ||
// // //       !about ||
// // //       !fees ||
// // //       !address ||
// // //       !imageFile
// // //     ) {
// // //       return res.status(400).json({ message: "All fields are required." });
// // //     }

// // //     if (!validator.isEmail(email)) {
// // //       return res.status(400).json({ message: "Invalid email address." });
// // //     }

// // //     if (password.length < 8) {
// // //       return res.status(400).json({ message: "Password must be at least 8 characters long." });
// // //     }

// // //     // ✅ Hash password
// // //     const hashedPassword = await bcrypt.hash(password, 10);

// // //     // ✅ Upload image to Cloudinary
// // //     const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
// // //       resource_type: "image",
// // //     });

// // //     const doctorData = {
// // //       name,
// // //       email,
// // //       image: imageUpload.secure_url,
// // //       password: hashedPassword,
// // //       speciality,
// // //       degree,
// // //       experience,
// // //       about,
// // //       fees,
// // //       address: JSON.parse(address),
// // //       date: Date.now(),
// // //     };

// // //     const newDoctor = new doctorModel(doctorData);
// // //     await newDoctor.save();

// // //     res.json({ success: true, message: "Doctor added successfully" });

// // //   } catch (error) {
// // //     console.error("Error adding doctor:", error.message);
// // //     res.status(500).json({ message: "Internal server error" });
// // //   }
// // // };





//  import dotenv from "dotenv";
//  dotenv.config();
//  import bcrypt from "bcrypt";
//  import validator from "validator";
//  import { v2 as cloudinary } from "cloudinary";
//  import doctorModel from "../models/doctorModel.js";
//  import jwt from "jsonwebtoken";
// const addDoctor = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address1,
//       address2,

//     } = req.body;

//     const imageFile = req.file;

//     // ✅ Check all fields
//     if (
//       !name || !email || !password || !speciality ||
//       !degree || !experience || !about || !fees ||
//       !address1 || !address2 || !imageFile
//     ) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     // ✅ Validate email
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ message: "Invalid email address." });
//     }

//     // ✅ Check if doctor with same email exists
//     const existingDoctor = await doctorModel.findOne({ email });
//     if (existingDoctor) {
//       return res.status(400).json({ message: "Doctor with this email already exists." });
//     }

//     // ✅ Password validation
//     if (password.length < 8) {
//       return res.status(400).json({ message: "Password must be at least 8 characters long." });
//     }

//     // ✅ Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ✅ Upload image to cloudinary
//     const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//       resource_type: "image",
//     });

//     const doctorData = {
//       name,
//       email,
//       image: imageUpload.secure_url,
//       password: hashedPassword,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address: JSON.parse(address),
//       date: Date.now(),
//     };

//     const newDoctor = new doctorModel(doctorData);
//     await newDoctor.save();

//     res.json({ success: true, message: "Doctor added successfully" });

//   } catch (error) {
//     console.error("Error adding doctor:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// // ✅ Admin Login Controller
// const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//         expiresIn: "1d", // Token valid for 1 day
//       });

//       res.json({ success: true, token });
//     } else {
//       res.status(401).json({ success: false, message: "Invalid Credentials" });
//     }

//   } catch (error) {
//     console.error("Admin Login Error:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export { addDoctor, loginAdmin };



import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const image = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const existing = await doctorModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadedImage = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });

    const doctor = new doctorModel({
      name,
      email,
      image: uploadedImage.secure_url,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), // ✅ Parse stringified address
      date: Date.now(),
    });

    await doctor.save();

    res.status(200).json({ success: true, message: "Doctor added successfully" });
  } catch (err) {
    console.error("Add Doctor Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// api to get all doctor list for admin panel

const allDoctors=async(req,res)=>{
  try {
    const doctors=await doctorModel.find({}).select('-password')

res.json({success:true,doctors})

  } catch (error) {
    
  }
}

export { addDoctor, loginAdmin,allDoctors };



