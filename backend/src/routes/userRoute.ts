import { Router } from "express";
import {
  verifyMail,
  verifyOTP,
  userSignup,
  userLogin,
  googleAuth,
  checkPassword,
  resetPassword,
  getUserProfile,
} from "../controller/userController";
import studentRoute from "./studentRoute";
import tutorRoute from "../routes/tutorRoute";
import adminRouter from "../routes/adminRouter";
import chatRoute from "../routes/chatRoute";
import messageRoute from "../routes/messageRoute";
import courseRoute from "../routes/courseRoute";

import { protect } from "../middlewares/authMiddleware";

const router: Router = Router();

router.post("/verify-email", verifyMail);
router.post("/verify-otp", verifyOTP);
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/googleAuth", googleAuth);
router
  .route("/resetPassword")
  .post(protect, checkPassword)
  .patch(protect, resetPassword);

router.get("/userProfile/:id", protect, getUserProfile);
router.use("/student", protect, studentRoute);
router.use("/tutor", protect, tutorRoute);
router.use("/admin", protect, adminRouter);
router.use("/chat", protect, chatRoute);
router.use("/messages", protect, messageRoute);
router.use("/course", courseRoute);
export default router;
