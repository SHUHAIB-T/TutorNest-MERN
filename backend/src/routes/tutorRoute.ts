import { Router } from "express";
import {
  getProfile,
  updateProfilePicture,
  updateTutorProfile,
  getStudentsPosts,
  getMyStudents,
} from "../controller/tutorProfileController";

import {
  uploadDoc,
  getMydocmunts,
  deleteDocument,
} from "../controller/documentController";

import {
  createConnection,
  CancelConnection,
} from "../controller/requestController";
import { getMyCourses } from "../controller/courseController";

const router: Router = Router();

router.route("/").get(getProfile).post(updateTutorProfile);
router.patch("/updateProfilePicture", updateProfilePicture);
router.post("/uploadDoc", uploadDoc);
router.get("/documents", getMydocmunts);
router.patch("/deletedocument", deleteDocument);
router.get("/posts", getStudentsPosts);
router.post("/createRequest", createConnection);
router.post("/cancelConnection", CancelConnection);
router.get("/myStudents", getMyStudents);
router.get("/my_courses", getMyCourses);

export default router;
