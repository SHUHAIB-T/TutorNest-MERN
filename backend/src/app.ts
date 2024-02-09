import express, { Express } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";
import "dotenv/config"

import userRouter from "./routes/userRoute";


const app: Express = express();

const corsConfig = {
  origin: "http://localhost:4000",
  credentials: true,
};

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

app.use("/api", userRouter);

//error handler
app.use("*", notFound);
app.use(errorHandler);

export default app;
