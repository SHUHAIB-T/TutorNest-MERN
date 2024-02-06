import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/userRoute"

dotenv.config();

const app: Express = express();

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

app.use("/api", userRouter)

export default app;
