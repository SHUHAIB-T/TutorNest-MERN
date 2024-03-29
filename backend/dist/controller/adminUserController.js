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
exports.getDashboardDetais = exports.getSingleTutor = exports.toggleVerify = exports.getTutuorDocument = exports.unblockUser = exports.blockUser = exports.getAllstudnets = exports.getAllTutors = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const teacherProfile_1 = __importDefault(require("../model/teacherProfile"));
const studentProfile_1 = __importDefault(require("../model/studentProfile"));
const userModel_1 = __importDefault(require("../model/userModel"));
const documentModel_1 = __importDefault(require("../model/documentModel"));
/**
 * @disc    Get all tutors
 * @route   GET /api/admin/tutors
 * @access  private
 */
exports.getAllTutors = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 5;
    if (req.query.search)
        [(query.name = { $regex: new RegExp(req.query.search, "i") })];
    const tachers = yield teacherProfile_1.default.aggregate([
        {
            $match: query,
        },
        {
            $lookup: {
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $unwind: "$user",
        },
        {
            $project: {
                "user._id": 0,
                "user.role": 0,
                "user.password": 0,
                __v: 0,
                "user.__v": 0,
                profile: 0,
                bio: 0,
                pricing: 0,
            },
        },
        {
            $skip: (page - 1) * pageSize,
        },
        {
            $limit: pageSize,
        },
    ]);
    let count = yield teacherProfile_1.default.countDocuments();
    count = ~~(count / 5);
    if (tachers) {
        res.status(200).json({
            success: true,
            teachers: tachers,
            count: count,
        });
    }
    else {
        next(Error("No teachers Registered"));
    }
}));
/**
 * @disc    Get all students
 * @route   GET /api/admin/students
 * @access  private
 */
exports.getAllstudnets = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 5;
    if (req.query.search)
        [(query.name = { $regex: new RegExp(req.query.search, "i") })];
    const students = yield studentProfile_1.default.aggregate([
        {
            $match: query,
        },
        {
            $lookup: {
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $unwind: "$user",
        },
        {
            $project: {
                "user._id": 0,
                "user.role": 0,
                "user.password": 0,
                __v: 0,
                "user.__v": 0,
                profile: 0,
                gender: 0,
                preffered_language: 0,
                dob: 0,
            },
        },
        {
            $skip: (page - 1) * pageSize,
        },
        {
            $limit: pageSize,
        },
    ]);
    let count = yield studentProfile_1.default.countDocuments();
    count = ~~(count / 5);
    if (students) {
        res.status(200).json({
            success: true,
            students: students,
            count: count,
        });
    }
    else {
        next(Error("No teachers Registered"));
    }
}));
/**
 * @disc    Block user
 * @route   PATCH /api/admin/user-block/:id
 * @access  private
 */
exports.blockUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const blockUser = yield userModel_1.default.findByIdAndUpdate({ _id: userId }, { status: false }, { new: true });
    if (blockUser) {
        res.status(200).json({
            success: true,
            message: "user Blocked!",
        });
    }
    else {
        next(Error("something went wrong!"));
    }
}));
/**
 * @disc    Unblock user
 * @route   PATCH /api/admin/user-unblock/:id
 * @access  private
 */
exports.unblockUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const blockUser = yield userModel_1.default.findByIdAndUpdate({ _id: userId }, { status: true }, { new: true });
    if (blockUser) {
        res.status(200).json({
            success: true,
            message: "user unblocked!",
        });
    }
    else {
        next(Error("something went wrong!"));
    }
}));
/**
 * @disc    Get Tutor Documents
 * @route   get /api/admin/document/:id
 * @access  private
 */
exports.getTutuorDocument = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const documents = yield documentModel_1.default.find({ userID: userId });
    if (documents) {
        res.status(200).json({
            success: true,
            documents: documents,
        });
    }
    else {
        next(Error("something went wrong!"));
    }
}));
/**
 * @disc    Verify doc Documents
 * @route   PATCH /api/admin/document/:id
 * @access  private
 */
exports.toggleVerify = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const document = yield documentModel_1.default.findById({ _id: docId });
    if (document) {
        document.isVerified = !document.isVerified;
        const updated = yield document.save();
        if (updated) {
            res.status(200).json({
                success: true,
            });
        }
    }
    else {
        res.status(404);
        next(Error("Document not found"));
    }
}));
/**
 * @disc    Get a single tutor
 * @route   GET /api/admin/tutor/:id
 * @access  private
 */
exports.getSingleTutor = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const tutor = yield teacherProfile_1.default.findOne({ userID: userId }, { name: 1 });
    if (tutor) {
        res.status(200).json({
            success: true,
            tutor: tutor,
        });
    }
    else {
        res.status(404);
        next(Error("No user found!"));
    }
}));
/**
 * @disc    Get a single tutor
 * @route   GET /api/admin/get-users
 * @access  private
 */
exports.getDashboardDetais = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.find({
        status: true,
        role: { $in: ["STUDENT", "TUTOR"] },
    });
    let year = req.query.year;
    const monthlyJoinnings = Array(12).fill(0);
    if (year) {
        year = parseInt(year);
    }
    else {
        year = new Date().getFullYear();
    }
    if (users) {
        users.forEach((user) => {
            const createdAt = new Date(user.createdAt);
            const userYear = createdAt.getFullYear();
            if (userYear === year) {
                const month = createdAt.getMonth();
                monthlyJoinnings[month]++;
            }
        });
        const students = yield studentProfile_1.default.countDocuments();
        const teachers = yield teacherProfile_1.default.countDocuments();
        res.json({
            monthlyJoinnings,
            students,
            teachers,
        });
    }
    else {
        res.status(500);
        next(Error("Internal serer Error"));
    }
}));
