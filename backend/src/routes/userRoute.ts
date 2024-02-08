import { Router } from "express";
import { verifyMail } from "../controller/userController";
import studentRoute from "./studentRoute";

const router: Router = Router();

router.post("/verify-email", verifyMail);


router.use("/student", studentRoute);
export default router;
