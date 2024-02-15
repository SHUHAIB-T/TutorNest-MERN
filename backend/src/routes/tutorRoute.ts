import { Router } from "express";
import {
  getProfile,
  updateProfilePicture,
  updateTutorProfile,
} from "../controller/tutorProfileController";
import { uploadDoc, getMydocmunts,deleteDocument } from "../controller/documentController";

const router: Router = Router();

router.route("/").get(getProfile).post(updateTutorProfile);
router.patch("/updateProfilePicture", updateProfilePicture);
router.post("/uploadDoc", uploadDoc);
router.get("/documents", getMydocmunts);
router.patch("/deletedocument", deleteDocument);

export default router;
