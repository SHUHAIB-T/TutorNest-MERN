import { Router } from "express";
import {
  getProfile,
  updateProfilePicture,
  updateTutorProfile
} from "../controller/tutorProfileController";

const router: Router = Router();

router.route("/").get(getProfile).post(updateTutorProfile);
router.patch("/updateProfilePicture", updateProfilePicture);

export default router;
