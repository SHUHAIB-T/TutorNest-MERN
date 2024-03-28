"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AssessmentController_1 = require("../controller/AssessmentController");
const router = (0, express_1.Router)();
router.post("/", AssessmentController_1.createAssessment);
router.get("/:id", AssessmentController_1.getAssessment);
router.post("/verify", AssessmentController_1.checkAssessment);
exports.default = router;
