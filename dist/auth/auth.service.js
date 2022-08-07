"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
require("reflect-metadata");
const auth_dao_1 = __importDefault(require("./auth.dao"));
require("../config/env");
const jwt_1 = __importDefault(require("../middlewares/auth/jwt"));
const db_1 = __importDefault(require("../config/db"));
const response_1 = require("../config/response");
const winston_1 = __importDefault(require("../config/winston"));
const baseResponse_1 = __importDefault(require("../config/baseResponse"));
const Log = __importStar(require("../middlewares/adminlog/log.dao"));
const bcrypt = require('bcrypt');
const axios = require('axios');
const fetch = require('node-fetch');
const KAKAO_LOGIN_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_DATA_URL = 'https://kapi.kakao.com/v2/user/me';
const KAKAO_REFRESH_TOKEN = 'https://kauth.kakao.com/oauth/token';
const KAKAO_REDIRECT_URI = 'http://localhost:8080/api/auth/kakao/callback';
// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할
// 데이터를 검증한 후 제대로 받았을경우
// 비밀번호 암호화 기능
// 토큰 발급 기능 다 넣기
let AuthService = AuthService_1 = class AuthService {
    constructor() {
        this.authRepository = typedi_1.Container.get(auth_dao_1.default);
    }
    login(user_name, password, social_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const user_data = yield this.authRepository.get_user_data(conn, user_name);
                // 로그인 성공 체크 변수
                let check;
                let access_token;
                let refresh_token;
                if (user_data.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.LOGIN_FAIL);
                }
                // 자체 로그인일 경우 비밀번호 확인함
                if (user_data[0].register == 'SELF') {
                    // 해쉬 알고리즘으로 비밀번호 같은지 체크함
                    check = yield bcrypt.compare(password, user_data[0].password);
                }
                // 카카오 일 경우 유저 아이디만 확인함
                if (user_data[0].register == 'KAKAO') {
                    check = social_id == user_data[0].social_id ? true : false;
                }
                // 로그인 성공시
                if (check) {
                    access_token = yield jwt_1.default.create_access_token(user_data[0].user_id);
                    refresh_token = yield jwt_1.default.create_refresh_token();
                    // 리프레시 토큰 디비에 저장
                    yield jwt_1.default.save_refresh_token(user_data[0].user_id, refresh_token);
                    yield conn.commit();
                    yield Log.save_user_log(user_data[0].user_id, 'UPDATE');
                    return (0, response_1.response)(baseResponse_1.default.SUCCESS, {
                        access_token,
                        refresh_token,
                        user_id: user_data[0].user_id,
                    });
                }
                else {
                    return (0, response_1.response)(baseResponse_1.default.LOGIN_FAIL);
                }
            }
            catch (err) {
                winston_1.default.error(`App - login AuthService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    kakao_login() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                client_id: process.env.KAKAO_CLIENT_ID,
                redirect_uri: KAKAO_REDIRECT_URI,
                response_type: 'code',
            };
            const params = new URLSearchParams(config).toString();
            const finalUrl = `${KAKAO_LOGIN_URL}?${params}`;
            return finalUrl;
        });
    }
    kakao_login_callback(code) {
        return __awaiter(this, void 0, void 0, function* () {
            // 받은 코드로 access , refresh token을 받음
            try {
                const baseUrl = 'https://kauth.kakao.com/oauth/token';
                const config = {
                    client_id: process.env.KAKAO_CLIENT_ID,
                    grant_type: 'authorization_code',
                    redirect_uri: 'http://localhost:8080/api/auth/kakao/callback',
                    code,
                };
                const params = new URLSearchParams(config).toString();
                const finalUrl = `${baseUrl}?${params}`;
                const kakaoTokenRequest = yield fetch(finalUrl, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json', // 이 부분을 명시하지않으면 text로 응답을 받게됨
                    },
                });
                const json = yield kakaoTokenRequest.json();
                let res_data;
                //access_token으로 사용자 정보 불러옴
                if (json.access_token != undefined) {
                    res_data = yield AuthService_1.get_kakao_data(json.access_token);
                }
                else {
                    return 'access_token 없음';
                }
                // res_data 에서 userid 뽑아서 db에서 검색 후
                // 가입하지않았으면 login fail 넣어주고
                // 가입했으면 login success
                // access , refresh token 을 보내줌
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, {
                    id: res_data.id,
                    access_token: json.access_token,
                    refresh_token: json.refresh_token,
                }); // 프론트엔드에서 확인하려고
            }
            catch (err) {
                winston_1.default.error(`App - kakao_login_callback AuthService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
        });
    }
    static get_kakao_data(access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const get_data = yield axios({
                    method: 'get',
                    url: KAKAO_DATA_URL,
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                });
                return get_data.data;
            }
            catch (err) {
                winston_1.default.error(`App - get_kakao_data AuthService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
        });
    }
    // refresh_token 으로 access_token 재발급 받기
    kakao_get_access_token(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    grant_type: 'refresh_token',
                    client_id: `${process.env.KAKAO_CLIENT_ID}`,
                    refresh_token: `${refresh_token}`,
                };
                const params = new URLSearchParams(data).toString();
                const finalUrl = `${KAKAO_REFRESH_TOKEN}?${params}`;
                let kakao_token;
                kakao_token = yield axios.post(finalUrl).catch((err) => {
                    return { status: err.response.status, data: err.response.data };
                });
                if (kakao_token != undefined) {
                    if (kakao_token.refresh_token != undefined) {
                        // 리프레시 토큰 디비에 다시넣기
                    }
                    return kakao_token.access_token;
                }
            }
            catch (err) {
                winston_1.default.error(`App - kakao_get_access_token AuthService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
        });
    }
    auto_login(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const check_refresh_token = yield jwt_1.default.check_refresh_token(refresh_token);
                if (!check_refresh_token.success) {
                    return (0, response_1.response)(baseResponse_1.default.TOKEN_VERIFICATION_FAILURE);
                }
                const get_user_data = yield this.authRepository.get_by_refresh_token(conn, refresh_token);
                if (get_user_data.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.TOKEN_VERIFICATION_FAILURE);
                }
                else {
                    const access_token = yield jwt_1.default.create_access_token(get_user_data[0].user_id);
                    yield Log.save_user_log(get_user_data[0].user_id, 'READ');
                    return (0, response_1.response)(baseResponse_1.default.SUCCESS, { access_token });
                }
            }
            catch (err) {
                conn.rollback();
                winston_1.default.error(`App - auto_login AuthService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
        });
    }
};
AuthService = AuthService_1 = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map