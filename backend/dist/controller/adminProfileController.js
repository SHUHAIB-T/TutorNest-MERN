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
exports.updateProfilePicture = exports.getAdminProfile = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminProfile_1 = __importDefault(require("../model/adminProfile"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @desc    Get Admin Profile
 * @route   GET api/admin
 * @access  private
 */
exports.getAdminProfile = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const userProfile = yield adminProfile_1.default.findOne({ userID: userId });
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
 * @disc    Update Profile Picture
 * @route   GET /api/admin/updateProfilePicture
 * @access  private
 */
exports.updateProfilePicture = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userID = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const { url } = req.body;
    const updatedUser = yield adminProfile_1.default.findOneAndUpdate({ userID: new mongoose_1.default.Types.ObjectId(userID) }, {
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
