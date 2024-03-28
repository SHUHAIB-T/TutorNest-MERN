"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
require("dotenv/config");
const envvalid_1 = require("./utils/envvalid");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = (0, express_1.default)();
const corsConfig = {
    origin: envvalid_1.env.ENVIRONMENT === "development"
        ? envvalid_1.env.FRONTENT_URL
        : envvalid_1.env.FRONTENT_URL_DEPLOYED,
    credentials: true,
};
envvalid_1.env.ENVIRONMENT === "development" && app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsConfig));
app.use("/api", userRoute_1.default);
//error handler
app.use("*", errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
