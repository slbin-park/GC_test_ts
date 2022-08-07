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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
require("reflect-metadata");
// 서비스에 이걸 임포트 해야함
const db_1 = __importDefault(require("../config/db"));
const response_1 = require("../config/response");
const winston_1 = __importDefault(require("../config/winston"));
const baseResponse_1 = __importDefault(require("../config/baseResponse"));
const Log = __importStar(require("../middlewares/adminlog/log.dao"));
const auth_dao_1 = __importDefault(require("../auth/auth.dao"));
const user_dao_1 = __importDefault(require("./user.dao"));
const jwt_1 = __importDefault(require("../middlewares/auth/jwt"));
const bcrypt = require('bcrypt');
const saltRounds = 10;
// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할
// 데이터를 검증한 후 제대로 받았을경우
// 비밀번호 암호화 기능
// 토큰 발급 기능 다 넣기
let UserService = class UserService {
    constructor() {
        this.userRepository = typedi_1.Container.get(user_dao_1.default);
        this.authRepository = typedi_1.Container.get(auth_dao_1.default);
    }
    Save(user_name, phone_number, name, password, birthday, register, user_status, accept_date) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield conn.beginTransaction();
                const check_user_name = yield this.authRepository.get_by_user_name(conn, user_name);
                if (check_user_name.length) {
                    return (0, response_1.response)(baseResponse_1.default.SIGNUP_REDUNDANT_USER_NAME);
                }
                const refresh_token = yield jwt_1.default.create_refresh_token();
                password = yield bcrypt.hash(password, saltRounds);
                const SaveData = [
                    user_name,
                    phone_number,
                    name,
                    password,
                    birthday,
                    register,
                    accept_date,
                    refresh_token,
                ];
                const user_id = yield this.userRepository.save(conn, SaveData);
                const access_token = yield jwt_1.default.create_access_token(user_id.insertId);
                // save 에 필요함
                yield conn.commit();
                yield Log.save_user_log(user_id.insertId, 'CREATE');
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, {
                    user_id: user_id.insertId,
                    access_token,
                    refresh_token,
                });
            }
            catch (err) {
                yield conn.rollback();
                winston_1.default.error(`App - SaveUser UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Save_Kakao(user_name, phone_number, name, password, birthday, register, user_status, accept_date, social_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield conn.beginTransaction();
                const refresh_token = yield jwt_1.default.create_refresh_token();
                const SaveUserKakaoData = [
                    user_name,
                    phone_number,
                    name,
                    password,
                    birthday,
                    register,
                    user_status,
                    accept_date,
                    social_id,
                    refresh_token,
                ];
                const user_id = yield this.userRepository.save_kakao(conn, SaveUserKakaoData);
                const access_token = yield jwt_1.default.create_access_token(user_id.insertId);
                yield conn.commit();
                yield Log.save_user_log(user_id.insertId, 'CREATE');
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, {
                    user_id: user_id.insertId,
                    user_name,
                    access_token,
                    refresh_token,
                });
            }
            catch (err) {
                yield conn.rollback();
                winston_1.default.error(`App - Save_Kakao UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Find() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const Find_response = yield this.userRepository.find(conn);
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, Find_response);
            }
            catch (err) {
                winston_1.default.error(`App - Find UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Find_Id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const Find_Id_response = yield this.userRepository.findById(conn, id);
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, Find_Id_response);
            }
            catch (err) {
                winston_1.default.error(`App - Find_Id UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Find_user_name(user_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const Find_Id_response = yield this.authRepository.get_by_user_name(conn, user_name);
                if (Find_Id_response.length) {
                    return (0, response_1.response)(baseResponse_1.default.SIGNUP_REDUNDANT_USER_NAME);
                }
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                winston_1.default.error(`App - Find_user_name Service error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Update_user_name(user_name, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const update_user_name_data = [user_name, user_id];
                const Find_Id_response = yield this.authRepository.get_by_user_name(conn, user_name);
                if (Find_Id_response.length) {
                    return (0, response_1.response)(baseResponse_1.default.SIGNUP_REDUNDANT_USER_NAME);
                }
                const count_change_user_name = yield this.userRepository.get_change_user_name_count(conn, user_id);
                if (count_change_user_name.length >= 2) {
                    return (0, response_1.response)(baseResponse_1.default.CHANGE_USER_NAME_OVER);
                }
                yield this.userRepository.update_user_name(conn, update_user_name_data);
                yield this.userRepository.save_user_name_change(conn, user_id);
                yield conn.commit();
                yield Log.save_user_log(user_id, 'UPDATE');
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                conn.rollback();
                winston_1.default.error(`App - Find_user_name Service error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Update_user_status(user_id, user_status) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const update_user_status_info = [user_status, user_id];
                const res_update_user_status = yield this.userRepository.update_user_status(conn, update_user_status_info);
                if (user_status == 'DELETE') {
                    yield this.userRepository.delete_board(conn, user_id);
                    yield this.userRepository.delete_follow(conn, user_id);
                }
                yield conn.commit();
                yield Log.save_user_log(user_id, user_status);
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                conn.rollback();
                winston_1.default.error(`App - Update_user_status Service error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Update_user_psword(phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const check_user_phone = yield this.userRepository.get_user_psword(conn, phone);
                if (!check_user_phone.length) {
                    return (0, response_1.response)(baseResponse_1.default.USER_NOTHING);
                }
                password = yield bcrypt.hash(password, saltRounds);
                const update_user_info = [password, phone];
                const update_user_psword = yield this.userRepository.update_user_password(conn, update_user_info);
                yield conn.commit();
                yield Log.save_user_log(check_user_phone[0].user_id, 'UPDATE');
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                conn.rollback();
                winston_1.default.error(`App - Update_user_status Service error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
};
UserService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map