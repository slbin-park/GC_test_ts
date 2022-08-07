import express, { Request, Response } from 'express';
import AdminController from './admin.controller';
const router = express.Router();

// --------유저 관련 처리------------

// 유저 전체 데이터 조회
router.get('/user-data', AdminController.get_user_data);

// 특정 유저 데이터 조회
router.get('/user-data/:user_id', AdminController.get_user_data_id);

// 특정 유저 데이터 수정
router.put('/user-data/:user_id', AdminController.update_user_data_id);

// 특정 유저 데이터 수정
router.put('/user/admin-delete/:user_id', AdminController.delete_user_admin);

// --------피드 관련 처리------------

// 피드 전체 조회
router.get('/feed-data', AdminController.get_feed_data);

// 피드 상세 조회
router.get('/feed-all/:board_id', AdminController.get_feed_all_data);

// --------로그 관련 처리------------
router.get('/log/user', AdminController.get_user_log);
router.get('/log/board', AdminController.get_board_log);
router.get('/log/reply', AdminController.get_reply_log);
router.get('/log/report', AdminController.get_report_log);
export default router;
