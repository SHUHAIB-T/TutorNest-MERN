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
exports.viewCourse = exports.deleteCourse = exports.editCourse = exports.getMyCourses = exports.getCourses = exports.createCourse = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongodb_1 = require("mongodb");
const courseModel_1 = __importDefault(require("../model/courseModel"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @disc    Create course
 * @route   POST /api/course
 * @access  private
 */
exports.createCourse = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { coverIMG, description, price, teacherId, title, language, category, } = req.body;
    const newCorse = yield courseModel_1.default.create({
        title,
        coverIMG,
        description,
        price,
        language,
        category,
        teacherId: new mongodb_1.ObjectId(teacherId),
    });
    if (newCorse) {
        res.status(200).json({
            success: true,
            message: "course created successfully",
            newCorse,
        });
    }
    else {
        next(Error("Internal server error"));
    }
}));
/**
 * @disc    get course
 * @route   GET /api/course
 * @access  private
 */
exports.getCourses = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 8;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    let courses = yield courseModel_1.default.aggregate([
        {
            $match: {
                isDelete: false,
            },
        },
        {
            $lookup: {
                from: "ratings",
                localField: "_id",
                foreignField: "courseId",
                as: "ratings",
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [{ $gte: ["$rating", 1] }, { $lte: ["$rating", 5] }],
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: { path: "$ratings", preserveNullAndEmptyArrays: true },
        },
        {
            $group: {
                _id: "$_id",
                averageRating: { $avg: "$ratings.rating" },
            },
        },
        {
            $lookup: {
                from: "courses",
                localField: "_id",
                foreignField: "_id",
                as: "course",
            },
        },
        {
            $unwind: {
                path: "$course",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "enrollments",
                localField: "_id",
                foreignField: "courseId",
                as: "enrollment",
                pipeline: [
                    { $match: { studentId: userId, payment_status: "completed" } },
                ],
            },
        },
        {
            $project: {
                "course.title": 1,
                "course.description": 1,
                "course.price": 1,
                "course.coverIMG": 1,
                "course.category": 1,
                "course.language": 1,
                "course.createdAt": 1,
                isEnrolled: { $eq: [{ $size: "$enrollment" }, 1] },
                averageRating: { $ifNull: ["$averageRating", 0] },
            },
        },
    ]);
    courses = courses.slice((page - 1) * pageSize, Math.min((page - 1) * pageSize + pageSize, courses.length));
    if (req.query.search) {
        const query = req.query.search
            .toLowerCase()
            .replace(/\s/g, "");
        courses = courses.filter((e) => {
            const title = e.course.title.toLowerCase().replace(/\s/g, "");
            if (title.includes(query)) {
                return true;
            }
            else if (query.includes(title)) {
                return true;
            }
            const language = e.course.language.toLowerCase().replace(/\s/g, "");
            if (language.includes(query)) {
                return true;
            }
            else if (query.includes(language)) {
                return true;
            }
            const category = e.course.category.toLowerCase().replace(/\s/g, "");
            if (category.includes(query)) {
                return true;
            }
            else if (query.includes(category)) {
                return true;
            }
        });
    }
    if (req.query.category) {
        courses = courses.filter((e) => e.course.category === req.query.category);
    }
    if (req.query.language) {
        courses = courses.filter((e) => e.course.language === req.query.language);
    }
    const sortQuery = req.query.sort;
    switch (sortQuery) {
        case "low-high":
            courses.sort((a, b) => {
                const priceA = parseFloat(a.course.price);
                const priceB = parseFloat(b.course.price);
                return priceA - priceB;
            });
            break;
        case "high-low":
            courses.sort((a, b) => {
                const priceA = parseFloat(a.course.price);
                const priceB = parseFloat(b.course.price);
                return priceB - priceA;
            });
            break;
        case "new-first":
            courses.sort((a, b) => {
                const createdAtA = new Date(a.course.createdAt);
                const createdAtB = new Date(b.course.createdAt);
                return createdAtB.getTime() - createdAtA.getTime();
            });
            break;
        case "popular":
            courses.sort((a, b) => {
                const ratingA = parseFloat(a.averageRating);
                const ratingB = parseFloat(b.averageRating);
                return ratingB - ratingA;
            });
            break;
        default:
            break;
    }
    let count = yield courseModel_1.default.countDocuments();
    count = Math.ceil(count / 8);
    if (courses) {
        res.status(200).json({
            success: true,
            courses,
            count,
        });
    }
    else {
        res.status(500);
        next(Error("Internal Server Error"));
    }
}));
/*
 * @disc    get my course
 * @route   GET /api/tutor/my_course
 * @access  private
 */
exports.getMyCourses = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const teacherId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const courses = yield courseModel_1.default.find({
        teacherId: teacherId,
        isDelete: false,
    });
    if (courses) {
        res.status(200).json({
            success: true,
            courses,
        });
    }
    else {
        res.status(500);
        next(Error("Internal server Error"));
    }
}));
/**
 * @disc    edit course
 * @route   PUT /api/course/:id
 * @access  private
 */
exports.editCourse = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const { coverIMG, description, price, title, category, language } = req.body;
    const updatedCourse = yield courseModel_1.default.findOneAndUpdate({ _id: courseId }, {
        coverIMG,
        description,
        price,
        title,
        category,
        language,
    }, { new: true });
    if (updatedCourse) {
        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            updatedCourse,
        });
    }
    else {
        res.status(500);
        next(Error("Internal server Error"));
    }
}));
/**
 * @disc    delete course
 * @route   PATCH /api/course/:id
 * @access  private
 */
exports.deleteCourse = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const deletedCourse = yield courseModel_1.default.findOneAndUpdate({ _id: courseId }, {
        isDelete: true,
    }, { new: true });
    if (deletedCourse) {
        res.status(200).json({
            success: true,
            message: "course deleted successfully",
        });
    }
    else {
        res.status(500);
        next(Error("Internal server Error"));
    }
}));
/**
 * @disc    view all details course
 * @route   GET /api/course/:id
 * @access  private
 */
exports.viewCourse = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const coursId = req.params.id;
    const course = yield courseModel_1.default.aggregate([
        {
            $match: {
                isDelete: false,
                _id: new mongoose_1.default.Types.ObjectId(coursId),
            },
        },
        {
            $lookup: {
                from: "ratings",
                localField: "_id",
                foreignField: "courseId",
                as: "ratings",
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [{ $gte: ["$rating", 1] }, { $lte: ["$rating", 5] }],
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: { path: "$ratings", preserveNullAndEmptyArrays: true },
        },
        {
            $group: {
                _id: "$_id",
                averageRating: { $avg: "$ratings.rating" },
            },
        },
        {
            $lookup: {
                from: "courses",
                localField: "_id",
                foreignField: "_id",
                as: "course",
                pipeline: [
                    {
                        $lookup: {
                            from: "teachers",
                            localField: "teacherId",
                            foreignField: "userID",
                            as: "author",
                        },
                    },
                    {
                        $unwind: { path: "$author", preserveNullAndEmptyArrays: true },
                    },
                    {
                        $project: {
                            _id: 0,
                            title: 1,
                            description: 1,
                            category: 1,
                            language: 1,
                            price: 1,
                            coverIMG: 1,
                            "author.name": 1,
                            "author.bio": 1,
                            "author.profile": 1,
                            "author.languages": 1,
                            "author.qualification": 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$course",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "enrollments",
                localField: "_id",
                foreignField: "courseId",
                as: "enrollment",
                pipeline: [
                    { $match: { studentId: userId, payment_status: "completed" } },
                ],
            },
        },
        {
            $lookup: {
                from: "lessons",
                foreignField: "courseId",
                localField: "_id",
                as: "lessons",
            },
        },
        {
            $lookup: {
                from: "ratings",
                localField: "_id",
                foreignField: "courseId",
                as: "ratings",
                pipeline: [
                    {
                        $lookup: {
                            from: "students",
                            localField: "userId",
                            foreignField: "userID",
                            as: "student",
                        },
                    },
                    {
                        $unwind: {
                            path: "$student",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $project: {
                            rating: 1,
                            review: 1,
                            "student.name": 1,
                            "student.profile": 1,
                        },
                    },
                ],
            },
        },
        {
            $project: {
                course: 1,
                isEnrolled: { $eq: [{ $size: "$enrollment" }, 1] },
                averageRating: { $ifNull: ["$averageRating", 0] },
                "lessons._id": 1,
                "lessons.title": 1,
                "lessons.duration": 1,
                "lessons.video": 1,
                "lessons.description": 1,
                ratings: 1,
                "author.name": 1,
                "author.profile": 1,
                "author.bio": 1,
                "author.qualification": 1,
                "author.languages": 1,
            },
        },
    ]);
    if (course) {
        res.status(200).json({
            success: true,
            course: course[0],
        });
    }
    else {
        res.status(500);
        next(Error("Internal server Error"));
    }
}));
