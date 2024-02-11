import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import User from "../model/userModel";
import { env } from "../utils/envvalid";
import mongoose, { Document } from "mongoose";

declare module "express" {
  interface Request {
    user?: Document;
  }
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        const userId = new mongoose.Types.ObjectId(decoded.userId);
        const user = await User.findOne({ _id: userId });
        if (!user) {
          res.status(401);
          next(Error("Unauthorized user"));
        } else if (!user.status) {
          res.status(401);
          next(Error("Account has been blocked"));
        } else {
          req.user = user;
        }
        next();
      } catch (error) {
        res.status(401);
        next(new Error("Not authorized, token failed"));
      }
    } else {
      res.status(401);
      res.status(401);
      next(new Error("Not authorized, token failed"));
    }
  }
);
