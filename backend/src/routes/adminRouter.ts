import { Router } from "express";
import {
  getAdminProfile,
  updateProfilePicture,
} from "../controller/adminProfileController";

const router: Router = Router();

router.route("/").get(getAdminProfile);
router.patch("/updateProfilePicture", updateProfilePicture);

export default router;
