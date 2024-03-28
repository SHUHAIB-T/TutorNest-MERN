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
exports.getMychats = exports.createChat = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chatModel_1 = __importDefault(require("../model/chatModel"));
const mongodb_1 = require("mongodb");
/**
 * @desc    create chat
 * @route   POST    api/chat
 * @access  private
 */
exports.createChat = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { userId } = req.body;
    const exist = yield chatModel_1.default.findOne({
        members: { $all: [new mongodb_1.ObjectId(userId), new mongodb_1.ObjectId((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)] },
    });
    if (exist) {
        res.status(200).json({
            success: true,
            message: "chat already exist",
            chat: exist,
        });
    }
    else {
        const newChat = new chatModel_1.default({
            members: [new mongodb_1.ObjectId((_b = req.user) === null || _b === void 0 ? void 0 : _b._id), new mongodb_1.ObjectId(userId)],
        });
        const chat = yield newChat.save();
        if (chat) {
            res.status(200).json({
                sussess: true,
                chat,
            });
        }
        else {
            next(Error("some thing went wrong"));
        }
    }
}));
/**
 * @desc    get all chats of a specific user
 * @route   GET    api/chat
 * @access  private
 */
exports.getMychats = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const myChats = yield chatModel_1.default.aggregate([
        {
            $match: {
                members: {
                    $elemMatch: {
                        $eq: new mongodb_1.ObjectId(userId),
                    },
                },
            },
        },
        {
            $lookup: {
                from: "messages",
                localField: "_id",
                foreignField: "chatId",
                as: "latest_message",
                pipeline: [
                    {
                        $match: {
                            delivered_to: {
                                $elemMatch: {
                                    $eq: new mongodb_1.ObjectId((_d = req.user) === null || _d === void 0 ? void 0 : _d._id),
                                },
                            },
                        },
                    },
                    {
                        $sort: { createdAt: -1 },
                    },
                ],
            },
        },
        {
            $addFields: {
                latest_message: { $arrayElemAt: ["$latest_message", 0] },
            },
        },
        {
            $lookup: {
                from: "teachers",
                localField: "latest_message.senderId",
                foreignField: "userID",
                as: "latest_message.teacherProfile",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            profile: 1,
                            userID: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$latest_message.teacherProfile",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "students",
                localField: "latest_message.senderId",
                foreignField: "userID",
                as: "latest_message.userDetails",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            profile: 1,
                            userID: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$latest_message.userDetails",
                preserveNullAndEmptyArrays: true,
            },
        },
    ]);
    if (myChats) {
        res.status(200).json({
            success: true,
            chats: myChats,
        });
    }
    else {
        next("Internal server Error");
    }
}));
