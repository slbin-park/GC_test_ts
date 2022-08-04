import express, { Request, Response } from 'express';
import UserController from './user.controller';
import * as Uservalidation from './userValidation';
import jwt from '../middlewares/auth/jwt';
const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동
router.get('/', UserController.get_user);
// 유저 이름 중복 체크
router.get('/user-name', Uservalidation.get_user_name, UserController.get_user_name);
router.get('/:id', UserController.get_user_id);

router.put(
  '/user-name',
  jwt.check_access_token,
  Uservalidation.put_user_name,
  UserController.update_user_name
);
router.put(
  '/user-status',
  jwt.check_access_token,
  Uservalidation.put_user_status,
  UserController.update_user_status
);
router.post('/', Uservalidation.post_user_vali, UserController.post_user);

export default router;
