import jwt from "jsonwebtoken";
import config from "../config";

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      userId: number;
    };
    return decoded;
  } catch (error) {
    console.log("❌ Unauthorized User");
    return null;
  }
};
