import express, { Request, Response } from 'express';
import { check_profile, check_follow } from '../middlewares/validations/profileValidation';
import jwt from '../middlewares/auth/jwt';
import '../config/env';
import ProfileController from './profile.controller';

const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동

// 메인화면 피드 가져오기
router.get('/feed/follow', jwt.check_access_token, ProfileController.get_follow_feed);

// 프로필 피드 가져오기
router.get('/feed/:user_name', jwt.check_access_token, ProfileController.get_feed);

// 프로필 정보 가져오기
router.get('/user/:user_name', jwt.check_access_token, ProfileController.get_profile);

// 팔로우 하기
router.post(
  '/follow/:follow_user_name',
  jwt.check_access_token,
  check_follow,
  ProfileController.follow_user
);
export default router;
