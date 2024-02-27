import { Router } from "express";
import {
  getProfile,
  updateProfile,
  updateStudentProfile,
} from "../controller/studentProfileController";
import {
  getAllmyRequests,
  acceptRequest,
  deleteRequest,
  getAllMyTutors
} from "../controller/requestController";
import postRoutes from "./studentPosts";

const router: Router = Router();

router.route("/").get(getProfile).post(updateStudentProfile);
router.patch("/updateProfilePicture", updateProfile);
router.get("/requests", getAllmyRequests);
router.post("/acceptRequest/:id", acceptRequest);
router.delete("/deleteRequest/:id", deleteRequest);
router.get("/mytutors", getAllMyTutors);

router.use("/posts", postRoutes);

export default router;
