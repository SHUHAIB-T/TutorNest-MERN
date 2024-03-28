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
exports.getUserProfile = exports.resetPassword = exports.checkPassword = exports.googleAuth = exports.userLogin = exports.userSignup = exports.verifyOTP = exports.verifyMail = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const axios_1 = __importDefault(require("axios"));
const mailConfig_1 = require("../config/mailConfig");
const otpModel_1 = __importDefault(require("../model/otpModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateTocken_1 = require("../utils/generateTocken");
const studentProfile_1 = __importDefault(require("../model/studentProfile"));
const teacherProfile_1 = __importDefault(require("../model/teacherProfile"));
const adminProfile_1 = __importDefault(require("../model/adminProfile"));
/**
 * @disc    Sending OTP through mail
 * @route   POST /api/verify-email
 * @access  PUBLIC
 */
exports.verifyMail = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const isExist = yield userModel_1.default.findOne({ email: email });
    if (isExist) {
        res.status(401);
        return next(Error("Email Already Exist"));
    }
    // generating random number
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP============>>>>>>>>>", otp);
    // saving OTP to db
    const salt = yield bcryptjs_1.default.genSalt(10);
    yield otpModel_1.default.findOneAndUpdate({ email: email }, { $set: { email, otp: yield bcryptjs_1.default.hash(otp.toString(), salt) } }, { upsert: true, new: true });
    const mailOptions = {
        from: "hitutornest@gmail.com",
        to: email,
        subject: "Welcome to TutorNesrt",
        text: `This is your OTP for verification ${otp}`,
    };
    // Send the email
    mailConfig_1.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        }
        else {
            console.log("Email sent:", info.response);
        }
    });
    res.status(200).json({
        success: true,
        message: "OTP sent",
    });
}));
/**
 * @disc    Verifying OTP
 * @route   POST /api/verify-otp
 * @access  PUBLIC
 */
exports.verifyOTP = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const OTP = yield otpModel_1.default.findOne({ email: email });
    if (OTP && (yield OTP.matchOTP(otp))) {
        res.status(200).json({
            success: true,
            message: "Email verified Successfully",
        });
    }
    else {
        res.status(401).json({
            success: false,
            message: "Invalid OTP",
        });
    }
}));
/**
 * @disc    user signup
 * @route   POST /api/signup
 * @access  PUBLIC
 */
exports.userSignup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role, phone } = req.body;
    const isExist = yield userModel_1.default.findOne({ email: email });
    if (!isExist) {
        const createUser = yield userModel_1.default.create({
            email: email,
            password: password,
            role: role,
        });
        const tocken = (0, generateTocken_1.generateTocken)(createUser._id);
        if (createUser) {
            if (createUser.role === "STUDENT") {
                yield studentProfile_1.default.create({
                    userID: createUser._id,
                    phone: phone,
                    name: name,
                });
            }
            else if (createUser.role === "TUTOR") {
                yield teacherProfile_1.default.create({
                    userID: createUser._id,
                    phone: phone,
                    name: name,
                });
            }
            else if (createUser.role === "ADMIN") {
                yield adminProfile_1.default.create({
                    userID: createUser._id,
                    phone: phone,
                    name: name,
                });
            }
            res.status(200).json({
                success: true,
                message: "User creatred successfully",
                user: {
                    _id: createUser._id,
                    email: createUser.email,
                    role: createUser.role,
                },
                tocken: tocken,
            });
        }
        else {
            res.status(500);
            throw new Error("Something went wrong");
        }
    }
    else {
        res.status(401);
        throw new Error("Email Already Exist");
    }
}));
/**
 * @disc    user login
 * @route   POST /api/login
 * @access  PUBLIC
 */
exports.userLogin = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email: email });
    if (user) {
        if (user.status) {
            if (user.password && (yield user.matchPassword(password))) {
                const tocken = (0, generateTocken_1.generateTocken)(user._id);
                res.status(200).json({
                    success: true,
                    tocken: tocken,
                    user: {
                        _id: user._id,
                        email: user.email,
                        role: user.role,
                    },
                });
            }
            else {
                res.status(401);
                return next(Error("Invalid Credentials"));
            }
        }
        else {
            res.status(401);
            return next(Error("this account has been blocked!"));
        }
    }
    else {
        res.status(401);
        return next(Error("User Not Found!"));
    }
}));
/**
 * @disc    Google Auth
 * @route   POST /api/googleAuth
 * @access  PUBLIC
 */
exports.googleAuth = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, role } = req.body;
    // Fetch additional user data using the access token
    const response = yield axios_1.default.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const { name, email, picture, } = response.data;
    const isExist = yield userModel_1.default.findOne({ email: email });
    if (isExist) {
        if (isExist.password) {
            res.status(400);
            return next(Error("Cannot Login without password"));
        }
        else {
            if (!isExist.status) {
                next(Error("This account has been blocked!"));
            }
            const tocken = (0, generateTocken_1.generateTocken)(isExist._id);
            res.status(200).json({
                success: true,
                user: {
                    _id: isExist._id,
                    email: isExist.email,
                    role: isExist.role,
                },
                tocken: tocken,
            });
        }
    }
    else {
        if (role !== "PUBLIC") {
            const user = yield userModel_1.default.create({
                email: email,
                role: role,
            });
            if (user.role === "STUDENT") {
                yield studentProfile_1.default.create({
                    name: name,
                    userID: user._id,
                    profile: picture,
                });
            }
            else if (user.role === "TUTOR") {
                yield teacherProfile_1.default.create({
                    name: name,
                    userID: user._id,
                    profile: picture,
                });
            }
            const tocken = (0, generateTocken_1.generateTocken)(user._id);
            res.status(200).json({
                success: true,
                user: {
                    _id: user._id,
                    email: user.email,
                    role: user.role,
                },
                tocken: tocken,
            });
        }
        else {
            res.status(400);
            return next(Error("Signup as Tutor/student"));
        }
    }
}));
/**
 * @disc    Check current Password
 * @route   POST /api/resetPassword
 * @access  PROTECTED
 */
exports.checkPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { currentPassword } = req.body;
    const user = yield userModel_1.default.findById({ _id: id });
    if (user && (yield user.matchPassword(currentPassword))) {
        res.status(200).json({
            success: true,
            message: "password matching",
        });
    }
    else {
        res.status(401);
        next(Error("Invalid Password"));
    }
}));
/**
 * @disc    Check current Password
 * @route   PAST /api/resetPassword
 * @access  PROTECTED
 */
exports.resetPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id;
    const { newPassworrd } = req.body;
    const user = yield userModel_1.default.findById({ _id: id });
    if (user) {
        user.password = newPassworrd;
        const updated = yield user.save();
        if (updated) {
            res.status(200).json({
                success: true,
                message: "password updated Successfully!",
            });
        }
        else {
            next(Error("some Error occured"));
        }
    }
}));
/**
 * @disc    Check current Password
 * @route   PAST /api/userProfile/:id
 * @access  PROTECTED
 */
exports.getUserProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userModel_1.default.findById(id);
    let userProfile;
    if ((user === null || user === void 0 ? void 0 : user.role) === "TUTOR") {
        userProfile = yield teacherProfile_1.default.findOne({ userID: id }, { name: 1, profile: 1, _id: 0, userID: 1 });
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === "STUDENT") {
        userProfile = yield studentProfile_1.default.findOne({ userID: id }, { name: 1, profile: 1, _id: 0, userID: 1 });
    }
    if (userProfile) {
        res.status(200).json({ success: true, userProfile });
    }
    else {
        next(Error("Internal server error"));
    }
}));
