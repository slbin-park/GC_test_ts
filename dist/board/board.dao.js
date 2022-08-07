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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql = __importStar(require("./board.sql"));
const typedi_1 = require("typedi");
require("reflect-metadata");
let BoardRepository = class BoardRepository {
    // 게시글 저장 ( 이미지는 따로 저장 )
    save(conn, boardInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [save_board] = yield conn.query(sql.SAVE, boardInfo);
                return save_board;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // 게시글 데이터
    get_board_img(conn, board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [get_board] = yield conn.query(sql.GET_BOARD_IMG, board_id);
                return get_board;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // 피드 등록시 이미지 등록
    save_image(conn, board_id, image_address) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [save_image] = yield conn.query(sql.SAVE_IMAGE, [board_id, image_address]);
                return save_image;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // id로 게시글 조회
    get_by_id(conn, board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [board_data] = yield conn.query(sql.GET_BY_ID, board_id);
                return board_data;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // 댓글 저장
    save_reply(conn, reply_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [save_reply] = yield conn.query(sql.SAVE_REPLY, reply_info);
                return save_reply;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // 게시글 좋아요 저장
    save_board_like(conn, save_board_like_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [save_board_like] = yield conn.query(sql.SAVE_BOARD_LIKE, save_board_like_info);
                return save_board_like;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // 게시글 좋아요 취소
    update_board_like(conn, board_like_const) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [update_board_like] = yield conn.query(sql.UPDATE_BOARD_LIKE, board_like_const);
                return update_board_like;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // 게시글 좋아요 눌렀는지 체크
    get_by_id_board_like(conn, board_like_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [get_board_like] = yield conn.query(sql.GET_BY_ID_BOARD_LIKE, board_like_info);
                return get_board_like;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // 댓글이 존재하는지 체크
    get_by_id_reply(conn, reply_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [get_reply] = yield conn.query(sql.GET_BY_ID_REPLY, reply_id);
                return get_reply;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // 댓글을 좋아요를 눌렀는지 체크
    get_by_id_reply_like(conn, get_reply_like_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [get_reply_like] = yield conn.query(sql.GET_BY_ID_REPLY_LIKE, get_reply_like_info);
                return get_reply_like;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // 댓글을 좋아요를 저장
    save_reply_like(conn, reply_like_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [save_reply_like] = yield conn.query(sql.SAVE_REPLY_LIKE, reply_like_info);
                return save_reply_like;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // 댓글을 좋아요를 수정
    update_reply_like(conn, update_reply_like_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [update_reply_like] = yield conn.query(sql.UPDATE_REPLY_LIKE, update_reply_like_info);
                return update_reply_like;
            }
            catch (err) {
                throw err;
            }
        });
    }
    save_reply_report(conn, save_reply_report_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [save_reply_report] = yield conn.query(sql.SAVE_REPLY_REPORT, save_reply_report_info);
                return save_reply_report;
            }
            catch (err) {
                throw err;
            }
        });
    }
    save_board_report(conn, save_board_report_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [save_board_report] = yield conn.query(sql.SAVE_BOARD_REPORT, save_board_report_info);
                return save_board_report;
            }
            catch (err) {
                throw err;
            }
        });
    }
    update_board(conn, board_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [update_board] = yield conn.query(sql.UPDATE_BOARD, board_info);
                return update_board;
            }
            catch (err) {
                throw err;
            }
        });
    }
    update_board_status(conn, board_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [update_board] = yield conn.query(sql.UPDATE_BOARD_STATUS, board_info);
                return update_board;
            }
            catch (err) {
                throw err;
            }
        });
    }
    get_board_reply(conn, board_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [get_board_reply] = yield conn.query(sql.GET_BOARD_REPLY, board_info);
                return get_board_reply;
            }
            catch (err) {
                throw err;
            }
        });
    }
    update_reply_status(conn, reply_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [get_board_reply] = yield conn.query(sql.UPDATE_REPLY_STATUS, reply_info);
                return get_board_reply;
            }
            catch (err) {
                throw err;
            }
        });
    }
    delete_board_all(conn, board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [delete_board] = yield conn.query(sql.DELETE_BOARD, board_id);
                return delete_board;
            }
            catch (err) {
                throw err;
            }
        });
    }
};
BoardRepository = __decorate([
    (0, typedi_1.Service)()
], BoardRepository);
exports.default = BoardRepository;
//# sourceMappingURL=board.dao.js.map