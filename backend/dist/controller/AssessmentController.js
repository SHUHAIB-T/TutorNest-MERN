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
exports.checkAssessment = exports.getAssessment = exports.createAssessment = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const assismentModel_1 = __importDefault(require("../model/assismentModel"));
/**
 * @disc    create Assessment
 * @route   POST /api/assessment
 * @access  private
 */
exports.createAssessment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, minimumMark, questions } = req.body;
    const creatAssessment = yield assismentModel_1.default.findOneAndUpdate({
        courseId: courseId,
    }, {
        minimumMark: parseInt(minimumMark, 10),
        questions: questions,
    }, {
        new: true,
        upsert: true,
    });
    if (creatAssessment) {
        res.status(200).json({
            success: true,
            message: "assessment created Successfully",
            assessment: creatAssessment,
        });
    }
    else {
        res.status(500);
        next(Error("Internal Server Error!"));
    }
}));
/**
 * @disc    get Assessment
 * @route   GET /api/assessment/id
 * @access  private
 */
exports.getAssessment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const assessment = yield assismentModel_1.default.findOne({ courseId: courseId });
    if (assessment) {
        res.status(200).json({
            success: true,
            assessment,
        });
    }
    else {
        res.status(500);
        next(Error("Internal Server Error"));
    }
}));
/**
 * @disc    get Assessment
 * @route   POST /api/assessment/verify
 * @access  private
 */
exports.checkAssessment = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { assessmentId, studentAnswers } = req.body;
    const assessment = yield assismentModel_1.default.findOne({
        _id: assessmentId,
    });
    if (!assessment) {
        res.status(404);
        next(Error("No Assessment found!"));
    }
    let obtainedScore = 0;
    assessment === null || assessment === void 0 ? void 0 : assessment.questions.forEach((question) => {
        const studentAnswer = studentAnswers.find((answer) => answer.id === question.id);
        if (!studentAnswer) {
            return;
        }
        if (studentAnswer.answer === question.answer) {
            obtainedScore += question.mark;
        }
    });
    const totalScore = assessment === null || assessment === void 0 ? void 0 : assessment.questions.reduce((total, question) => total + question.mark, 0);
    if (totalScore && (assessment === null || assessment === void 0 ? void 0 : assessment.minimumMark)) {
        const percentage = (obtainedScore / totalScore) * 100;
        if (percentage >= assessment.minimumMark) {
            res.status(200).json({
                success: true,
                obtainedScore,
                totalScore,
                percentage,
                minimumMark: assessment.minimumMark,
            });
        }
        else {
            res.json({
                success: false,
                obtainedScore,
                totalScore,
                percentage,
                minimumMark: assessment.minimumMark,
            });
        }
    }
}));
