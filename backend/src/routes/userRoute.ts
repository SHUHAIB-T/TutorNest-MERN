import { Router } from "express";
import {
  verifyMail,
  verifyOTP,
  userSignup,
  userLogin,
  googleAuth,
  checkPassword,
  resetPassword,
} from "../controller/userController";
import studentRoute from "./studentRoute";
import tutorRoute from "../routes/tutorRoute";
import adminRouter from "../routes/adminRouter";

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

router.use("/student", protect, studentRoute);
router.use("/tutor", protect, tutorRoute);
router.use("/admin", protect, adminRouter);
export default router;
