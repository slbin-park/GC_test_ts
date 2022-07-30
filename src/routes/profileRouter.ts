import express, { Request, Response } from 'express';
import { check_profile, check_follow } from '../middlewares/validations/profileValidation';
import jwt from '../middlewares/auth/jwt';
import '../config/env';
import ProfileController from '../controllers/profile/profile.controller';

const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동

router.get('/:user_name', (req: Request, res: Response) => {
  console.log(req.params.user_name);
  console.log('프로필 정보');
  res.send('프로필 정보 요청');
});

router.post(
  '/follow/:follow_user_name',
  jwt.check_access_token,
  check_follow,
  ProfileController.follow_user
);
export default router;
