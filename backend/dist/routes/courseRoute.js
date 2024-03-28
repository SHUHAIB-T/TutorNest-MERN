"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController_1 = require("../controller/courseController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.route("/").get(authMiddleware_1.isLoggedIn, courseController_1.getCourses).post(authMiddleware_1.protect, courseController_1.createCourse);
router
    .route("/:id")
    .get(authMiddleware_1.isLoggedIn, courseController_1.viewCourse)
    .put(authMiddleware_1.protect, courseController_1.editCourse)
    .patch(authMiddleware_1.protect, courseController_1.deleteCourse);
exports.default = router;
