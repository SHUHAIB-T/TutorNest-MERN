import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  editCourse,
  getCourses,
  viewCourse,
} from "../controller/courseController";
import { protect } from "../middlewares/authMiddleware";
const router: Router = Router();

router.route("/").get(protect, getCourses).post(protect, createCourse);
router
  .route("/:id")
  .get(protect, viewCourse)
  .put(protect, editCourse)
  .patch(protect, deleteCourse);

export default router;
