import express, { Request, Response } from 'express';
import AdminController from './admin.controller';
const router = express.Router();

// 유저 전체 데이터 조회
router.get('/user-data', AdminController.get_user_data);

// 특정 유저 데이터 조회
router.get('/user-data/:user_id', AdminController.get_user_data_id);

// 특정 유저 데이터 수정
router.put('/user-data/:user_id', AdminController.update_user_data_id);

// 유저 전체 데이터 조회
router.get('/feed-data', AdminController.get_user_data);

export default router;
