import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { NextFunction, Request, Response } from "express";

export const protectUserRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const jwtSecret = process.env.JWT_SECRET || "";

    console.log("token", token);
    console.log("jwtSecret", jwtSecret);

    if (!token) {
      res.status(401).json({ message: "No token, authentication denied" });
      return;
    }
    const cleanedToken = token.replace(/^"|"$/g, "");

    const decoded = jwt.verify(cleanedToken, jwtSecret) as JwtPayload;
    console.log("decoded!!");
    if (!decoded) {
      res.status(401).json({ message: "Invalid token, authentication denied!" });
      return;
    }

    const userId = (decoded as JwtPayload)?.userId;

    if (!userId) {
      res.status(401).json({ message: "Invalid token, authentication denied" });
      return;
    }
    const user = await User.findById(userId || "").select("-password");
    if (!user) {
      res
        .status(401)
        .json({ message: "User not found, authentication denied" });
        return;
    }

    (req as any).user = user;

    if (user?.role !== "ADMIN" && user?.role !== "USER") {
      res.status(403).json({ message: "Access denied: Admins and Users only" });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized to access this route" });
    return;
  }
};
