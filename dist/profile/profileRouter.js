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
const Profilevalidation = __importStar(require("./profileValidation"));
const jwt_1 = __importDefault(require("../middlewares/auth/jwt"));
require("../config/env");
const profile_controller_1 = __importDefault(require("./profile.controller"));
const router = express_1.default.Router();
// 스케쥴 관련 요청을 scrouter로 이동
// 메인화면 피드 가져오기
// 스웨거 끝
router.get('/feed/follow/:last_board_id', jwt_1.default.check_access_token, profile_controller_1.default.get_follow_feed);
// 프로필 피드 가져오기
// 스웨거 끝
router.get('/feed/:user_id/:last_board_id', jwt_1.default.check_access_token, profile_controller_1.default.get_feed);
// 프로필 정보 가져오기
// 스웨거 끝
router.get('/user/:user_id', jwt_1.default.check_access_token, profile_controller_1.default.get_profile);
// 프로필 수정
// 스웨거 끝
router.put('/user', jwt_1.default.check_access_token, Profilevalidation.put_user_profile, profile_controller_1.default.update_user_profile);
// 팔로우 하기
// 스웨거 끝
router.post('/follow/:user_id', jwt_1.default.check_access_token, Profilevalidation.post_follow_vali, profile_controller_1.default.follow_user);
// 팔로우 취소 하기
// 스웨거 끝
router.put('/unfollow/:user_id', jwt_1.default.check_access_token, Profilevalidation.post_follow_vali, profile_controller_1.default.update_follow_user);
// 팔로우 리스트 조회
// 스웨거 끝
router.get('/follow/list', jwt_1.default.check_access_token, profile_controller_1.default.get_follow_sub_list);
// 팔로우 리스트 조회
// 스웨거 끝
router.put('/follow/accept/:follow_user_id', jwt_1.default.check_access_token, profile_controller_1.default.update_follow_accept);
exports.default = router;
//# sourceMappingURL=profileRouter.js.map