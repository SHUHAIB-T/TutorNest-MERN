import { Router } from "express";
import {
  createEnrollment,
  verifyPayment,
} from "../controller/enrollmentController";

const router: Router = Router();

router.post("/create", createEnrollment);
router.post("/verify", verifyPayment);

export default router;
