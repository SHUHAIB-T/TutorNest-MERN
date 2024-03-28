"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const envalid_1 = require("envalid");
// validasting and accessing environment variables
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)(),
    MONGO_URI: (0, envalid_1.str)(),
    JWT_SECRET: (0, envalid_1.str)(),
    RAZ_KEY_ID: (0, envalid_1.str)(),
    RAZ_SECRET_KEY: (0, envalid_1.str)(),
    ENVIRONMENT: (0, envalid_1.str)(),
    FRONTENT_URL: (0, envalid_1.str)(),
    FRONTENT_URL_DEPLOYED: (0, envalid_1.str)(),
});
