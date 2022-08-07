"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.put_user_profile = exports.post_follow_vali = void 0;
const baseResponse_1 = __importDefault(require("../config/baseResponse"));
// refresh_token이 있는지
const post_follow_vali = (req, res, next) => {
    const { user_id } = req.body;
    const follow_user_id = req.params.user_id;
    if (user_id == follow_user_id) {
        res.send(baseResponse_1.default.FOLLOW_NOT_SELF);
    }
    else {
        next();
    }
};
exports.post_follow_vali = post_follow_vali;
const put_user_profile = (req, res, next) => {
    const { profileUrl, website, introduction } = req.body;
    if (profileUrl == undefined) {
        res.send(baseResponse_1.default.PROFILE_URL_EMPTY);
    }
    else if (website == undefined) {
        res.send(baseResponse_1.default.WEBSITE__EMPTY);
    }
    else if (introduction == undefined) {
        res.send(baseResponse_1.default.INTRODUCTION_EMPTY);
    }
    else {
        next();
    }
};
exports.put_user_profile = put_user_profile;
//# sourceMappingURL=profileValidation.js.map