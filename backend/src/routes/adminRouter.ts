import { Router } from "express";
import {
  getAdminProfile,
  updateProfilePicture,
} from "../controller/adminProfileController";
import {
  getAllTutors,
  blockUser,
  unblockUser,
  getAllstudnets
} from "../controller/adminUserController";

const router: Router = Router();

router.get("/", getAdminProfile);
router.patch("/updateProfilePicture", updateProfilePicture);
router.get("/tutors", getAllTutors);
router.get("/students", getAllstudnets);
router.patch("/user-block/:id", blockUser);
router.patch("/user-unblock/:id", unblockUser);

export default router;
