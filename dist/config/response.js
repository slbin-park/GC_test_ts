"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errResponse = exports.response = void 0;
const response = ({ isSuccess, code, msg }, result) => {
    return {
        isSuccess,
        code,
        msg,
        result,
    };
};
exports.response = response;
const errResponse = ({ isSuccess, code, message }) => {
    return {
        isSuccess,
        code,
        message,
    };
};
exports.errResponse = errResponse;
//# sourceMappingURL=response.js.map