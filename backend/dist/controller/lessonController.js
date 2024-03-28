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
exports.deleteLesson = exports.editLesson = exports.getLessons = exports.createLesson = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongodb_1 = require("mongodb");
const courseModel_1 = __importDefault(require("../model/courseModel"));
const lessonModel_1 = __importDefault(require("../model/lessonModel"));
/**
 * @disc    Create lesson
 * @route   POST /api/lesson
 * @access  private
 */
exports.createLesson = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, description, duration, video, title } = req.body;
    const isCourseExist = yield courseModel_1.default.findOne({ _id: courseId });
    if (!isCourseExist) {
        res.status(404);
        next(Error("course not foud"));
    }
    const newLesson = yield lessonModel_1.default.create({
        courseId: new mongodb_1.ObjectId(courseId),
        description,
        title,
        duration,
        video,
    });
    if (newLesson) {
        res.status(200).json({
            success: true,
            message: "lesson created successfully",
            newLesson,
        });
    }
    else {
        res.status(500);
        next(Error("internal server error"));
    }
}));
/**
 * @disc    Get lessons of a course
 * @route   GET /api/lesson/:id
 * @access  private
 */
exports.getLessons = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const lessons = yield lessonModel_1.default.find({
        courseId: new mongodb_1.ObjectId(courseId),
        isDelete: false,
    });
    if (lessons) {
        res.status(200).json({
            success: true,
            lessons,
        });
    }
    else {
        res.status(500);
        next(Error("Internal server Error"));
    }
}));
/**
 * @disc    edit lesson
 * @route   PUT /api/lesson/:id
 * @access  private
 */
exports.editLesson = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonId = req.params.id;
    const { description, duration, video, title } = req.body;
    const updateLesson = yield lessonModel_1.default.findOneAndUpdate({ _id: new mongodb_1.ObjectId(lessonId) }, {
        title,
        description,
        video,
        duration,
    }, { new: true });
    if (updateLesson) {
        res.status(200).json({
            success: true,
            message: "lesson updated successfully",
            updateLesson,
        });
    }
    else {
        res.status(500);
        next(Error("internal server Error!"));
    }
}));
/**
 * @disc    delete lesson
 * @route   PATCH /api/lesson/:id
 * @access  private
 */
exports.deleteLesson = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonId = req.params.id;
    const deleteLesson = yield lessonModel_1.default.findOneAndUpdate({ _id: new mongodb_1.ObjectId(lessonId) }, { isDelete: true }, { new: true });
    if (deleteLesson) {
        res.status(200).json({
            success: true,
            message: "lesson deleted successfully",
        });
    }
    else {
        res.status(500);
        next(Error("internal server Error!"));
    }
}));
