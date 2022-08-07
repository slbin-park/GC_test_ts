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
const sql = __importStar(require("./auth.sql"));
const typedi_1 = require("typedi");
require("reflect-metadata");
let AuthRepository = class AuthRepository {
    get_kakao_user(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            const [get_kakao_user] = yield conn.query(sql.GET_BY_KAKAOID);
            return get_kakao_user;
        });
    }
    update_refresh_token(conn, update_refresh_info) {
        return __awaiter(this, void 0, void 0, function* () {
            const [update_refresh_token] = yield conn.query(sql.UPDATE_REFRESH_TOKEN, update_refresh_info);
            return update_refresh_token;
        });
    }
    get_user_data(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [get_user_date] = yield conn.query(sql.GET_BY_USERNAME, id);
            return get_user_date;
        });
    }
    get_by_user_name(conn, user_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const [get_by_user_name] = yield conn.query(sql.GET_BY_USERNAME, user_name);
            return get_by_user_name;
        });
    }
    get_by_refresh_token(conn, refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const [get_by_refresh_token] = yield conn.query(sql.GET_BY_REFRESH_TOKEN, refresh_token);
            return get_by_refresh_token;
        });
    }
};
AuthRepository = __decorate([
    (0, typedi_1.Service)()
], AuthRepository);
exports.default = AuthRepository;
//# sourceMappingURL=auth.dao.js.map