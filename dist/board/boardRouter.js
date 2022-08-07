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
require("../config/env");
const board_controller_1 = __importDefault(require("./board.controller"));
const jwt_1 = __importDefault(require("../middlewares/auth/jwt"));
const BoardValidation = __importStar(require("./boardValidation"));
const router = express_1.default.Router();
// ------------------피드(게시글)----------------------
// 스웨거 하기
// 게시글 불러오기
router.get('/feed/:board_id', jwt_1.default.check_access_token, board_controller_1.default.get_board);
// 스웨거 끝
// 게시글 작성
router.post('/', jwt_1.default.check_access_token, BoardValidation.post_board_vali, board_controller_1.default.save);
// 스웨거 끝
// 게시글 좋아요 눌렀을경우
router.post('/:board_id/like', jwt_1.default.check_access_token, board_controller_1.default.save_board_like);
// 스웨거 끝
// 게시글 좋아요 취소
router.put('/:board_id/unlike', jwt_1.default.check_access_token, board_controller_1.default.cancel_board_like);
// 스웨거 끝
// 게시글 삭제
router.put('/:board_id/delete', jwt_1.default.check_access_token, board_controller_1.default.delete_board);
// 스웨거 끝
// 게시글 수정
router.put('/:board_id', jwt_1.default.check_access_token, BoardValidation.put_board_edit_vali, board_controller_1.default.edit_board);
// 스웨거 끝
// 게시글 신고
router.post('/:board_id/report', jwt_1.default.check_access_token, BoardValidation.post_board_report_vali, board_controller_1.default.save_board_report);
// ------------------댓글----------------------
// 스웨거 끝
router.get('/reply/:board_id', jwt_1.default.check_access_token, board_controller_1.default.get_board_reply);
// 스웨거 끝
// 댓글 작성
router.post('/reply', jwt_1.default.check_access_token, BoardValidation.post_reply_vali, board_controller_1.default.save_reply);
// 스웨거 끝
// 댓글 좋아요 눌렀을경우
router.post('/reply/:reply_id/like', jwt_1.default.check_access_token, BoardValidation.post_reply_like_vali, board_controller_1.default.save_reply_like);
// 스웨거 끝
// 댓글 좋아요 취소
router.put('/reply/:reply_id/unlike', jwt_1.default.check_access_token, board_controller_1.default.cancel_reply_like);
// 스웨거 끝
// 댓글 신고
router.post('/reply/:reply_id/report', jwt_1.default.check_access_token, BoardValidation.post_reply_report_vali, board_controller_1.default.save_reply_report);
// 스웨거 끝
// 댓글 삭제 기능
router.put('/reply/:reply_id/delete', jwt_1.default.check_access_token, board_controller_1.default.delete_board_reply);
exports.default = router;
//# sourceMappingURL=boardRouter.js.map