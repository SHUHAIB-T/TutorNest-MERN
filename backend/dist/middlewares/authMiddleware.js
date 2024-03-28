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
exports.isLoggedIn = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../model/userModel"));
const envvalid_1 = require("../utils/envvalid");
const mongoose_1 = __importDefault(require("mongoose"));
exports.protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.cookies.token;
    const role = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, envvalid_1.env.JWT_SECRET);
            const userId = new mongoose_1.default.Types.ObjectId(decoded.userId);
            const user = yield userModel_1.default.findOne({ _id: userId });
            if (!user || user.role !== role) {
                res.status(401);
                next(Error("Unauthorized user"));
            }
            else if (!user.status) {
                res.status(401);
                next(Error("Account has been blocked"));
            }
            else {
                req.user = user;
            }
            next();
        }
        catch (error) {
            res.status(401);
            next(new Error("Not authorized, token failed"));
        }
    }
    else {
        res.status(401);
        res.status(401);
        next(new Error("Not authorized, token failed"));
    }
}));
exports.isLoggedIn = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, envvalid_1.env.JWT_SECRET);
            const userId = new mongoose_1.default.Types.ObjectId(decoded.userId);
            const user = yield userModel_1.default.findOne({ _id: userId });
            if (user) {
                req.user = user;
                next();
            }
            else {
                next();
            }
        }
        catch (error) {
            next();
        }
    }
    else {
        next();
    }
}));
