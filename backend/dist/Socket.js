"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpSocket = void 0;
const socket_io_1 = require("socket.io");
const user_1 = require("./utils/user");
const setUpSocket = (server) => {
    const ORIGIN = "https://tutornest.online";
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: ORIGIN,
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        socket.on("setUser", (userId) => {
            (0, user_1.userJoin)(socket.id, userId);
            io.emit("getUsers", (0, user_1.getUsers)());
        });
        socket.on("hello", (data) => {
            console.log("this is from user", data);
        });
        socket.on("send-new-message", (data) => {
            var _a;
            const reciverId = (_a = data === null || data === void 0 ? void 0 : data.delivered_to) === null || _a === void 0 ? void 0 : _a.find((e) => e !== data.senderId);
            const deliverTo = user_1.users.find((e) => e.userId === reciverId);
            if (reciverId && deliverTo) {
                socket.to(deliverTo.socketId).emit("recieve-message", data);
            }
        });
        socket.on("deleteMessage", (data) => {
            var _a;
            const reciverId = (_a = data === null || data === void 0 ? void 0 : data.delivered_to) === null || _a === void 0 ? void 0 : _a.find((e) => e !== data.senderId);
            const deliverTo = user_1.users.find((e) => e.userId === reciverId);
            if (reciverId && deliverTo) {
                socket.to(deliverTo.socketId).emit("delete-message", data);
            }
        });
        socket.on("disconnect", () => {
            (0, user_1.userLeft)(socket.id);
            io.emit("getUsers", (0, user_1.getUsers)());
        });
    });
};
exports.setUpSocket = setUpSocket;
