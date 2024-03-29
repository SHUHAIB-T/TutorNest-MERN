"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTocken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envvalid_1 = require("./envvalid");
const generateTocken = (userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, envvalid_1.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    return token;
};
exports.generateTocken = generateTocken;
