import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../utils/envvalid";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../model/userModel";

interface CustomRequest extends Request {
  user?: IUser; 
}

export const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        const user = (await User.findById(decoded.userId)) as IUser;
        req.user = user;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not Authorized, invalid tocken");
      }
    } else {
      res.status(401);
      throw new Error("Not Authorized, no tocken");
    }
  }
);
