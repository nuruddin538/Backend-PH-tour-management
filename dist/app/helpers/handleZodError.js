"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleZodError = (err) => {
    const errorSources = [];
    console.log(err.issues);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err.issues.forEach((issue) => {
        errorSources.push({
            // path: "nickname inside lastname inside name"
            // path: issue.path.reverse().join("inside")
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        });
    });
    return {
        statusCode: 400,
        message: "Zod Error",
    };
};
exports.handleZodError = handleZodError;
