
// import jwt from "jsonwebtoken";
// const authUser = async (req, res, next) => {
//   try {
//     // console.log("Token Received:", req.headers.authorization || req.headers.token);

//     const token =
//       req.headers.authorization?.split(" ")[1] || req.headers.token;
//     if (!token) {
//       return res.status(401).json({ success: false, message: "Not authorized login again" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.userId=decoded.id
//     next();
//   } catch (error) {
//     console.error("authAdmin error:", error.message);
//     res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };
// export default authUser

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
        console.log("Authorization Header:", req.headers.authorization); 
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ add userId to request
    next();
  } catch (error) {
    console.error("authUser error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
