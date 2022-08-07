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
const user_service_1 = __importDefault(require("./user.service"));
// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const UserController = {
    post_user: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userServiceInstance = typedi_1.Container.get(user_service_1.default);
        let user, response;
        const { user_name, phone_number, name, password, birthday, register, user_status, accept_date, social_id, } = req.body;
        if (req.body.register == 'KAKAO') {
            response = yield userServiceInstance.Save_Kakao(user_name, phone_number, name, password, birthday, register, user_status, accept_date, social_id);
        }
        else if (req.body.register == 'SELF') {
            response = yield userServiceInstance.Save(user_name, phone_number, name, password, birthday, register, user_status, accept_date);
            res.send(response);
        }
    }),
    get_user: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userServiceInstance = typedi_1.Container.get(user_service_1.default);
        const response = yield userServiceInstance.Find();
        res.json(response);
    }),
    get_user_id: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const userServiceInstance = typedi_1.Container.get(user_service_1.default);
        const response = yield userServiceInstance.Find_Id(id);
        res.json(response);
    }),
    // 구현해야함 - 0804
    update_user_profile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const userServiceInstance = typedi_1.Container.get(user_service_1.default);
        const response = yield userServiceInstance.Find_Id(id);
        res.json(response);
    }),
    get_user_name: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_name } = req.params;
        const userServiceInstance = typedi_1.Container.get(user_service_1.default);
        const response = yield userServiceInstance.Find_user_name(user_name);
        res.json(response);
    }),
    update_user_name: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_name, user_id } = req.body;
        const userServiceInstance = typedi_1.Container.get(user_service_1.default);
        const response = yield userServiceInstance.Update_user_name(user_name, user_id);
        res.json(response);
    }),
    update_user_status: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id, user_status } = req.body;
        const userServiceInstance = typedi_1.Container.get(user_service_1.default);
        const response = yield userServiceInstance.Update_user_status(user_id, user_status);
        res.json(response);
    }),
    update_user_psword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { phone_number, password } = req.body;
        const userServiceInstance = typedi_1.Container.get(user_service_1.default);
        const response = yield userServiceInstance.Update_user_psword(phone_number, password);
        res.json(response);
    }),
};
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map