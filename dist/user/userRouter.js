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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
const Uservalidation = __importStar(require("./userValidation"));
const jwt_1 = __importDefault(require("../middlewares/auth/jwt"));
const router = express_1.default.Router();
// 스케쥴 관련 요청을 scrouter로 이동
router.get('/', user_controller_1.default.get_user);
// 유저 이름 중복 체크
// 스웨거 끝
router.get('/user-name/:user_name', Uservalidation.get_user_name, user_controller_1.default.get_user_name);
router.get('/:id', user_controller_1.default.get_user_id);
// 사용자 이름 변경
// 스웨거 끝
router.put('/user-name', jwt_1.default.check_access_token, Uservalidation.put_user_name, user_controller_1.default.update_user_name);
// 유저 상태 변경 비공개 , 삭제 , 액티브
// 스웨거 끝
router.put('/user-status', jwt_1.default.check_access_token, Uservalidation.put_user_status, user_controller_1.default.update_user_status);
// 스웨거 끝
router.put('/user-password', Uservalidation.put_user_psword, user_controller_1.default.update_user_psword);
// 회원가입
// 스웨거 끝
router.post('/', Uservalidation.post_user_vali, user_controller_1.default.post_user);
exports.default = router;
//# sourceMappingURL=userRouter.js.map