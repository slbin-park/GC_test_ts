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
const sql = __importStar(require("./admin.sql"));
const typedi_1 = require("typedi");
require("reflect-metadata");
let AdminRepository = class AdminRepository {
    get_user_data(conn, alphasql) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalsql = sql.GET_USER_DATA + alphasql;
            const [user] = yield conn.query(finalsql);
            return user;
        });
    }
    get_user_data_user_id(conn, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield conn.query(sql.GET_USER_ID, user_id);
            return user;
        });
    }
    update_user_data_user_id(conn, user_data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield conn.query(sql.UPDATE_USER_ID, user_data);
            return user;
        });
    }
    delete_user_admin(conn, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield conn.query(sql.DELETE_USER, user_id);
            return user;
        });
    }
    get_feed_data(conn, alphasql) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalsql = sql.GET_BOARD_DATA + alphasql;
            const [user] = yield conn.query(finalsql);
            return user;
        });
    }
    get_feed_reply_data(conn, board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield conn.query(sql.GET_BOARD_REPLY, board_id);
            return user;
        });
    }
    get_feed_like_data(conn, board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield conn.query(sql.GET_BOARD_LIKE, board_id);
            return user;
        });
    }
    get_feed_img(conn, board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield conn.query(sql.GET_BOARD_IMG, board_id);
            return user;
        });
    }
    get_reply_like_data(conn, board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield conn.query(sql.GET_REPLY_LIKE, board_id);
            return user;
        });
    }
    delete_feed_admin(conn, board_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [board] = yield conn.query(sql.DELETE_BOARD_ADMIN, board_id);
            return board;
        });
    }
};
AdminRepository = __decorate([
    (0, typedi_1.Service)()
], AdminRepository);
exports.default = AdminRepository;
//# sourceMappingURL=admin.dao.js.map