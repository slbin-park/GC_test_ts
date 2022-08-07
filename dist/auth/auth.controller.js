"use strict";
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
const auth_service_1 = __importDefault(require("./auth.service"));
// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const AuthController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const AuthServiceInstance = typedi_1.Container.get(auth_service_1.default);
        const { user_name, password } = req.body;
        const response = yield AuthServiceInstance.login(user_name, password);
        res.send(response);
    }),
    kakao_login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const AuthServiceInstance = typedi_1.Container.get(auth_service_1.default);
        const response = yield AuthServiceInstance.kakao_login();
        res.redirect(response);
    }),
    kakao_login_callback: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const AuthServiceInstance = typedi_1.Container.get(auth_service_1.default);
        const response = yield AuthServiceInstance.kakao_login_callback(req.query.code);
        res.send(response);
    }),
    kakao_get_access_token: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const AuthServiceInstance = typedi_1.Container.get(auth_service_1.default);
        const a = req.headers.Authorization;
        const response = yield AuthServiceInstance.kakao_get_access_token(req.headers.authorization);
        res.send(response);
    }),
    auto_login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const AuthServiceInstance = typedi_1.Container.get(auth_service_1.default);
        const refresh_token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const response = yield AuthServiceInstance.auto_login(refresh_token);
        res.send(response);
    }),
};
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map