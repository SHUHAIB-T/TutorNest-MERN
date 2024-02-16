import { Router } from "express";
import {
  getProfile,
  updateProfile,
  updateStudentProfile,
} from "../controller/studentProfileController";
import postRoutes from "./studentPosts";

const router: Router = Router();

router.route("/").get(getProfile).post(updateStudentProfile);
router.patch("/updateProfilePicture", updateProfile);
router.use("/posts", postRoutes);

export default router;
