import app from "./app";
import { env } from "./utils/envvalid";
import mongoose from "mongoose";

const PORT = env.PORT;

mongoose.connect(env.MONGO_URI).then(() => {
  console.log("Database connected succefully");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
