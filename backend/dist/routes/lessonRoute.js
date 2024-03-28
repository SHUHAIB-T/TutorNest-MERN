"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const lessonController_1 = require("../controller/lessonController");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.protect, lessonController_1.createLesson);
router
    .route("/:id")
    .put(authMiddleware_1.protect, lessonController_1.editLesson)
    .patch(authMiddleware_1.protect, lessonController_1.deleteLesson)
    .get(authMiddleware_1.protect, lessonController_1.getLessons);
exports.default = router;
