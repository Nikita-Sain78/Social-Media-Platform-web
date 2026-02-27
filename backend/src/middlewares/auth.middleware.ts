import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { configDotenv } from "dotenv";
import { Request, Response } from "express";

configDotenv();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export const protectRoute = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
      userId: string;
    };

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", (error as Error).message);
    res.status(500).json({ message: "Internal server error" });
  }
};
