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
exports.updateProfile = exports.updateStudentProfile = exports.getProfile = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const studentProfile_1 = __importDefault(require("../model/studentProfile"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @disc    get studnet profile
 * @route   GET /api/student
 * @access  PROTECTED
 */
exports.getProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const userProfile = yield studentProfile_1.default.findOne({ userID: userId });
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
 * @disc    Update studnet profile
 * @route   POST /api/student/updateProfile
 * @access  PROTECTED
 */
exports.updateStudentProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const { name, phone, dob, gender, standard, subjects, intrests, preffered_language, } = req.body.data;
    const updatedUser = yield studentProfile_1.default.findOneAndUpdate({ userID: userId }, {
        name: name,
        phone: parseInt(phone, 10),
        dob: dob,
        gender: gender,
        subjects: subjects,
        intrests: intrests,
        standard: standard,
        preffered_language: preffered_language,
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
 * @disc    Update student profile pitcture
 * @route   PATCH /api/student/updateProfile
 * @access  PROTECTED
 */
exports.updateProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userID = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const { url } = req.body;
    const updatedUser = yield studentProfile_1.default.findOneAndUpdate({ userID: new mongoose_1.default.Types.ObjectId(userID) }, {
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
