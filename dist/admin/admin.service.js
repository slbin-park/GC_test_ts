"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const admin_dao_1 = __importDefault(require("./admin.dao"));
const bcrypt = require('bcrypt');
const saltRounds = 10;
let AdminService = class AdminService {
    constructor() {
        this.adminRepository = typedi_1.Container.get(admin_dao_1.default);
    }
    Get_user_data(user_id, user_name, user_status, create_at) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                let alphasql = '';
                if (user_id) {
                    alphasql += `WHERE user_id = ${user_id}`;
                }
                if (user_name) {
                    if (alphasql == '') {
                        alphasql += `WHERE user_name = '${user_name}'`;
                    }
                    else {
                        alphasql += `AND user_name = '${user_name}'`;
                    }
                }
                if (user_status) {
                    if (alphasql == '') {
                        alphasql += `WHERE user_status = '${user_status}'`;
                    }
                    else {
                        alphasql += `AND user_status = '${user_status}'`;
                    }
                }
                if (create_at) {
                    if (alphasql == '') {
                        alphasql += `WHERE DATE_FORMAT(create_at, '%Y-%m-%d')  = STR_TO_DATE('${create_at}','%Y%m%d')`;
                    }
                    else {
                        alphasql += `AND DATE_FORMAT(create_at, '%Y-%m-%d')  = STR_TO_DATE('${create_at}','%Y%m%d')`;
                    }
                }
                alphasql += `
      ORDER BY create_at DESC;
      `;
                const get_user_data = yield this.adminRepository.get_user_data(conn, alphasql);
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, get_user_data);
            }
            catch (err) {
                winston_1.default.error(`App - Get_user_data AdminService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Get_user_data_user_id(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const get_user_data = yield this.adminRepository.get_user_data_user_id(conn, user_id);
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, get_user_data);
            }
            catch (err) {
                winston_1.default.error(`App - Get_user_data_user_id AdminService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Update_user_data_user_id(user_info, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield this.adminRepository.update_user_data_user_id(conn, user_info);
                conn.commit();
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                conn.rollback();
                winston_1.default.error(`App - Update_user_data_user_id AdminService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Delete_user_admin(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield this.adminRepository.delete_user_admin(conn, user_id);
                conn.commit();
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                winston_1.default.error(`App - Delete_user_admin AdminService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Delete_board_admin(board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield this.adminRepository.delete_feed_admin(conn, board_id);
                conn.commit();
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                winston_1.default.error(`App - Delete_board_admin AdminService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Get_feed_data(user_id, board_status, create_at) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                let alphasql = '';
                if (user_id) {
                    alphasql += `WHERE b.user_id_fk = ${user_id}`;
                }
                if (board_status) {
                    if (alphasql == '') {
                        alphasql += `WHERE b.board_status = '${board_status}'`;
                    }
                    else {
                        alphasql += `AND b.board_status = '${board_status}'`;
                    }
                }
                if (create_at) {
                    if (alphasql == '') {
                        alphasql += `WHERE DATE_FORMAT(b.create_at, '%Y-%m-%d')  = STR_TO_DATE('${create_at}','%Y%m%d')`;
                    }
                    else {
                        alphasql += `AND DATE_FORMAT(b.create_at, '%Y-%m-%d')  = STR_TO_DATE('${create_at}','%Y%m%d')`;
                    }
                }
                alphasql += `
      ORDER BY b.create_at DESC;
      `;
                const get_feed_data = yield this.adminRepository.get_feed_data(conn, alphasql);
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, get_feed_data);
            }
            catch (err) {
                winston_1.default.error(`App - Get_feed_data AdminService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Get_feed_all_board_id(board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const get_reply_data = yield this.adminRepository.get_feed_reply_data(conn, board_id);
                const get_feed_like_data = yield this.adminRepository.get_feed_like_data(conn, board_id);
                const get_feed_img = yield this.adminRepository.get_feed_img(conn, board_id);
                const get_reply_like = yield this.adminRepository.get_reply_like_data(conn, board_id);
                const res_data = {
                    feed_img: get_feed_img,
                    feed_like: get_feed_like_data,
                    reply: get_reply_data,
                    repl_like: get_reply_like,
                };
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, res_data);
            }
            catch (err) {
                winston_1.default.error(`App - Get_feed_reply_board_id AdminService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
};
AdminService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AdminService);
exports.default = AdminService;
//# sourceMappingURL=admin.service.js.map