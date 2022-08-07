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
const chat_service_1 = __importDefault(require("./chat.service"));
// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const ChatController = {
    save_chat: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const chatServiceInstance = typedi_1.Container.get(chat_service_1.default);
        const { user_id, message } = req.body;
        const response = yield chatServiceInstance.Save_Chat(user_id, message);
        res.send(response);
    }),
    get_chat: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const chatServiceInstance = typedi_1.Container.get(chat_service_1.default);
        const { user_id } = req.body;
        const response = yield chatServiceInstance.Get_Chat(user_id);
        res.send(response);
    }),
};
exports.default = ChatController;
//# sourceMappingURL=chat.controller.js.map