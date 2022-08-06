import express, { Request, Response } from 'express';
import '../config/env';
import BoardController from './board.controller';
import jwt from '../middlewares/auth/jwt';
import * as BoardValidation from './boardValidation';
const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동

// 스웨거 끝
// 게시글 작성
router.post('/', jwt.check_access_token, BoardValidation.post_board_vali, BoardController.save);

// 스웨거 끝
// 게시글 좋아요 눌렀을경우
router.post('/:board_id/like', jwt.check_access_token, BoardController.save_board_like);

// 스웨거 끝
// 게시글 좋아요 취소
router.put('/:board_id/unlike', jwt.check_access_token, BoardController.cancel_board_like);

// 스웨거 끝
// 게시글 삭제
router.put('/:board_id/delete', jwt.check_access_token, BoardController.delete_board);

// 스웨거 끝
// 게시글 수정
router.put(
  '/:board_id',
  jwt.check_access_token,
  BoardValidation.put_board_edit_vali,
  BoardController.edit_board
);

// 스웨거 끝
// 게시글 신고
router.post(
  '/:board_id/report',
  jwt.check_access_token,
  BoardValidation.post_board_report_vali,
  BoardController.save_board_report
);

// ------------------댓글----------------------

router.get('/reply/:board_id', jwt.check_access_token, BoardController.get_board_reply);

// 스웨거 끝
// 댓글 작성
router.post(
  '/reply',
  jwt.check_access_token,
  BoardValidation.post_reply_vali,
  BoardController.save_reply
);

// 스웨거 끝
// 댓글 좋아요 눌렀을경우
router.post(
  '/reply/:reply_id/like',
  jwt.check_access_token,
  BoardValidation.post_reply_like_vali,
  BoardController.save_reply_like
);

// 스웨거 끝
// 댓글 좋아요 취소
router.put('/reply/:reply_id/unlike', jwt.check_access_token, BoardController.cancel_reply_like);

// 스웨거 끝
// 댓글 신고
router.post(
  '/reply/:reply_id/report',
  jwt.check_access_token,
  BoardValidation.post_reply_report_vali,
  BoardController.save_reply_report
);

// 댓글 삭제 기능 추가하기
router.put('/reply/:reply_id/delete', jwt.check_access_token);
export default router;
