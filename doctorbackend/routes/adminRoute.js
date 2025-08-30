import express from "express";
import {addDoctor,allDoctors,loginAdmin} from  "../controllers/adminController.js"
import { changeAvailablity } from "../controllers/doctorController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js"
const adminrouter=express.Router()
adminrouter.post("/add-doctor",authAdmin, upload.single('image'),addDoctor)
adminrouter.post("/login",loginAdmin)
adminrouter.post("/all-doctors",authAdmin,allDoctors)
adminrouter.post("/change-availability",authAdmin,changeAvailablity)
export default adminrouter
