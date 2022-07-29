import express, { Request, Response } from 'express';
import '../config/env';
import AuthController from '../controllers/auth/auth.controller';
import { check_toekn, check_code } from '../middlewares/validations/authValidation';

const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동

router.get('/kakao', AuthController.kakao_login);

router.get('/kakao/callback', check_code, AuthController.kakao_login_callback);
// 프론트에서 query.code 에 받은 코드 넣어서 보내야함

router.post('/kakao/access_token', check_toekn, AuthController.kakao_get_access_token);

export default router;
