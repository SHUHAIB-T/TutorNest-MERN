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
exports.verifyCertificate = exports.getCertificate = exports.createCertificate = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const certficateModel_1 = __importDefault(require("../model/certficateModel"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @desc    create a certificate
 * @route   POST    api/certificate.
 * @access  private
 */
exports.createCertificate = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { courseId, ID } = req.body;
    const certificate = yield certficateModel_1.default.findOneAndUpdate({
        userId: userId,
        courseId: new mongoose_1.default.Types.ObjectId(courseId),
    }, {
        courseId: new mongoose_1.default.Types.ObjectId(courseId),
        userId: new mongoose_1.default.Types.ObjectId(userId),
        ID: ID,
    }, {
        new: true,
        upsert: true,
    });
    if (certificate) {
        res.status(200).json({
            success: true,
            certificate,
        });
    }
    else {
        res.status(500);
        next(Error("Inernal server Error"));
    }
}));
/**
 * @desc    Get certificate
 * @route   GET    api/certificate/:id.
 * @access  private
 */
exports.getCertificate = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const courseId = req.params.id;
    const certificate = yield certficateModel_1.default.findOne({ userId, courseId });
    if (certificate) {
        res.status(200).json({
            success: true,
            certificate,
        });
    }
    else {
        res.status(404);
        next(Error("certificate not found"));
    }
}));
/**
 * @desc    verify certificate
 * @route   POST    api/certificate/verify.
 * @access  public
 */
exports.verifyCertificate = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ID } = req.body;
    const certificate = yield certficateModel_1.default.aggregate([
        { $match: { ID: ID } },
        {
            $lookup: {
                from: "students",
                localField: "userId",
                foreignField: "userID",
                as: "user",
            },
        },
        {
            $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
        },
        {
            $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "_id",
                as: "course",
            },
        },
        {
            $unwind: { path: "$course", preserveNullAndEmptyArrays: true },
        },
        {
            $project: {
                ID: 1,
                "user.name": 1,
                "course.title": 1,
                createdAt: 1,
            },
        },
    ]);
    if (certificate) {
        if (certificate.length > 0) {
            res.status(200).json({
                success: true,
                certificate: certificate[0],
            });
        }
        else {
            res.status(200).json({
                success: false,
            });
        }
    }
    else {
        res.status(404);
        next(Error("certificate not found"));
    }
}));
