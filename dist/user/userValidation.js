"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.put_user_psword = exports.put_user_status = exports.put_user_name = exports.get_user_name = exports.post_user_vali = void 0;
const baseResponse_1 = __importDefault(require("../config/baseResponse"));
const post_user_vali = (req, res, next) => {
    const { social_id, register, user_name, phone_number, password, birthday, accept_date, name } = req.body;
    const user_psword_regex = new RegExp(/[`~!@#$%^&*|\\\'\";:\/?]/gi);
    if (!register) {
        res.send(baseResponse_1.default.SIGNUP_REGISTER_EMPTY);
        return;
    }
    if (register == 'KAKAO') {
        if (social_id == undefined) {
            res.send(baseResponse_1.default.SIGNUP_SOCIALID_EMPTY);
            return;
        }
    }
    if (!name) {
        res.send(baseResponse_1.default.SIGNUP_NAME_EMPTY);
        return;
    }
    if (!user_name) {
        res.send(baseResponse_1.default.SIGNUP_USERNAME_EMPTY);
        return;
    }
    if (user_name.length <= 2 || user_name.length > 20) {
        res.send(baseResponse_1.default.SIGNUP_USERNAME_LENGTH);
        return;
    }
    if (!phone_number) {
        res.send(baseResponse_1.default.SIGNUP_PHONENUMBER_EMPTY);
        return;
    }
    if (!password) {
        res.send(baseResponse_1.default.SIGNUP_PASSWORD_EMPTY);
        return;
    }
    //비밀번호 체크
    if (register == 'SELF') {
        if (!user_psword_regex.test(password) || password.length <= 5 || password.length > 20) {
            res.send(baseResponse_1.default.SIGNUP_PASSWORD_LENGTH);
            return;
        }
    }
    if (!birthday) {
        res.send(baseResponse_1.default.SIGNUP_BIRTHDAY_EMPTY);
        return;
    }
    if (!accept_date) {
        res.send(baseResponse_1.default.SIGNUP_ACCEPTDATE_EMPTY);
        return;
    }
    next();
};
exports.post_user_vali = post_user_vali;
const get_user_name = (req, res, next) => {
    const { user_name } = req.params;
    if (!user_name) {
        res.send(baseResponse_1.default.SIGNUP_USERNAME_EMPTY);
        return;
    }
    else if (user_name.length <= 2 || user_name.length > 20) {
        res.send(baseResponse_1.default.SIGNUP_USERNAME_LENGTH);
        return;
    }
    else {
        next();
    }
};
exports.get_user_name = get_user_name;
const put_user_name = (req, res, next) => {
    const { user_name } = req.body;
    if (!user_name) {
        res.send(baseResponse_1.default.SIGNUP_USERNAME_EMPTY);
        return;
    }
    else {
        next();
    }
};
exports.put_user_name = put_user_name;
const put_user_status = (req, res, next) => {
    const { user_status } = req.body;
    if (!user_status) {
        res.send(baseResponse_1.default.CHANGE_USER_STATUS_EMPTY);
    }
    else if (user_status != 'PRIVATE' && user_status != 'ACTIVE' && user_status != 'DELETE') {
        res.send(baseResponse_1.default.USER_STATUS_WRONG);
    }
    else {
        next();
    }
};
exports.put_user_status = put_user_status;
const put_user_psword = (req, res, next) => {
    const { phone_number, password } = req.body;
    const user_psword_regex = new RegExp(/[`~!@#$%^&*|\\\'\";:\/?]/gi);
    if (!phone_number) {
        res.send(baseResponse_1.default.SIGNUP_PHONENUMBER_EMPTY);
    }
    else if (!password) {
        res.send(baseResponse_1.default.SIGNUP_PASSWORD_EMPTY);
    }
    else if (!user_psword_regex.test(password) || password.length <= 5 || password.length > 20) {
        res.send(baseResponse_1.default.SIGNUP_PASSWORD_LENGTH);
        return;
    }
    else {
        next();
    }
};
exports.put_user_psword = put_user_psword;
//# sourceMappingURL=userValidation.js.map