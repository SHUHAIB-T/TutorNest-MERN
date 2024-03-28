"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollmentController_1 = require("../controller/enrollmentController");
const router = (0, express_1.Router)();
router.post("/create", enrollmentController_1.createEnrollment);
router.post("/verify", enrollmentController_1.verifyPayment);
router.post("/update-progress", enrollmentController_1.updateProgress);
exports.default = router;
