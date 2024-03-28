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
exports.getAllTutors = exports.getMyStudents = exports.getStudentsPosts = exports.updateTutorProfile = exports.updateProfilePicture = exports.getProfile = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const teacherProfile_1 = __importDefault(require("../model/teacherProfile"));
const mongoose_1 = __importDefault(require("mongoose"));
const studnetPostModet_1 = __importDefault(require("../model/studnetPostModet"));
const requestModal_1 = __importDefault(require("../model/requestModal"));
const studentProfile_1 = __importDefault(require("../model/studentProfile"));
const userModel_1 = __importDefault(require("../model/userModel"));
/**
 * @disc    get tutor profile
 * @route   GET /api/tutor
 * @access  private
 */
exports.getProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const userProfile = yield teacherProfile_1.default.findOne({ userID: userId });
    if (userProfile) {
        res.status(200).json({
            success: true,
            userProfile: userProfile,
        });
    }
    else {
        return next(Error("Somthing went wrong"));
    }
}));
/**
 * @disc    get tutor profile
 * @route   GET /api/tutor
 * @access  private
 */
exports.updateProfilePicture = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userID = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const { url } = req.body;
    const updatedUser = yield teacherProfile_1.default.findOneAndUpdate({ userID: new mongoose_1.default.Types.ObjectId(userID) }, {
        profile: url,
    }, {
        new: true,
    });
    if (updatedUser) {
        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            userProfile: updatedUser,
        });
    }
    else {
        res.status(400);
        return next(Error("Some Error Occured"));
    }
}));
/**
 * @disc    Update studnet profile
 * @route   POST /api/student/updateProfile
 * @access  private
 */
exports.updateTutorProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const { name, phone, bio, qualification, languages, pricing } = req.body.data;
    const updatedUser = yield teacherProfile_1.default.findOneAndUpdate({ userID: userId }, {
        name: name,
        phone: parseInt(phone, 10),
        bio: bio,
        qualification: qualification,
        languages: languages,
        pricing: parseInt(pricing, 10),
    }, { new: true });
    if (updatedUser) {
        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            userProfile: updatedUser,
        });
    }
    else {
        res.status(400);
        return next(Error("Some Error Occured"));
    }
}));
/**
 * @disc    Get Studnets Posts
 * @route   GET /api/tutor/posts
 * @access  private
 */
exports.getStudentsPosts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const posts = yield studnetPostModet_1.default.aggregate([
        { $match: { isDelete: false } },
        {
            $lookup: {
                from: "students",
                localField: "studentId",
                foreignField: "userID",
                as: "profile",
            },
        },
        { $unwind: "$profile" },
        {
            $project: {
                isDelete: 0,
                __v: 0,
                "profile._id": 0,
                "profile.userID": 0,
                "profile.phone": 0,
                "profile.dob": 0,
                "profile.gender": 0,
                "profile.standard": 0,
                "profile.subjects": 0,
                "profile.intrests": 0,
                "profile.__v": 0,
                "profile.preffered_language": 0,
            },
        },
    ]);
    const teacherId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
    for (const post of posts) {
        const connection = yield requestModal_1.default.findOne({
            studentId: post.studentId,
            teacherId,
        });
        if (connection) {
            post.reqStatus = connection.status;
        }
        else {
            post.reqStatus = "NONE";
        }
    }
    if (posts) {
        res.status(200).json({
            success: true,
            posts: posts,
        });
    }
    else {
        next(Error("No Student Posts"));
    }
}));
/**
 * @disc    Get My students
 * @route   GET /api/tutor/myStudents
 * @access  private
 */
exports.getMyStudents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const teacherId = (_e = req.user) === null || _e === void 0 ? void 0 : _e._id;
    const posts = [];
    const teacher = yield teacherProfile_1.default.findOne({ userID: teacherId }, { connections: 1 });
    const connections = (teacher === null || teacher === void 0 ? void 0 : teacher.connections) ? teacher === null || teacher === void 0 ? void 0 : teacher.connections : [];
    for (const student of connections) {
        const Mystydent = yield studentProfile_1.default.findOne({ userID: student }, { connections: 0, __v: 0, profile: 0, dob: 0 });
        if (student) {
            posts.push(Mystydent);
        }
    }
    res.status(200).json({
        success: true,
        students: posts,
    });
}));
/**
 * @disc    Get all tuttos
 * @route   GET /api/tutor/all
 * @access  public
 */
exports.getAllTutors = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 8;
    const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f._id;
    let tutors = yield userModel_1.default.aggregate([
        { $match: { status: true } },
        {
            $project: {
                _id: 1,
            },
        },
        {
            $lookup: {
                from: "ratings",
                localField: "_id",
                foreignField: "tutorId",
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
                from: "teachers",
                localField: "_id",
                foreignField: "userID",
                as: "profile",
            },
        },
        {
            $unwind: {
                path: "$profile",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                profile: 1,
                isInConnection: {
                    $cond: {
                        if: { $isArray: "$profile.connections" },
                        then: { $in: [userId, "$profile.connections"] },
                        else: false,
                    },
                },
                averageRating: 1,
            },
        },
        {
            $match: {
                profile: { $exists: true },
            },
        },
        {
            $lookup: {
                from: "requests",
                let: { teacherId: "$profile.userID", studentId: userId },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $or: [
                                            { $eq: ["$teacherId", "$$teacherId"] },
                                            { $eq: ["$studentId", "$$studentId"] },
                                        ],
                                    },
                                    { $eq: ["$status", "PENDING"] },
                                ],
                            },
                        },
                    },
                ],
                as: "requests",
            },
        },
        {
            $project: {
                profile: 1,
                isInConnection: 1,
                averageRating: 1,
                isRequested: {
                    $cond: {
                        if: { $gt: [{ $size: "$requests" }, 0] },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $skip: (page - 1) * pageSize,
        },
        {
            $limit: pageSize,
        },
    ]);
    if (req.query.search) {
        const query = req.query.search
            .toLowerCase()
            .replace(/\s/g, "");
        tutors = tutors.filter((e) => {
            const language = e.profile.languages
                .join(",")
                .toLowerCase()
                .replace(/\s/g, "");
            if (language.includes(query)) {
                return true;
            }
            else if (query.includes(language)) {
                return true;
            }
            const qualification = e.profile.qualification
                .join(",")
                .toLowerCase()
                .replace(/\s/g, "");
            if (qualification.includes(query)) {
                return true;
            }
            else if (query.includes(qualification)) {
                return true;
            }
            const name = e.profile.name.toLowerCase().replace(/\s/g, "");
            if (name.includes(query)) {
                return true;
            }
            else if (query.includes(name)) {
                return true;
            }
        });
    }
    if (req.query.language) {
        const query = req.query.language;
        tutors = tutors.filter((e) => {
            const language = e.profile.languages;
            if (language.includes(query)) {
                return true;
            }
            else if (query.includes(language)) {
                return true;
            }
        });
    }
    if (req.query.qualification) {
        const query = req.query.qualification;
        tutors = tutors.filter((e) => {
            const qualification = e.profile.qualification;
            if (qualification.includes(query)) {
                return true;
            }
            else if (query.includes(qualification)) {
                return true;
            }
        });
    }
    const sortQuery = req.query.sort;
    switch (sortQuery) {
        case "low-high":
            tutors.sort((a, b) => {
                const priceA = parseFloat(a.profile.pricing);
                const priceB = parseFloat(b.profile.pricing);
                return priceA - priceB;
            });
            break;
        case "high-low":
            tutors.sort((a, b) => {
                const priceA = parseFloat(a.profile.pricing);
                const priceB = parseFloat(b.profile.pricing);
                return priceB - priceA;
            });
            break;
        case "popular":
            tutors.sort((a, b) => {
                const ratingA = parseFloat(a.averageRating);
                const ratingB = parseFloat(b.averageRating);
                return ratingB - ratingA;
            });
            break;
        default:
            break;
    }
    let count = yield teacherProfile_1.default.countDocuments();
    count = Math.ceil(count / 8);
    if (tutors) {
        res.status(200).json({
            success: true,
            tutors,
            count,
        });
    }
}));
