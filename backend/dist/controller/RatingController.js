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
exports.getMyCourseRating = exports.createCourseRating = exports.getMyTutorRating = exports.createTutorRating = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const RatingModel_1 = __importDefault(require("../model/RatingModel"));
/**
 * @disc    create Rating
 * @route   POST /api/rating
 * @access  private
 */
exports.createTutorRating = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, review, _id } = req.body;
    const user = req.user;
    const createRating = yield RatingModel_1.default.findOneAndUpdate({
        userId: user === null || user === void 0 ? void 0 : user._id,
        tutorId: _id,
    }, {
        rating: parseInt(rating, 10),
        review: review,
    }, {
        new: true,
        upsert: true,
    });
    if (createRating) {
        res.status(200).json({
            success: true,
            rating: createRating,
        });
    }
    else {
        next(Error("internel Server Error"));
    }
}));
/**
 * @disc    get
 * @route   GET /api/rating
 * @access  private
 */
exports.getMyTutorRating = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const getMyRating = yield RatingModel_1.default.find({
        userId: userId,
        tutorId: { $ne: null },
    });
    if (getMyRating) {
        res.status(200).json({
            success: true,
            ratings: getMyRating,
        });
    }
    else {
        res.status(500);
        next(Error("Internal Server Error"));
    }
}));
/**
 * @disc    create Rating
 * @route   POST /api/rating/course
 * @access  private
 */
exports.createCourseRating = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, review, _id } = req.body;
    const user = req.user;
    const createRating = yield RatingModel_1.default.findOneAndUpdate({
        userId: user === null || user === void 0 ? void 0 : user._id,
        courseId: _id,
    }, {
        rating: parseInt(rating, 10),
        review: review,
    }, {
        new: true,
        upsert: true,
    });
    if (createRating) {
        res.status(200).json({
            success: true,
            rating: createRating,
        });
    }
    else {
        next(Error("internel Server Error"));
    }
}));
/**
 * @disc    get all my course
 * @route   GET /api/rating/course
 * @access  private
 */
exports.getMyCourseRating = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const getMyRating = yield RatingModel_1.default.find({
        userId: userId,
        courseId: { $ne: null },
    });
    if (getMyRating) {
        res.status(200).json({
            success: true,
            ratings: getMyRating,
        });
    }
    else {
        res.status(500);
        next(Error("Internal Server Error"));
    }
}));
