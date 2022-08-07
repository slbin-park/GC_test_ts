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
const sql = __importStar(require("./user.sql"));
const typedi_1 = require("typedi");
require("reflect-metadata");
let UserRepository = class UserRepository {
    save(conn, userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield conn.query(sql.SAVE_USER, userInfo);
            return user;
        });
    }
    save_kakao(conn, userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user_kakao] = yield conn.query(sql.SAVE_USER_KAKAO, userInfo);
            return user_kakao;
        });
    }
    find(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user_data] = yield conn.query(sql.GET_USER_ALL);
            return user_data;
        });
    }
    findById(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user_data_id] = yield conn.query(sql.GET_USER_ID, id);
            return user_data_id;
        });
    }
    get_change_user_name_count(conn, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user_data_id] = yield conn.query(sql.GET_CHANGE_USER_NAME_COUNT, user_id);
            return user_data_id;
        });
    }
    update_user_name(conn, update_user_name_info) {
        return __awaiter(this, void 0, void 0, function* () {
            const [res_update_user_name] = yield conn.query(sql.UPDATE_USER_NAME, update_user_name_info);
            return res_update_user_name;
        });
    }
    save_user_name_change(conn, user_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const [res_update_user_name] = yield conn.query(sql.SAVE_USER_NAME_CHANGE, user_name);
            return res_update_user_name;
        });
    }
    update_user_status(conn, user_info) {
        return __awaiter(this, void 0, void 0, function* () {
            const [res_update_user_stauts] = yield conn.query(sql.UPDATE_USER_STATUS, user_info);
            return res_update_user_stauts;
        });
    }
    get_user_psword(conn, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const [res_user] = yield conn.query(sql.GET_USER_PHONE, phone);
            return res_user;
        });
    }
    update_user_password(conn, user_info) {
        return __awaiter(this, void 0, void 0, function* () {
            const [res_user_psword] = yield conn.query(sql.GET_USER_PHONE, user_info);
            return res_user_psword;
        });
    }
    delete_board(conn, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [res_user_psword] = yield conn.query(sql.DELETE_BOARD, user_id);
            return res_user_psword;
        });
    }
    delete_follow(conn, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [res_follow] = yield conn.query(sql.DELETE_FOLLOW, user_id);
            return res_follow;
        });
    }
};
UserRepository = __decorate([
    (0, typedi_1.Service)()
], UserRepository);
exports.default = UserRepository;
//# sourceMappingURL=user.dao.js.map