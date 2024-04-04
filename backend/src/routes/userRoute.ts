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
import lessonRoute from "../routes/lessonRoute";
import ratingRoute from "../routes/ratingRoute";
import assesmentRoute from "../routes/assessmentRoute";
import enrollmentRoute from "../routes/enrollmentRoute";
import certificateRoute from "../routes/certificateRoute";

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
router.use("/tutor", tutorRoute);
router.use("/admin", protect, adminRouter);
router.use("/chat", protect, chatRoute);
router.use("/messages", protect, messageRoute);
router.use("/course", courseRoute);
router.use("/lesson", lessonRoute);
router.use("/certificate", certificateRoute);
router.use("/rating", protect, ratingRoute);
router.use("/assessment", protect, assesmentRoute);
router.use("/enrollment", protect, enrollmentRoute);

export default router;
