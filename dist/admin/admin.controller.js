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
const typedi_1 = require("typedi");
require("reflect-metadata");
const admin_service_1 = __importDefault(require("./admin.service"));
const Log = __importStar(require("../middlewares/adminlog/log.dao"));
// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const AdminController = {
    get_user_data: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userid, username, userstatus, createat } = req.query;
        const userServiceInstance = typedi_1.Container.get(admin_service_1.default);
        const response = yield userServiceInstance.Get_user_data(userid, username, userstatus, createat);
        res.send(response);
    }),
    get_user_data_id: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id } = req.params;
        const userServiceInstance = typedi_1.Container.get(admin_service_1.default);
        const response = yield userServiceInstance.Get_user_data_user_id(user_id);
        res.send(response);
    }),
    update_user_data_id: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id } = req.params;
        const { user_name, phone_number, name, password, birthday, register, user_status, accept_date, refresh_token, social_id, profileUrl, website, introduction, create_at, update_at, } = req.body;
        const user_info = [
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
            create_at,
            update_at,
            user_id,
        ];
        const userServiceInstance = typedi_1.Container.get(admin_service_1.default);
        const response = yield userServiceInstance.Update_user_data_user_id(user_info, user_id);
        res.send(response);
    }),
    delete_user_admin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id } = req.params;
        const userServiceInstance = typedi_1.Container.get(admin_service_1.default);
        const response = yield userServiceInstance.Delete_user_admin(user_id);
        res.send(response);
    }),
    get_feed_data: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userid, boardstatus, createat } = req.query;
        const userServiceInstance = typedi_1.Container.get(admin_service_1.default);
        const response = yield userServiceInstance.Get_feed_data(userid, boardstatus, createat);
        res.send(response);
    }),
    get_feed_all_data: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { board_id } = req.params;
        const userServiceInstance = typedi_1.Container.get(admin_service_1.default);
        const response = yield userServiceInstance.Get_feed_all_board_id(board_id);
        res.send(response);
    }),
    delete_board_admin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { board_id } = req.params;
        const userServiceInstance = typedi_1.Container.get(admin_service_1.default);
        const response = yield userServiceInstance.Delete_board_admin(board_id);
        res.send(response);
    }),
    get_report_log: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield Log.get_report_log();
        res.send(response);
    }),
    get_user_log: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield Log.get_user_log();
        res.send(response);
    }),
    get_board_log: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield Log.get_board_log();
        res.send(response);
    }),
    get_reply_log: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield Log.get_reply_log();
        res.send(response);
    }),
};
exports.default = AdminController;
//# sourceMappingURL=admin.controller.js.map