"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.userLeft = exports.userJoin = exports.users = void 0;
exports.users = [];
const userJoin = (socketId, userId) => {
    const user = exports.users.find((user) => user.userId === userId);
    if (user) {
        return false;
    }
    exports.users.push({ socketId, userId });
    return true;
};
exports.userJoin = userJoin;
const userLeft = (socketId) => {
    exports.users = exports.users.filter((user) => user.socketId !== socketId);
};
exports.userLeft = userLeft;
const getUsers = () => exports.users;
exports.getUsers = getUsers;
