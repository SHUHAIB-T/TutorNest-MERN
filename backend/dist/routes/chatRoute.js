"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = require("../controller/chatController");
const router = (0, express_1.Router)();
router.route("/").post(chatController_1.createChat).get(chatController_1.getMychats);
exports.default = router;
