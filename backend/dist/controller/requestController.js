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
exports.getAllMyTutors = exports.deleteRequest = exports.acceptRequest = exports.getAllmyRequests = exports.CancelConnection = exports.createConnection = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const requestModal_1 = __importDefault(require("../model/requestModal"));
const teacherProfile_1 = __importDefault(require("../model/teacherProfile"));
const studentProfile_1 = __importDefault(require("../model/studentProfile"));
/**
 * @disc    Create Request
 * @route   POST /api/tutor/createConnection
 * @access  private
 */
exports.createConnection = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (req.body.studentId) {
        const teacherId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { studentId } = req.body;
        const aleadySent = yield requestModal_1.default.findOne({
            teacherId: teacherId,
            studentId: studentId,
        });
        if (!aleadySent) {
            const creatConnection = yield requestModal_1.default.create({
                studentId,
                teacherId,
                createdBy: teacherId,
            });
            if (creatConnection) {
                res.status(200).json({
                    success: true,
                    message: "Connection request sent",
                });
            }
            else {
                next(Error("Somethig went wrong"));
            }
        }
        else {
            res.status(402);
            next(Error("Request Allready sent!"));
        }
    }
    else if (req.body.teacherId) {
        const studentId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const { teacherId } = req.body;
        const aleadySent = yield requestModal_1.default.findOne({
            teacherId: teacherId,
            studentId: studentId,
        });
        if (!aleadySent) {
            const creatConnection = yield requestModal_1.default.create({
                studentId,
                teacherId,
                createdBy: studentId,
            });
            if (creatConnection) {
                res.status(200).json({
                    success: true,
                    message: "Connection request sent",
                });
            }
            else {
                next(Error("Somethig went wrong"));
            }
        }
        else {
            res.status(402);
            next(Error("Request Allready sent!"));
        }
    }
}));
/**
 * @disc    Cancel Request
 * @route   POST /api/tutor/cancelConnection
 * @access  private
 */
exports.CancelConnection = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    if (req.body.studentId) {
        const teacherId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        const { studentId } = req.body;
        const deleteRequest = yield requestModal_1.default.findOneAndDelete({
            studentId: studentId,
            teacherId: teacherId,
        });
        if (deleteRequest) {
            res.status(200).json({
                success: true,
                message: "Connection request sent",
            });
        }
        else {
            next(Error("Somethig went wrong"));
        }
    }
    else if (req.body.teacherId) {
        const studentId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
        const { teacherId } = req.body;
        const deleteRequest = yield requestModal_1.default.findOneAndDelete({
            studentId: studentId,
            teacherId: teacherId,
        });
        if (deleteRequest) {
            res.status(200).json({
                success: true,
                message: "Connection request sent",
            });
        }
        else {
            next(Error("Somethig went wrong"));
        }
    }
}));
/**
 * @disc    get My requests
 * @route   GET /api/student/request
 * @access  private
 */
exports.getAllmyRequests = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    const user = (_e = req.user) === null || _e === void 0 ? void 0 : _e.role;
    if (user === "STUDENT") {
        const studentId = (_f = req.user) === null || _f === void 0 ? void 0 : _f._id;
        const requests = yield requestModal_1.default.aggregate([
            {
                $match: {
                    studentId: studentId,
                    status: "PENDING",
                    createdBy: { $ne: studentId },
                },
            },
            {
                $lookup: {
                    from: "teachers",
                    localField: "teacherId",
                    foreignField: "userID",
                    as: "teacher",
                },
            },
            { $unwind: "$teacher" },
            {
                $project: {
                    "teacher.name": 1,
                    "teacher.profile": 1,
                    "teacher.bio": 1,
                    _id: 1,
                    status: 1,
                    teacherId: 1,
                    studentId: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);
        if (requests) {
            res.status(200).json({
                success: true,
                requests,
            });
        }
        else {
            next(Error("No requests found"));
        }
    }
    else if (user === "TUTOR") {
        const teacherId = (_g = req.user) === null || _g === void 0 ? void 0 : _g._id;
        const requests = yield requestModal_1.default.aggregate([
            {
                $match: {
                    teacherId: teacherId,
                    status: "PENDING",
                    createdBy: { $ne: teacherId },
                },
            },
            {
                $lookup: {
                    from: "students",
                    localField: "studentId",
                    foreignField: "userID",
                    as: "student",
                },
            },
            { $unwind: "$student" },
            {
                $project: {
                    "student.name": 1,
                    "student.profile": 1,
                    "student.intrests": 1,
                    "student.subjects": 1,
                    _id: 1,
                    status: 1,
                    teacherId: 1,
                    studentId: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);
        if (requests) {
            res.status(200).json({
                success: true,
                requests,
            });
        }
        else {
            next(Error("No requests found"));
        }
    }
}));
/**
 * @disc    Accept Request
 * @route   POST /api/student/acceptRequest/:id
 * @access  private
 */
exports.acceptRequest = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    if (req.body.teacherId) {
        const id = req.params.id;
        const studentId = (_h = req.user) === null || _h === void 0 ? void 0 : _h._id;
        const { teacherId } = req.body;
        const updateRequest = yield requestModal_1.default.findByIdAndUpdate({ _id: id }, { status: "CONNECTED" }, { new: true });
        const updateTutor = yield teacherProfile_1.default.findOneAndUpdate({ userID: teacherId }, { $push: { connections: studentId } });
        const updateStudent = yield studentProfile_1.default.findOneAndUpdate({ userID: studentId }, { $push: { connections: teacherId } });
        if (updateRequest && updateStudent && updateTutor) {
            res.status(200).json({
                success: true,
                message: "Request accepted",
            });
        }
        else {
            next(Error("Some Error Occured"));
        }
    }
    else if (req.body.studentId) {
        const id = req.params.id;
        const teacherId = (_j = req.user) === null || _j === void 0 ? void 0 : _j._id;
        const { studentId } = req.body;
        const updateRequest = yield requestModal_1.default.findByIdAndUpdate({ _id: id }, { status: "CONNECTED" }, { new: true });
        const updateTutor = yield teacherProfile_1.default.findOneAndUpdate({ userID: teacherId }, { $push: { connections: studentId } });
        const updateStudent = yield studentProfile_1.default.findOneAndUpdate({ userID: studentId }, { $push: { connections: teacherId } });
        if (updateRequest && updateStudent && updateTutor) {
            res.status(200).json({
                success: true,
                message: "Request accepted",
            });
        }
        else {
            next(Error("Some Error Occured"));
        }
    }
}));
/**
 * @disc    Delete requests
 * @route   POST /api/student/deleteRequest/:id
 * @access  private
 */
exports.deleteRequest = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deleteRequest = yield requestModal_1.default.findOneAndDelete({ _id: id });
    if (deleteRequest) {
        res.status(200).json({
            success: true,
            message: "Request Rejected",
        });
    }
    else {
        next(Error("Error Deleting the request"));
    }
}));
/**
 * @disc    get My tutors
 * @route   POST /api/student/mytutors
 * @access  private
 */
exports.getAllMyTutors = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const studentId = (_k = req.user) === null || _k === void 0 ? void 0 : _k._id;
    const student = yield studentProfile_1.default.findOne({ userID: studentId }, { connections: 1 });
    const connectionsArray = student === null || student === void 0 ? void 0 : student.connections;
    const teachers = yield teacherProfile_1.default.find({ userID: { $in: connectionsArray } }, {
        name: 1,
        profile: 1,
        userID: 1,
        bio: 1,
    });
    if (teachers) {
        res.status(200).json({
            success: true,
            teachers,
        });
    }
    else {
        next(Error("you have no tutors yet"));
    }
}));
