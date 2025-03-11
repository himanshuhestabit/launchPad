import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();
export const auth = async (req, res, next) => {
  try {
    // console.log(req.cookies);
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, error: "middleware" });
  }
};
