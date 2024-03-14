import { Router } from "express";
import {
  createAssessment,
  getAssessment,
} from "../controller/AssessmentController";

const router: Router = Router();

router.post("/", createAssessment);
router.get("/:id", getAssessment);

export default router;
