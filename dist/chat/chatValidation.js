"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_chat_vali = void 0;
const baseResponse_1 = __importDefault(require("../config/baseResponse"));
// refresh_token이 있는지
const post_chat_vali = (req, res, next) => {
    const { message } = req.body;
    if (!message) {
        res.send(baseResponse_1.default.MESSAGE_EMPTY);
    }
    else if (message.length > 200) {
        res.send(baseResponse_1.default.MESSAGE_LENGTH);
    }
    else {
        next();
    }
};
exports.post_chat_vali = post_chat_vali;
//# sourceMappingURL=chatValidation.js.map