import { Router } from "express";
import {
  getProfile,
  updateProfilePicture,
  updateTutorProfile,
  getStudentsPosts,
} from "../controller/tutorProfileController";
import {
  uploadDoc,
  getMydocmunts,
  deleteDocument,
} from "../controller/documentController";
import { createConnection ,CancelConnection} from "../controller/requestController";

const router: Router = Router();

router.route("/").get(getProfile).post(updateTutorProfile);
router.patch("/updateProfilePicture", updateProfilePicture);
router.post("/uploadDoc", uploadDoc);
router.get("/documents", getMydocmunts);
router.patch("/deletedocument", deleteDocument);
router.get("/posts", getStudentsPosts);
router.post("/createRequest", createConnection);
router.post("/cancelConnection", CancelConnection);

export default router;
