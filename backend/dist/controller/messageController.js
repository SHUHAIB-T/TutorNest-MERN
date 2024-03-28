"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.getAllMessages = exports.createMessage = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongodb_1 = require("mongodb");
const chatModel_1 = __importDefault(require("../model/chatModel"));
const messageModel_1 = __importDefault(require("../model/messageModel"));
/**
 * @disc    Create message
 * @route   POST /api/message
 * @access  private
 */
exports.createMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const chatId = req.body.chatId;
    const chat = yield chatModel_1.default.findOne({ _id: new mongodb_1.ObjectId(chatId) });
    if (!chat) {
        res.status(400);
        return next(new Error("Chat not found"));
    }
    if (!req.body.senderId)
        req.body.senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const message = new messageModel_1.default(Object.assign(Object.assign({}, req.body), { delivered_to: chat.members }));
    const newMessage = yield message.save();
    if (newMessage) {
        res.status(200).json({
            success: true,
            message: "chat created successflly!",
            newMessage: newMessage,
        });
    }
    else {
        next(Error("Internal server Error!"));
    }
}));
/**
 * @disc    get messages
 * @route   GET /api/message/:id
 * @access  private
 */
exports.getAllMessages = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const chat_id = req.params.id;
    if (!chat_id) {
        res.status(400);
        return next(new Error("Chat not found"));
    }
    const page = req.query.page && typeof req.query.page === "string"
        ? new Date(req.query.page)
        : null;
    const query = page
        ? {
            chatId: new mongodb_1.ObjectId(chat_id),
            createdAt: { $lt: page },
            delivered_to: {
                $elemMatch: {
                    $eq: new mongodb_1.ObjectId((_b = req.user) === null || _b === void 0 ? void 0 : _b._id),
                },
            },
        }
        : {
            chatId: new mongodb_1.ObjectId(chat_id),
            delivered_to: {
                $elemMatch: {
                    $eq: new mongodb_1.ObjectId((_c = req.user) === null || _c === void 0 ? void 0 : _c._id),
                },
            },
        };
    const messages = yield messageModel_1.default.aggregate([
        { $sort: { createdAt: -1 } },
        { $match: query },
        {
            $limit: 10,
        },
        {
            $sort: { createdAt: 1 },
        },
    ]);
    if (messages) {
        res.status(200).json({
            success: true,
            message: "messages fetched",
            messages,
        });
    }
    else {
        next(new Error("Internal server error"));
    }
}));
/**
 * @disc    delelte message
 * @route   PATCH /api/message/:id
 * @access  private
 */
exports.deleteMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deletedMessage = yield messageModel_1.default.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { isDelete: true }, { new: true });
    if (deletedMessage) {
        res.status(200).json({
            success: true,
            deletedMessage,
        });
    }
    else {
        next(Error("internal server Error"));
    }
}));
