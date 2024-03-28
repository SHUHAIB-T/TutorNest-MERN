"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentProfileController_1 = require("../controller/studentProfileController");
const requestController_1 = require("../controller/requestController");
const studentPosts_1 = __importDefault(require("./studentPosts"));
const enrollmentController_1 = require("../controller/enrollmentController");
const router = (0, express_1.Router)();
router.route("/").get(studentProfileController_1.getProfile).post(studentProfileController_1.updateStudentProfile);
router.patch("/updateProfilePicture", studentProfileController_1.updateProfile);
router.get("/requests", requestController_1.getAllmyRequests);
router.post("/acceptRequest/:id", requestController_1.acceptRequest);
router.delete("/deleteRequest/:id", requestController_1.deleteRequest);
router.get("/mytutors", requestController_1.getAllMyTutors);
router.get("/my-coures", enrollmentController_1.getAllMycourse);
router.post("/createConnection", requestController_1.createConnection);
router.post("/cancelConnection", requestController_1.CancelConnection);
router.use("/posts", studentPosts_1.default);
exports.default = router;