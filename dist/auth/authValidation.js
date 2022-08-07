"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_login_vali = exports.check_code = exports.post_access_token_vali = void 0;
const baseResponse_1 = __importDefault(require("../config/baseResponse"));
// refresh_token이 있는지
const post_access_token_vali = (req, res, next) => {
    if (req.headers.authorization == undefined) {
        res.send(baseResponse_1.default.REFRESH_TOKEN_NOTHING);
    }
    else {
        next();
    }
};
exports.post_access_token_vali = post_access_token_vali;
const post_login_vali = (req, res, next) => {
    const { user_name, password } = req.body;
    if (!user_name) {
        res.send(baseResponse_1.default.SIGNUP_USERNAME_EMPTY);
    }
    else if (!password) {
        res.send(baseResponse_1.default.SIGNUP_PASSWORD_EMPTY);
    }
    else {
        next();
    }
};
exports.post_login_vali = post_login_vali;
const check_code = (req, res, next) => {
    const code = req.query.code;
    if (code != undefined) {
        next();
    }
    else {
        // 엑세스 토큰이 없으면 로그인페이지로 리다이렉트
        return res.redirect('/login');
    }
};
exports.check_code = check_code;
//# sourceMappingURL=authValidation.js.map