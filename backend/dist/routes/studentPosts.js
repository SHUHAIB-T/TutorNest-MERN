"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentPostController_1 = require("../controller/studentPostController");
const router = (0, express_1.Router)();
router.route("/").get(studentPostController_1.getAUserPosts).post(studentPostController_1.createStudentPost);
router.route("/:id").put(studentPostController_1.updateStudentpost).patch(studentPostController_1.deleteStudentPost);
exports.default = router;
