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
exports.deleteDocument = exports.getMydocmunts = exports.uploadDoc = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const documentModel_1 = __importDefault(require("../model/documentModel"));
/**
 * @disc    Upload tutor doc upload
 * @route   POST /api/tutor/updateProfile
 * @access  PROTECTED
 */
exports.uploadDoc = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { image, name } = req.body;
    const uploadDoc = yield documentModel_1.default.create({
        name: name,
        document: image,
        userID: userId,
    });
    if (uploadDoc) {
        res.status(200).json({
            success: true,
            message: "Document Uploaded Successfully!",
        });
    }
    else {
        next(Error("Error uploading the Document"));
    }
}));
/**
 * @disc    Upload tutor doc upload
 * @route   POST /api/tutor/updateProfile
 * @access  PROTECTED
 */
exports.getMydocmunts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const documents = yield documentModel_1.default.find({ userID: userId });
    res.status(200).json({
        success: true,
        documents: documents,
    });
}));
/**
 * @disc    Upload tutor doc upload
 * @route   POST /api/tutor/updateProfile
 * @access  PROTECTED
 */
exports.deleteDocument = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    yield documentModel_1.default.findByIdAndDelete({ _id: id });
    res.status(200);
    res.json({
        success: true,
    });
}));
