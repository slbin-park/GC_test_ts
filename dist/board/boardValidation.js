"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_reply_like_vali = exports.put_board_edit_vali = exports.post_board_report_vali = exports.post_reply_report_vali = exports.post_reply_vali = exports.post_board_vali = void 0;
const baseResponse_1 = __importDefault(require("../config/baseResponse"));
const post_board_vali = (req, res, next) => {
    const { board_content } = req.body;
    if (!board_content) {
        res.send(baseResponse_1.default.BOARD_CONTENT_EMPTY);
        return;
    }
    else if (board_content.length > 1000) {
        res.send(baseResponse_1.default.BOARD_EDIT_CONTENT_LEGNTH);
    }
    next();
};
exports.post_board_vali = post_board_vali;
const post_reply_vali = (req, res, next) => {
    const { board_id, reply_content } = req.body;
    if (!board_id) {
        res.send(baseResponse_1.default.REPLY_BOARDID_EMPTY);
    }
    else if (!reply_content) {
        res.send(baseResponse_1.default.REPLY_REPLYCONTENT_EMPTY);
    }
    else {
        // 모든 데이터 다 있을경우 넘김
        next();
    }
};
exports.post_reply_vali = post_reply_vali;
const post_reply_like_vali = (req, res, next) => {
    const { board_id } = req.body;
    if (!board_id) {
        res.send(baseResponse_1.default.REPLY_BOARDID_EMPTY);
    }
    else {
        // 모든 데이터 다 있을경우 넘김
        next();
    }
};
exports.post_reply_like_vali = post_reply_like_vali;
const post_reply_report_vali = (req, res, next) => {
    const { report_content } = req.body;
    if (!report_content) {
        res.send(baseResponse_1.default.REPLY_REPORT_REPORTCONTENT_EMPTY);
    }
    else {
        next();
    }
};
exports.post_reply_report_vali = post_reply_report_vali;
const post_board_report_vali = (req, res, next) => {
    const { report_content } = req.body;
    if (!report_content) {
        res.send(baseResponse_1.default.BOARD_REPORT_REPORTCONTENT_EMPTY);
    }
    else {
        next();
    }
};
exports.post_board_report_vali = post_board_report_vali;
const put_board_edit_vali = (req, res, next) => {
    const { board_content } = req.body;
    if (!board_content) {
        res.send(baseResponse_1.default.BOARD_EDIT_CONTENT_EMPTY);
    }
    else if (board_content.length > 1000) {
        res.send(baseResponse_1.default.BOARD_EDIT_CONTENT_LEGNTH);
    }
    else {
        next();
    }
};
exports.put_board_edit_vali = put_board_edit_vali;
//# sourceMappingURL=boardValidation.js.map