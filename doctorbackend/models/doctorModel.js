// import mongoose, { mongo } from "mongoose"
// const doctorSchema=new mongoose.Schema({
// name:{
//     type:String,
//     required:true
// },
// experience:{
//     type:String,
//     required:true
// },
// about:{
//     type:String,
//     required:true
// },
// available:{
//     type:Boolean,
//     default:true
// },
// fees:{
//     type:Number,
//     required:true
// },
// address:{
//     type:Object,
//     required:true
// },
// date:{
//     type:Number,
//     required:true
// },
// slots_booked:{
//     type:Object,
//     default:{}
// },
// name:{
//     type:String,
//     required:true
// },
// email:{
//     type:String,
//     required:true
// },
// password:{
//     type:String,
//     required:true
// },
// image:{
//     type:String,
//     required:true
// },
// speciality:{
//     type:String,
//     required:true
// },
// degree:{
//     type:String,
//     required:true
// },
// },{minimize:false})
// const doctorModel=mongoose.models.doctor||mongoose.model('doctor',doctorSchema)
// export default doctorModel


import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    address: {
      type: Object, // will store { address1, address2 }
      required: true,
    },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
  },
  { minimize: false }
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
