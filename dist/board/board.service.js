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
const board_dao_1 = __importDefault(require("./board.dao"));
require("../config/env");
const db_1 = __importDefault(require("../config/db"));
const Log = __importStar(require("../middlewares/adminlog/log.dao"));
const response_1 = require("../config/response");
const winston_1 = __importDefault(require("../config/winston"));
const baseResponse_1 = __importDefault(require("../config/baseResponse"));
// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할
// 데이터를 검증한 후 제대로 받았을경우
// 비밀번호 암호화 기능
// 토큰 발급 기능 다 넣기
let BoardService = class BoardService {
    constructor() {
        this.boardRepository = typedi_1.Container.get(board_dao_1.default);
    }
    Save_board(user_id, board_content, images) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            const board_status = 'ACTIVE';
            try {
                yield conn.beginTransaction();
                const boardInfo = [user_id, board_status, board_content];
                const res_Save_board = yield this.boardRepository.save(conn, boardInfo);
                const insertId = res_Save_board.insertId;
                const save_image = this.boardRepository.save_image;
                if (images != undefined) {
                    images.map((data) => __awaiter(this, void 0, void 0, function* () {
                        yield save_image(conn, insertId, data);
                    }));
                }
                yield conn.commit();
                yield Log.save_board_log(insertId, 'CREATE');
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                winston_1.default.error(`App - Save_board BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Get_board_id(board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const board = yield this.boardRepository.get_by_id(conn, board_id);
                if (!board.length) {
                    return (0, response_1.response)(baseResponse_1.default.BOARD_NOTHING);
                }
                const img = yield this.boardRepository.get_board_img(conn, board_id);
                const reply = yield this.boardRepository.get_board_reply(conn, board_id);
                board[0].img = img;
                board[0].reply = reply;
                yield Log.save_board_log(board_id, 'READ');
                yield conn.commit();
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, { board: board[0] });
            }
            catch (err) {
                winston_1.default.error(`App - Get_board_id BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Save_reply(replyInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield conn.beginTransaction();
                const { board_id, user_id, reply_content } = replyInfo;
                const reply_info = [board_id, user_id, reply_content];
                const check_board_id = yield this.boardRepository.get_by_id(conn, board_id);
                if (check_board_id.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.BOARD_NOTHING);
                }
                else {
                    yield Log.save_board_log(board_id, 'READ');
                    const reply_id = yield this.boardRepository.save_reply(conn, reply_info);
                    const insertId = reply_id.insertId;
                    yield conn.commit();
                    yield Log.save_reply_log(insertId, 'CREATE');
                }
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                winston_1.default.error(`App - Save_reply BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Save_board_like(board_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield conn.beginTransaction();
                const board_like_status = 'LIKE';
                // 게시글이 있는지 체크함
                const check_board_id = yield this.boardRepository.get_by_id(conn, board_id);
                if (check_board_id.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.BOARD_NOTHING);
                }
                yield Log.save_board_log(board_id, 'READ');
                // 문제점 자기가 눌렀는지 누가 눌렀는지 모름
                // FIX GET_USER_ID 도 같이 보내서 자기가 누른건지 확인함
                const board_like_info = [board_id, user_id];
                const check_board_like_id = yield this.boardRepository.get_by_id_board_like(conn, board_like_info);
                // 자신이 누른적이 있을경우
                if (check_board_like_id.length) {
                    const board_like = check_board_like_id[0];
                    const board_like_status_check = board_like.board_like_status;
                    const board_like_id = board_like.board_like_id;
                    //좋아요 취소를 했을경우 LIKE로 바꿔줌
                    if (board_like_status_check == 'UNLIKE') {
                        const board_like_const = [board_like_status, board_like_id];
                        yield this.boardRepository.update_board_like(conn, board_like_const);
                        yield conn.commit();
                        return (0, response_1.response)(baseResponse_1.default.SUCCESS);
                    }
                    // 이미 좋아요를 누른 게시글
                    return (0, response_1.response)(baseResponse_1.default.BOARD_ALREADY_LIKE);
                }
                const save_board_like_info = [board_id, board_like_status, user_id];
                this.boardRepository.save_board_like(conn, save_board_like_info);
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                winston_1.default.error(`App - Save_board_like BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Cancel_board_like(board_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield conn.beginTransaction();
                const board_like_status = 'UNLIKE';
                const check_board_id = yield this.boardRepository.get_by_id(conn, board_id);
                if (check_board_id.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.BOARD_NOTHING);
                }
                yield Log.save_board_log(board_id, 'READ');
                // 자신이 좋아요를 누른 기록이 있는지 확인
                const get_board_like_info = [board_id, user_id];
                const check_board_like_id = yield this.boardRepository.get_by_id_board_like(conn, get_board_like_info);
                // 좋아요 누른적이 있을경우에
                if (check_board_like_id.length) {
                    const board_like = check_board_like_id[0];
                    const board_like_status_check = board_like.board_like_status;
                    const board_like_id = board_like.board_like_id;
                    // LIKE 일 경우에 취소로 바꿔버림
                    if (board_like_status_check == 'LIKE') {
                        const update_board_like_info = [board_like_status, board_like_id];
                        yield this.boardRepository.update_board_like(conn, update_board_like_info);
                        yield conn.commit();
                        return (0, response_1.response)(baseResponse_1.default.SUCCESS);
                    }
                    // 아닐경우에는 이미 취소된 게시글
                    return (0, response_1.response)(baseResponse_1.default.BOARD_ALREADY_UNLIKE);
                }
                else {
                    // 좋아요 누른적이 없는데 취소를 했을경우
                    return (0, response_1.response)(baseResponse_1.default.BOARD_LIKE_NOTHING);
                }
            }
            catch (err) {
                winston_1.default.error(`App - Cancel_baord_like BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Save_reply_like(reply_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield conn.beginTransaction();
                const reply_like_status = 'LIKE';
                const check_board_id = yield this.boardRepository.get_by_id_reply(conn, reply_id);
                if (check_board_id.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.REPLY_NOTHING);
                }
                // 자신이 댓글을 좋아요를 누른 기록이 있는지 확인
                const get_reply_like_info = [reply_id, user_id];
                const check_reply_like = yield this.boardRepository.get_by_id_reply_like(conn, get_reply_like_info);
                // 좋아요 누른적이 있을경우에
                if (check_reply_like.length) {
                    const reply_like = check_reply_like[0];
                    const reply_like_status_check = reply_like.reply_status;
                    const reply_like_id = reply_like.reply_like_id;
                    // UNLIKE 일 경우에 LIKE 로 바꿈
                    if (reply_like_status_check == 'UNLIKE') {
                        const update_reply_like_info = [reply_like_status, reply_like_id];
                        yield this.boardRepository.update_reply_like(conn, update_reply_like_info);
                        conn.commit();
                        return (0, response_1.response)(baseResponse_1.default.SUCCESS);
                    }
                    // 아닐경우에는 이미 좋아요한 댓글
                    return (0, response_1.response)(baseResponse_1.default.REPLY_ALREADY_LIKE);
                }
                else {
                    const reply_like_info = [reply_id, reply_like_status, user_id];
                    yield this.boardRepository.save_reply_like(conn, reply_like_info);
                    conn.commit();
                    return (0, response_1.response)(baseResponse_1.default.SUCCESS);
                }
            }
            catch (err) {
                winston_1.default.error(`App - Save_reply_like BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Cancel_reply_like(reply_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const reply_like_status = 'UNLIKE';
                // 자신이 댓글을 좋아요를 누른 기록이 있는지 확인
                const get_reply_like_info = [reply_id, user_id];
                const check_reply_like = yield this.boardRepository.get_by_id_reply_like(conn, get_reply_like_info);
                // 좋아요 누른적이 있을경우에
                if (check_reply_like.length) {
                    const reply_like = check_reply_like[0];
                    const reply_like_status_check = reply_like.reply_status;
                    const reply_like_id = reply_like.reply_like_id;
                    // LIKE 일 경우에 UNLIKE 로 바꿈
                    if (reply_like_status_check == 'LIKE') {
                        const update_reply_like_info = [reply_like_status, reply_like_id];
                        yield this.boardRepository.update_reply_like(conn, update_reply_like_info);
                        return (0, response_1.response)(baseResponse_1.default.SUCCESS);
                    }
                    // 아닐경우에는 이미 취소된 댓글
                    return (0, response_1.response)(baseResponse_1.default.REPLY_ALREADY_UNLIKE);
                }
                else {
                    return (0, response_1.response)(baseResponse_1.default.REPLY_LIKE_NOTHING);
                }
            }
            catch (err) {
                winston_1.default.error(`App - Cancel_reply_like BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Save_reply_report(reply_id, user_id, report_content) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const reply_report_status = 'ACTIVE';
                const check_reply_id = yield this.boardRepository.get_by_id_reply(conn, reply_id);
                if (check_reply_id.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.REPLY_NOTHING);
                }
                // 자신이 단 댓글 신고 불가 로직
                // 신고를 여러번도 가능? 한듯
                // 좋아요 누른적이 있을경우에
                if (check_reply_id[0].user_id_fk == user_id) {
                    return (0, response_1.response)(baseResponse_1.default.REPLY_REPORT_SELF);
                }
                const reply_report_info = [reply_id, report_content, user_id, reply_report_status];
                const check = yield this.boardRepository.save_reply_report(conn, reply_report_info);
                yield conn.commit();
                const insertId = check.insertId;
                yield Log.save_report_log(insertId, 'REPLY', 'SAVE');
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                winston_1.default.error(`App - Save_reply_report BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Save_board_report(board_id, user_id, report_content) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const report_status = 'ACTIVE';
                // reply_id_Fk , report_content , user_name_fk , reply_report_status
                const check_board_id = yield this.boardRepository.get_by_id(conn, board_id);
                if (check_board_id.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.BOARD_NOTHING);
                }
                yield Log.save_board_log(board_id, 'READ');
                // 자신이 단 댓글 신고 불가 로직
                // 신고를 여러번도 가능? 한듯
                // 좋아요 누른적이 있을경우에
                if (check_board_id[0].user_id_fk == user_id) {
                    return (0, response_1.response)(baseResponse_1.default.BOARD_REPORT_SELF);
                }
                const board_report_info = [board_id, report_content, user_id, report_status];
                const check = yield this.boardRepository.save_board_report(conn, board_report_info);
                yield conn.commit();
                const insertId = check.insertId;
                yield Log.save_report_log(insertId, 'BOARD', 'SAVE');
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                winston_1.default.error(`App - Save_board_report BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Update_board(board_id, user_id, board_content) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const check_board_id = yield this.boardRepository.get_by_id(conn, board_id);
                if (check_board_id.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.BOARD_NOTHING);
                }
                else if (check_board_id[0].user_id_fk != user_id) {
                    return (0, response_1.response)(baseResponse_1.default.BOARD_EDIT_NOT_SELF);
                }
                else {
                    const update_board_info = [board_content, board_id];
                    yield this.boardRepository.update_board(conn, update_board_info);
                    conn.commit();
                    yield Log.save_board_log(board_id, 'UPDATE');
                    return (0, response_1.response)(baseResponse_1.default.SUCCESS);
                }
            }
            catch (err) {
                winston_1.default.error(`App - Update_board BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Update_board_status(board_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const board_status = 'DELETE';
                const check_board_id = yield this.boardRepository.get_by_id(conn, board_id);
                if (check_board_id.length == 0) {
                    return (0, response_1.response)(baseResponse_1.default.BOARD_NOTHING);
                }
                else if (check_board_id[0].user_id_fk != user_id) {
                    return (0, response_1.response)(baseResponse_1.default.BOARD_EDIT_NOT_SELF);
                }
                else {
                    yield this.boardRepository.delete_board_all(conn, board_id);
                    conn.commit();
                    yield Log.save_board_log(board_id, board_status);
                    return (0, response_1.response)(baseResponse_1.default.SUCCESS);
                }
            }
            catch (err) {
                conn.rollback();
                winston_1.default.error(`App - Update_board_status BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Get_board_reply(board_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const check_baord = yield this.boardRepository.get_by_id(conn, board_id);
                if (!check_baord.length) {
                    return (0, response_1.response)(baseResponse_1.default.BOARD_NOTHING);
                }
                const get_board_reply = yield this.boardRepository.get_board_reply(conn, board_id);
                yield Log.save_reply_log(board_id, 'READ');
                yield conn.commit();
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, get_board_reply);
            }
            catch (err) {
                winston_1.default.error(`App - Get_board_reply BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
    Delete_board_reply(reply_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            const reply_status = 'INVISIBLE';
            try {
                const check_reply = yield this.boardRepository.get_by_id_reply(conn, reply_id);
                if (!check_reply.length) {
                    return (0, response_1.response)(baseResponse_1.default.REPLY_NOTHING);
                }
                if (check_reply[0].user_id_fk != user_id) {
                    return (0, response_1.response)(baseResponse_1.default.REPLY_DELETE_CAN_SELF);
                }
                const delete_reply = yield this.boardRepository.update_reply_status(conn, [
                    reply_status,
                    reply_id,
                ]);
                yield Log.save_reply_log(reply_id, reply_status);
                conn.commit();
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                winston_1.default.error(`App - Get_board_reply BoardService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                conn.release();
            }
        });
    }
};
BoardService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], BoardService);
exports.default = BoardService;
//# sourceMappingURL=board.service.js.map