"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRazorpayPayment = exports.createRazorpayOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const envvalid_1 = require("./envvalid");
const crypto_1 = __importDefault(require("crypto"));
const instance = new razorpay_1.default({
    key_id: envvalid_1.env.RAZ_KEY_ID,
    key_secret: envvalid_1.env.RAZ_SECRET_KEY,
});
const createRazorpayOrder = (id, amount) => {
    return new Promise((resolve, reject) => {
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: id.toString(),
        };
        instance.orders.create(options, function (err, order) {
            if (err) {
                reject(err);
            }
            resolve(order);
        });
    });
};
exports.createRazorpayOrder = createRazorpayOrder;
const verifyRazorpayPayment = (order_id, payment_id, signature) => {
    const hmac = crypto_1.default.createHmac("sha256", envvalid_1.env.RAZ_SECRET_KEY);
    hmac.update(order_id + "|" + payment_id);
    const generatedSignature = hmac.digest("hex");
    return generatedSignature === signature;
};
exports.verifyRazorpayPayment = verifyRazorpayPayment;
