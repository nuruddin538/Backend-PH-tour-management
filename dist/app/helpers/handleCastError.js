"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (
// eslint-disable-next-line @typescript-eslint/no-unused-vars
err) => {
    return {
        statusCode: 400,
        message: "Invalid MongoDB objectID. Please provide a valid id",
    };
};
exports.handleCastError = handleCastError;
