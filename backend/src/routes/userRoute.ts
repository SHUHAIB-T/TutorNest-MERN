import { Router } from "express";
import {
  verifyMail,
  verifyOTP,
  userSignup,
  userLogin
} from "../controller/userController";
import studentRoute from "./studentRoute";

const router: Router = Router();

router.post("/verify-email", verifyMail);
router.post("/verify-otp", verifyOTP);
router.post("/signup", userSignup);
router.post("/login", userLogin);

router.use("/student", studentRoute);
export default router;
