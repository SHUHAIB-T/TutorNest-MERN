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
exports.getAllMycourse = exports.updateProgress = exports.verifyPayment = exports.createEnrollment = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const enrollmentModel_1 = __importDefault(require("../model/enrollmentModel"));
const razorpayOrder_1 = require("../utils/razorpayOrder");
const studentProfile_1 = __importDefault(require("../model/studentProfile"));
const paymentModel_1 = __importDefault(require("../model/paymentModel"));
const courseModel_1 = __importDefault(require("../model/courseModel"));
const lessonModel_1 = __importDefault(require("../model/lessonModel"));
/**
 * @desc     create Enrollment
 * @route    POST  api/enrollment/create
 * @access   private
 */
exports.createEnrollment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { courseId } = req.body;
    const studentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const course = yield courseModel_1.default.findOne({ _id: courseId }, { _id: 0, price: 1 });
    const amount = course === null || course === void 0 ? void 0 : course.price;
    const enrollment = yield enrollmentModel_1.default.findOneAndUpdate({
        courseId: courseId,
        studentId: studentId,
    }, {
        courseId: courseId,
        studentId: studentId,
        payment_status: "pending",
    }, {
        new: true,
        upsert: true,
    });
    const user = yield studentProfile_1.default.findOne({ userID: studentId }, { name: 1, phone: 1 });
    const Razorder = yield (0, razorpayOrder_1.createRazorpayOrder)(enrollment._id, amount)
        .then((order) => order)
        .catch((err) => {
        if (err) {
            res.status(500);
            next(Error("Error occured in razorpay"));
        }
    });
    const timestamp = Razorder.created_at;
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toISOString();
    yield paymentModel_1.default.findOneAndUpdate({
        enrollmentId: enrollment._id,
    }, {
        paymentId: Razorder.id,
        amount: Razorder.amount / 100,
        currency: Razorder.currency,
        enrollmentId: enrollment._id,
        status: Razorder.status,
        created_at: formattedDate,
    }, {
        upsert: true,
    });
    res.status(200).json({
        success: true,
        order: Razorder,
        user,
    });
}));
/**
 * @desc     verify payment
 * @route    POST  api/enrollment/verify
 * @access   private
 */
exports.verifyPayment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const isVerified = (0, razorpayOrder_1.verifyRazorpayPayment)(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (isVerified) {
        const payment = yield paymentModel_1.default.findOne({ paymentId: razorpay_order_id }, { _id: 0, enrollmentId: 1 });
        if (payment) {
            const enrollmentId = payment.enrollmentId;
            yield enrollmentModel_1.default.findOneAndUpdate({ _id: enrollmentId }, { payment_status: "completed" });
            res.json({
                success: true,
                message: "payment verified successfull",
            });
        }
    }
    else {
        res.status(500);
        next(Error("Internal Server Error"));
    }
}));
/**
 * @desc     update Progress
 * @route    POST  api/enrollment/update-progress
 * @access   private
 */
exports.updateProgress = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const { lessonId, courseId } = req.body;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const enrollement = yield enrollmentModel_1.default.findOne({
        courseId: courseId,
        studentId: userId,
    });
    const lessons = yield lessonModel_1.default.find({ courseId: courseId });
    const progress = yield enrollmentModel_1.default.findOneAndUpdate({
        courseId: courseId,
        studentId: userId,
    }, {
        $addToSet: {
            completed: lessonId,
        },
        isComplete: ((_c = enrollement === null || enrollement === void 0 ? void 0 : enrollement.completed) === null || _c === void 0 ? void 0 : _c.length) === lessons.length - 1 ||
            ((_d = enrollement === null || enrollement === void 0 ? void 0 : enrollement.completed) === null || _d === void 0 ? void 0 : _d.length) === lessons.length
            ? true
            : false,
    }, {
        new: true,
    });
    if (progress) {
        res.status(200).json({
            success: true,
            progress: progress.completed,
            isComplete: progress.isComplete,
        });
    }
    else {
        res.status(500);
        next(Error("Internal Server Error"));
    }
}));
/**
 * @desc     get All my courses
 * @route    POST  api/student/my-courses
 * @access   private
 */
exports.getAllMycourse = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const studentId = (_e = req.user) === null || _e === void 0 ? void 0 : _e._id;
    const enrollments = yield enrollmentModel_1.default.aggregate([
        { $match: { payment_status: "completed", studentId: studentId } },
        {
            $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "_id",
                as: "course",
                pipeline: [
                    {
                        $lookup: {
                            from: "lessons",
                            localField: "_id",
                            foreignField: "courseId",
                            as: "lessons",
                        },
                    },
                    {
                        $lookup: {
                            from: "certificates",
                            localField: "_id",
                            foreignField: "courseId",
                            as: "certificate",
                            pipeline: [{ $match: { userId: studentId } }],
                        },
                    },
                    {
                        $project: {
                            lessons: 1,
                            title: 1,
                            description: 1,
                            coverIMG: 1,
                            price: 1,
                            language: 1,
                            hasCertificate: { $eq: [{ $size: "$certificate" }, 1] },
                        },
                    },
                ],
            },
        },
        {
            $unwind: { path: "$course", preserveNullAndEmptyArrays: true },
        },
        {
            $project: {
                _id: 1,
                courseId: 1,
                completed: 1,
                isComplete: 1,
                "course.title": 1,
                "course.description": 1,
                "course.coverIMG": 1,
                "course.price": 1,
                "course.language": 1,
                "course.hasCertificate": 1,
                "course.lessons.title": 1,
                "course.lessons._id": 1,
                "course.lessons.description": 1,
                "course.lessons.video": 1,
                "course.lessons.duration": 1,
            },
        },
    ]);
    if (enrollments) {
        res.status(200).json({
            success: true,
            enrollments,
        });
    }
    else {
        res.status(500);
        next(Error("Internal server Error"));
    }
}));
