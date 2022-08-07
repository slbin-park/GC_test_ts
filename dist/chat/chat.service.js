"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
// 서비스에 이걸 임포트 해야함
const db_1 = __importDefault(require("../config/db"));
const chat_dao_1 = __importDefault(require("./chat.dao"));
const response_1 = require("../config/response");
const winston_1 = __importDefault(require("../config/winston"));
const baseResponse_1 = __importDefault(require("../config/baseResponse"));
// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할
// 데이터를 검증한 후 제대로 받았을경우
// 비밀번호 암호화 기능
// 토큰 발급 기능 다 넣기
let ChatService = class ChatService {
    constructor() {
        this.chatRepository = typedi_1.Container.get(chat_dao_1.default);
    }
    // 채팅 저장
    Save_Chat(user_id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                yield this.chatRepository.save_chat(conn, user_id, message);
                return (0, response_1.response)(baseResponse_1.default.SUCCESS);
            }
            catch (err) {
                yield conn.rollback();
                winston_1.default.error(`App - Save_Chat ChatService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                yield conn.release();
            }
        });
    }
    Get_Chat(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_1.default.getConnection((conn) => __awaiter(this, void 0, void 0, function* () { return conn; }));
            try {
                const res = yield this.chatRepository.get_chat(conn, user_id);
                return (0, response_1.response)(baseResponse_1.default.SUCCESS, res);
            }
            catch (err) {
                yield conn.rollback();
                winston_1.default.error(`App - Save_Chat ChatService error\n: ${err.message} \n${JSON.stringify(err)}`);
                return (0, response_1.errResponse)(baseResponse_1.default.DB_ERROR);
            }
            finally {
                yield conn.release();
            }
        });
    }
};
ChatService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], ChatService);
exports.default = ChatService;
//# sourceMappingURL=chat.service.js.map