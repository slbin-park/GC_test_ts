"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = __importDefault(require("./admin.controller"));
const router = express_1.default.Router();
// --------유저 관련 처리------------
// 유저 전체 데이터 조회
// 스웨거 끝
router.get('/user-data', admin_controller_1.default.get_user_data);
// 특정 유저 데이터 조회
// 스웨거 끝
router.get('/user-data/:user_id', admin_controller_1.default.get_user_data_id);
// 특정 유저 데이터 수정
router.put('/user-data/:user_id', admin_controller_1.default.update_user_data_id);
// 특정 유저 데이터 삭제
// 스웨거 끝
router.put('/user/admin-delete/:user_id', admin_controller_1.default.delete_user_admin);
// --------피드 관련 처리------------
// 피드 전체 조회
// 스웨거 끝
router.get('/feed-data', admin_controller_1.default.get_feed_data);
// 피드 상세 조회
// 스웨거 끝
router.get('/feed-all/:board_id', admin_controller_1.default.get_feed_all_data);
// 피드 삭제
router.put('/feed/delete/:board_id', admin_controller_1.default.delete_board_admin);
// --------로그 관련 처리------------
router.get('/log/user', admin_controller_1.default.get_user_log);
router.get('/log/board', admin_controller_1.default.get_board_log);
router.get('/log/reply', admin_controller_1.default.get_reply_log);
router.get('/log/report', admin_controller_1.default.get_report_log);
exports.default = router;
//# sourceMappingURL=adminRouter.js.map