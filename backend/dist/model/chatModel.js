"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    chatName: { type: String },
    isGroupChat: { type: Boolean, required: true, default: false },
    members: { type: Array, required: true, default: [] },
    isDelete: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
});
const Chat = (0, mongoose_1.model)("chat", chatSchema);
exports.default = Chat;
