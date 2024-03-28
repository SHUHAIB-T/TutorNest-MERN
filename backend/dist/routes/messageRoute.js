"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controller/messageController");
const router = (0, express_1.Router)();
router.post("/", messageController_1.createMessage);
router.route("/:id").get(messageController_1.getAllMessages).patch(messageController_1.deleteMessage);
exports.default = router;
