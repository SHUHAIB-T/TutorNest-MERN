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
exports.getAUserPosts = exports.deleteStudentPost = exports.updateStudentpost = exports.createStudentPost = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const studnetPostModet_1 = __importDefault(require("../model/studnetPostModet"));
/**
 * @desc    Create User Post
 * @route   POST api/student/postes
 * @access  PROTECTED
 */
exports.createStudentPost = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { subject, title, description, budget, language } = req.body.formDate;
    const udatedUser = yield studnetPostModet_1.default.create({
        studentId: userID,
        title: title,
        description: description,
        subject: subject,
        budget: parseInt(budget, 10),
        language: language,
    });
    if (udatedUser) {
        res.status(200).json({
            success: true,
            message: "Student Post Created Succefully!",
            udatedUser: {
                title: udatedUser.title,
                description: udatedUser.description,
                subject: udatedUser.subject,
                budjet: udatedUser.budget,
                language: udatedUser.language,
            },
        });
    }
    else {
        next(Error("Something went wrong!"));
    }
}));
/**
 * @desc    Update User Post
 * @route   PUT api/student/postes/:id
 * @access  PROTECTED
 */
exports.updateStudentpost = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userID = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const postId = req.params.id;
    const { subject, title, description, budget, language } = req.body
        .formData;
    const udatedUser = yield studnetPostModet_1.default.findOneAndUpdate({ studentId: userID, _id: postId }, {
        subject: subject,
        title: title,
        description: description,
        budget: budget,
        language: language,
    }, { new: true });
    if (udatedUser) {
        res.status(200).json({
            success: true,
            message: "Post updated Succefully!",
            udatedUser,
        });
    }
    else {
        res.status(500);
        next(Error("Something went wrong!"));
    }
}));
/**
 * @desc    Delete User Post
 * @route   PATCH api/student/postes/:id
 * @access  PROTECTED
 */
exports.deleteStudentPost = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const deletedPost = yield studnetPostModet_1.default.findByIdAndUpdate({
        _id: postId,
    }, {
        isDelete: true,
    }, { new: true });
    if (deletedPost) {
        res.status(200).json({
            success: true,
            message: "Post Deleted Succefully!",
            post: deletedPost,
        });
    }
    else {
        next(Error("Something went wrong!"));
    }
}));
/**
 * @desc    Get all  Post
 * @route   PATCH api/student/postes/:id
 * @access  PROTECTED
 */
exports.getAUserPosts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userID = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const posts = yield studnetPostModet_1.default.find({
        studentId: userID,
        isDelete: false,
    });
    if (posts) {
        res.status(200).json({
            success: true,
            posts: posts,
        });
    }
    else {
        next(Error("Something went wrong!"));
    }
}));
