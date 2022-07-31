import express, { Request, Response } from 'express';
import '../config/env';
import BoardController from '../controllers/board/board.controller';
import jwt from '../middlewares/auth/jwt';
import { check_reply } from '../middlewares/validations/boardValidation';
const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동

// 게시글 작성
router.post('/', jwt.check_access_token, BoardController.save);

// 게시글 좋아요 눌렀을경우
router.post('/:board_id/like', jwt.check_access_token, BoardController.save_board_like);

// 게시글 좋아요 취소
router.put('/:board_id/unlike', jwt.check_access_token, BoardController.cancel_board_like);

// 댓글 작성
router.post('/reply', jwt.check_access_token, check_reply, BoardController.save);

// 댓글 좋아요 눌렀을경우
router.post('/reply/:reply_id/like', jwt.check_access_token, BoardController.save_board_like);

// 댓글 좋아요 취소
router.put('/reply/:reply_id/unlike', jwt.check_access_token, BoardController.cancel_board_like);

export default router;
