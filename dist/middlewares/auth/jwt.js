"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// 필요한것들
// refresh , access 토큰 만들기
// refresh 토큰 검증
// access 토큰 검증
// 카카오껀지
require("../../config/env");
const auth_dao_1 = __importDefault(require("../../auth/auth.dao"));
const typedi_1 = require("typedi");
const db_1 = __importDefault(require("../../config/db"));
const response_1 = require("../../config/response");
const baseResponse_1 = __importDefault(require("../../config/baseResponse"));
const winston_1 = __importDefault(require("../../config/winston"));
const jwt = require('jsonwebtoken');
const create_access_token = (user_id) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        resolve(jwt.sign({
            user_id,
        }, process.env.JWT_ACCESS_SECRET, {
            //ACCESS_TOKEN_SECRET 키를 이용하여 jwt를 만들어서 리턴을 해줌
            expiresIn: '180days', // 토큰 유효시간 10분임
        }));
    }));
};
// refresh token 은 페이로드가 없음
const create_refresh_token = () => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        resolve(jwt.sign({}, process.env.JWT_REFRESH_SECRET, {
            //ACCESS_TOKEN_SECRET 키를 이용하여 jwt를 만들어서 리턴을 해줌
            expiresIn: '180days', // 토큰 유효시간 10분임
        }));
    }));
};
const check_access_token = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const access_token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const secret_key = process.env.JWT_ACCESS_SECRET;
        // check 가 true면 Access , false면 Refresh
        // const payload = jwt.decode(token, secret_key);
        const token = yield jwt.verify(access_token, secret_key);
        // body에 GET_USER_ID 을 넣어서 보내줌
        req.body.user_id = token.user_id;
        next();
    }
    catch (err) {
        // 유효기간이 초과된 경우
        if (err.name === 'TokenExpiredError') {
            res.send((0, response_1.response)(baseResponse_1.default.TOKEN_VERIFICATION_FAILURE)); // 419 추가예정
        }
        // 토큰의 비밀키가 일치하지 않는 경우
        res.send((0, response_1.response)(baseResponse_1.default.TOKEN_VERIFICATION_FAILURE)); // 419 추가예정
        winston_1.default.error(`App - Update_board BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
    }
});
const check_refresh_token = (refresh_token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secret_key = process.env.JWT_REFRESH_SECRET;
        const token = yield jwt.verify(refresh_token, secret_key);
        return {
            token,
            success: true,
        };
    }
    catch (error) {
        // 유효기간이 초과된 경우
        if (error.name === 'TokenExpiredError') {
            return { success: false, msg: '토큰이 만료되었습니다.' }; // 419 추가예정
        }
        // 토큰의 비밀키가 일치하지 않는 경우
        return { success: false, msg: '유효하지 않은 토큰입니다.' }; // 401 추가예정
    }
});
const save_refresh_token = (id, refresh_token) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield db_1.default.getConnection((conn) => __awaiter(void 0, void 0, void 0, function* () { return conn; }));
    try {
        const authRepository = typedi_1.Container.get(auth_dao_1.default);
        const refresh_info = [refresh_token, id];
        const a = yield authRepository.update_refresh_token(conn, refresh_info);
        conn.commit();
        return a;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        conn.release();
    }
});
module.exports = {
    save_refresh_token,
    check_refresh_token,
    check_access_token,
    create_access_token,
    create_refresh_token,
};
//# sourceMappingURL=jwt.js.map