"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const studentRoute_1 = __importDefault(require("./studentRoute"));
const tutorRoute_1 = __importDefault(require("../routes/tutorRoute"));
const adminRouter_1 = __importDefault(require("../routes/adminRouter"));
const chatRoute_1 = __importDefault(require("../routes/chatRoute"));
const messageRoute_1 = __importDefault(require("../routes/messageRoute"));
const courseRoute_1 = __importDefault(require("../routes/courseRoute"));
const lessonRoute_1 = __importDefault(require("../routes/lessonRoute"));
const ratingRoute_1 = __importDefault(require("../routes/ratingRoute"));
const assessmentRoute_1 = __importDefault(require("../routes/assessmentRoute"));
const enrollmentRoute_1 = __importDefault(require("../routes/enrollmentRoute"));
const certificateRoute_1 = __importDefault(require("../routes/certificateRoute"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/verify-email", userController_1.verifyMail);
router.post("/verify-otp", userController_1.verifyOTP);
router.post("/signup", userController_1.userSignup);
router.post("/login", userController_1.userLogin);
router.post("/googleAuth", userController_1.googleAuth);
router
    .route("/resetPassword")
    .post(authMiddleware_1.protect, userController_1.checkPassword)
    .patch(authMiddleware_1.protect, userController_1.resetPassword);
router.get("/userProfile/:id", authMiddleware_1.protect, userController_1.getUserProfile);
router.use("/student", authMiddleware_1.protect, studentRoute_1.default);
router.use("/tutor", tutorRoute_1.default);
router.use("/admin", authMiddleware_1.protect, adminRouter_1.default);
router.use("/chat", authMiddleware_1.protect, chatRoute_1.default);
router.use("/messages", authMiddleware_1.protect, messageRoute_1.default);
router.use("/course", courseRoute_1.default);
router.use("/lesson", lessonRoute_1.default);
router.use("/certificate", certificateRoute_1.default);
router.use("/rating", authMiddleware_1.protect, ratingRoute_1.default);
router.use("/assessment", authMiddleware_1.protect, assessmentRoute_1.default);
router.use("/enrollment", authMiddleware_1.protect, enrollmentRoute_1.default);
exports.default = router;
