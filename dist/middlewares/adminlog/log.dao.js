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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.get_report_log = exports.save_report_log = exports.get_user_log = exports.get_board_log = exports.get_reply_log = exports.save_reply_log = exports.save_board_log = exports.save_user_log = void 0;
const baseResponse_1 = __importDefault(require("../../config/baseResponse"));
const db_1 = __importDefault(require("../../config/db"));
const response_1 = require("../../config/response");
const sql = __importStar(require("./log.sql"));
const save_user_log = (user_id, db_action) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield db_1.default.getConnection((conn) => __awaiter(void 0, void 0, void 0, function* () { return conn; }));
    try {
        const [get_user_data] = yield conn.query(sql.GET_USER_DATA, user_id);
        const { user_name, phone_number, name, password, birthday, register, user_status, accept_date, refresh_token, social_id, profileUrl, website, introduction, } = get_user_data[0];
        const save_log = [
            db_action,
            user_id,
            user_name,
            phone_number,
            name,
            password,
            birthday,
            register,
            user_status,
            accept_date,
            refresh_token,
            social_id,
            profileUrl,
            website,
            introduction,
        ];
        const result = yield conn.query(sql.SAVE_USER_LOG, save_log);
        yield conn.commit();
    }
    catch (err) {
        yield conn.rollback();
        console.log(err);
        return '실패';
    }
    finally {
        conn.release();
    }
});
exports.save_user_log = save_user_log;
const save_board_log = (board_id, db_action) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield db_1.default.getConnection((conn) => __awaiter(void 0, void 0, void 0, function* () { return conn; }));
    try {
        const [get_board_data] = yield conn.query(sql.GET_BOARD_DATA, board_id);
        const { board_content, user_id_fk, board_status } = get_board_data[0];
        const save_log = [db_action, board_id, board_content, user_id_fk, board_status];
        const result = yield conn.query(sql.SAVE_BOARD_LOG, save_log);
        yield conn.commit();
    }
    catch (err) {
        yield conn.rollback();
        console.log(err);
        return '실패';
    }
    finally {
        conn.release();
    }
});
exports.save_board_log = save_board_log;
const save_reply_log = (reply_id, db_action) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield db_1.default.getConnection((conn) => __awaiter(void 0, void 0, void 0, function* () { return conn; }));
    try {
        const [get_reply_data] = yield conn.query(sql.GET_REPLY_DATA, reply_id);
        const { board_id_fk, user_id_fk, reply_content, reply_status } = get_reply_data[0];
        const save_log = [db_action, reply_id, board_id_fk, user_id_fk, reply_content, reply_status];
        const result = yield conn.query(sql.SAVE_REPLY_LOG, save_log);
        yield conn.commit();
    }
    catch (err) {
        yield conn.rollback();
        console.log(err);
        return '실패';
    }
    finally {
        conn.release();
    }
});
exports.save_reply_log = save_reply_log;
const get_reply_log = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield db_1.default.getConnection((conn) => __awaiter(void 0, void 0, void 0, function* () { return conn; }));
    try {
        const [res] = yield conn.query(sql.GET_REPLY_LOG);
        yield conn.commit();
        return (0, response_1.response)(baseResponse_1.default.SUCCESS, res);
    }
    catch (err) {
        yield conn.rollback();
        console.log(err);
        return '실패';
    }
    finally {
        conn.release();
    }
});
exports.get_reply_log = get_reply_log;
const get_board_log = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield db_1.default.getConnection((conn) => __awaiter(void 0, void 0, void 0, function* () { return conn; }));
    try {
        const [res] = yield conn.query(sql.GET_BOARD_LOG);
        yield conn.commit();
        return (0, response_1.response)(baseResponse_1.default.SUCCESS, res);
    }
    catch (err) {
        yield conn.rollback();
        console.log(err);
        return '실패';
    }
    finally {
        conn.release();
    }
});
exports.get_board_log = get_board_log;
const get_user_log = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield db_1.default.getConnection((conn) => __awaiter(void 0, void 0, void 0, function* () { return conn; }));
    try {
        const [res] = yield conn.query(sql.GET_USER_LOG);
        yield conn.commit();
        return (0, response_1.response)(baseResponse_1.default.SUCCESS, res);
    }
    catch (err) {
        yield conn.rollback();
        console.log(err);
        return '실패';
    }
    finally {
        conn.release();
    }
});
exports.get_user_log = get_user_log;
const save_report_log = (report_id, report_category, db_action) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield db_1.default.getConnection((conn) => __awaiter(void 0, void 0, void 0, function* () { return conn; }));
    try {
        if (report_category == 'BOARD') {
            const [board_data] = yield conn.query(sql.GET_BOARD_REPORT_DATA, report_id);
            const { board_report_id, board_id, report_content, user_id_fk, board_report_status } = board_data[0];
            const rept_id = board_report_id;
            const report_idx = board_id;
            const report_status = board_report_status;
            yield conn.query(sql.SAVE_REPORT_LOG, [
                db_action,
                report_category,
                rept_id,
                user_id_fk,
                report_idx,
                report_content,
                report_status,
            ]);
        }
        else {
            const [reply_data] = yield conn.query(sql.GET_REPLY_REPORT_DATA, report_id);
            const { reply_report_id, user_id_fk, reply_id_fk, report_content, reply_report_status } = reply_data[0];
            const rept_id = reply_report_id;
            const report_idx = reply_id_fk;
            const report_status = reply_report_status;
            yield conn.query(sql.SAVE_REPORT_LOG, [
                db_action,
                report_category,
                rept_id,
                user_id_fk,
                report_idx,
                report_content,
                report_status,
            ]);
        }
        yield conn.commit();
    }
    catch (err) {
        yield conn.rollback();
        console.log(err);
        return '실패';
    }
    finally {
        conn.release();
    }
});
exports.save_report_log = save_report_log;
const get_report_log = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield db_1.default.getConnection((conn) => __awaiter(void 0, void 0, void 0, function* () { return conn; }));
    try {
        const [res] = yield conn.query(sql.GET_REPORT_LOG);
        yield conn.commit();
        return (0, response_1.response)(baseResponse_1.default.SUCCESS, res);
    }
    catch (err) {
        yield conn.rollback();
        console.log(err);
        return '실패';
    }
    finally {
        conn.release();
    }
});
exports.get_report_log = get_report_log;
//# sourceMappingURL=log.dao.js.map