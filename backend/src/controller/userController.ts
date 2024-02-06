import { Request, Response } from "express";
import asynchnadler from "express-async-handler";


export const sayHai = asynchnadler(async (req: Request, res: Response) => {
  res.send("Hello");
});
