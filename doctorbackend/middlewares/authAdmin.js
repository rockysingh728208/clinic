// import jwt from "jsonwebtoken"
// // admin authentication middleware
// const authAdmin=async(req,res)=>{
//     try {
//      const {atoken}=req.headers
//      if(!atoken){
//         return res.json({success:false,messge:"Not authorized login again"})
//      }   
//     //  agar token rahega to veryfy kar do
//     const token_decode=jwt.verify(atoken,process.env.JWT_SECRET)
//     if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
//          return res.json({success:false,messge:"Not authorized login again"})
//     }



//     } catch (error) {
//       console.log(error)
//       res.json({succes:false,message:error.message})  
//     }
// }
// export default authAdmin;

// import jwt from "jsonwebtoken";

// // ✅ Admin authentication middleware
// const authAdmin = async (req, res, next) => {
//   try {
//     const { atoken } = req.headers;

//     if (!atoken) {
//       return res.status(401).json({ success: false, message: "Not authorized, login again" });
//     }

//     // ✅ Verify JWT token
//     const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

//     // ✅ Check if email matches admin email
//     if (token_decode.email !== process.env.ADMIN_EMAIL) {
//       return res.status(403).json({ success: false, message: "Access denied: not an admin" });
//     }

//     // ✅ If verified, allow next
//     next();

//   } catch (error) {
//     console.error("Admin Auth Error:", error.message);
//     res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };

// export default authAdmin;





// import jwt from "jsonwebtoken";

// const authAdmin = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "Unauthorized: No token" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.email !== process.env.ADMIN_EMAIL) {
//       return res.status(403).json({ success: false, message: "Access denied: Admin only" });
//     }

//     next();
//   } catch (error) {
//     console.error("authAdmin error:", error.message);
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ success: false, message: "Token expired" });
//     }
//     res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// export default authAdmin;


// import jwt from "jsonwebtoken";

// const authAdmin = async (req, res, next) => {
//   try {
//     const { atoken } = req.headers;
//     console.log(atoken)

//     if (!atoken) {
//       return res.status(401).json({ success: false, message: "Not authorized, login again" });
//     }

//     const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

//     if (token_decode.email !== process.env.ADMIN_EMAIL) {
//       return res.status(403).json({ success: false, message: "Access denied: not an admin" });
//     }

//     next();
//   } catch (error) {
//     console.error("authAdmin error:", error.message);
//     return res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };

// export default authAdmin;

import jwt from "jsonwebtoken";
const authAdmin = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.headers.atoken; // ✅ accept both

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Access denied: Admin only" });
    }

    next();
  } catch (error) {
    console.error("authAdmin error:", error.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
export default authAdmin
