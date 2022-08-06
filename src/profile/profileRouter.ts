import express, { Request, Response } from 'express';
import * as Profilevalidation from './profileValidation';
import jwt from '../middlewares/auth/jwt';
import '../config/env';
import ProfileController from './profile.controller';

const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동

// 메인화면 피드 가져오기
// 스웨거 끝
router.get(
  '/feed/follow/:last_board_id',
  jwt.check_access_token,
  ProfileController.get_follow_feed
);

// 프로필 피드 가져오기
// 스웨거 끝
router.get('/feed/:user_id/:last_board_id', jwt.check_access_token, ProfileController.get_feed);

// 프로필 정보 가져오기
// 스웨거 끝
router.get('/user/:user_id', jwt.check_access_token, ProfileController.get_profile);

// 프로필 수정
// 스웨거 끝
router.put(
  '/user',
  jwt.check_access_token,
  Profilevalidation.put_user_profile,
  ProfileController.update_user_profile
);

// 팔로우 하기
// 스웨거 끝
router.post(
  '/follow/:user_id',
  jwt.check_access_token,
  Profilevalidation.post_follow_vali,
  ProfileController.follow_user
);

// 팔로우 취소 하기
// 스웨거 끝
router.put(
  '/unfollow/:user_id',
  jwt.check_access_token,
  Profilevalidation.post_follow_vali,
  ProfileController.update_follow_user
);

// 팔로우 리스트 조회
// 스웨거 끝
router.get('/follow/list', jwt.check_access_token, ProfileController.get_follow_sub_list);
export default router;
