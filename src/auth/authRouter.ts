import express, { Request, Response } from 'express';
import '../config/env';
import AuthController from './auth.controller';
import * as Authavlidation from './authValidation';

const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동

router.post('/login', AuthController.login);
router.get('/auto-login', AuthController.auto_login);

router.get('/kakao', AuthController.kakao_login);

router.get('/kakao/callback', Authavlidation.check_code, AuthController.kakao_login_callback);
// 프론트에서 query.code 에 받은 코드 넣어서 보내야함

router.post(
  '/access-token',
  Authavlidation.post_access_token_vali,
  AuthController.kakao_get_access_token
);

export default router;
