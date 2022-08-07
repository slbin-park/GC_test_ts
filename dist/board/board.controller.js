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
const board_service_1 = __importDefault(require("./board.service"));
// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const BoardController = {
    save: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const boardInfo = req.body;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Save_board(req.body.user_id, req.body.board_content, req.body.images);
        res.send(response);
    }),
    get_board: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { board_id } = req.params;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Get_board_id(board_id);
        res.send(response);
    }),
    save_reply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const replyInfo = req.body;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Save_reply(replyInfo);
        res.send({ response });
    }),
    save_board_like: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const replyInfo = req.body;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Save_board_like(req.params.board_id, replyInfo.user_id);
        res.send({ response });
    }),
    cancel_board_like: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const replyInfo = req.body;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Cancel_board_like(req.params.board_id, replyInfo.user_id);
        res.send({ response });
    }),
    save_reply_like: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const replyInfo = req.body;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Save_reply_like(req.params.reply_id, replyInfo.user_id);
        res.send({ response });
    }),
    cancel_reply_like: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const replyInfo = req.body;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Cancel_reply_like(req.params.reply_id, replyInfo.user_id);
        res.send({ response });
    }),
    save_reply_report: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id, report_content } = req.body;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Save_reply_report(req.params.reply_id, user_id, report_content);
        res.send({ response });
    }),
    save_board_report: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id, report_content } = req.body;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Save_board_report(req.params.board_id, user_id, report_content);
        res.send({ response });
    }),
    edit_board: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id, board_content } = req.body;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Update_board(req.params.board_id, user_id, board_content);
        res.send({ response });
    }),
    delete_board: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id } = req.body;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Update_board_status(req.params.board_id, user_id);
        res.send({ response });
    }),
    get_board_reply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id } = req.body;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Get_board_reply(req.params.board_id, user_id);
        res.send({ response });
    }),
    delete_board_reply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id } = req.body;
        const { reply_id } = req.params;
        const boardServiceInstance = typedi_1.Container.get(board_service_1.default);
        const response = yield boardServiceInstance.Delete_board_reply(reply_id, user_id);
        res.send({ response });
    }),
};
exports.default = BoardController;
//# sourceMappingURL=board.controller.js.map