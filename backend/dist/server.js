"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const envvalid_1 = require("./utils/envvalid");
const mongoose_1 = __importDefault(require("mongoose"));
const Socket_1 = require("./Socket");
const PORT = envvalid_1.env.PORT || 5000;
mongoose_1.default.connect(envvalid_1.env.MONGO_URI).then(() => {
    console.log("Database connected successfully");
    const server = app_1.default.listen(PORT, () => console.log(`server running on port ${PORT}`));
    (0, Socket_1.setUpSocket)(server);
});
