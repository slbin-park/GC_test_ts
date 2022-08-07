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
const profile_service_1 = __importDefault(require("./profile.service"));
// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const ProfileController = {
    get_profile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const profileServiceInstance = typedi_1.Container.get(profile_service_1.default);
        const response = yield profileServiceInstance.Get_profile(req.params.user_id, req.body.user_id);
        res.send(response);
    }),
    follow_user: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const profileServiceInstance = typedi_1.Container.get(profile_service_1.default);
        const response = yield profileServiceInstance.Save_follow(req.body.user_id, req.params.user_id);
        res.send(response);
    }),
    update_follow_user: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const profileServiceInstance = typedi_1.Container.get(profile_service_1.default);
        const response = yield profileServiceInstance.Update_follow(req.body.user_id, req.params.user_id);
        res.send(response);
    }),
    get_follow_sub_list: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id } = req.body;
        const profileServiceInstance = typedi_1.Container.get(profile_service_1.default);
        const response = yield profileServiceInstance.Get_follow_sub_list(user_id);
        res.send(response);
    }),
    get_feed: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const profileServiceInstance = typedi_1.Container.get(profile_service_1.default);
        const response = yield profileServiceInstance.Get_feed(req.params.user_id, req.params.last_board_id, req.body.user_id);
        res.send(response);
    }),
    get_follow_feed: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id } = req.body;
        const { last_board_id } = req.params;
        const profileServiceInstance = typedi_1.Container.get(profile_service_1.default);
        const response = yield profileServiceInstance.Get_feed_follow(user_id, last_board_id);
        res.send(response);
    }),
    update_user_profile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id, profileUrl, website, introduction } = req.body;
        const profileServiceInstance = typedi_1.Container.get(profile_service_1.default);
        const response = yield profileServiceInstance.Update_user_profile(user_id, profileUrl, website, introduction);
        res.send(response);
    }),
    update_follow_accept: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id } = req.body;
        const { follow_user_id } = req.params;
        const profileServiceInstance = typedi_1.Container.get(profile_service_1.default);
        const response = yield profileServiceInstance.Update_follow_accept(user_id, follow_user_id);
        res.send(response);
    }),
};
exports.default = ProfileController;
//# sourceMappingURL=profile.controller.js.map