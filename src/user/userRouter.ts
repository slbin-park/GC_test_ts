import express, { Request, Response } from 'express';
import UserController from './user.controller';
import * as Uservalidation from './userValidation';
const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동
router.get('/', UserController.get_user);
router.get('/:id', UserController.get_user_id);

router.post('/', Uservalidation.post_user_vali, UserController.post_user);

router.put('/profile', (req: Request, res: Response) => {
  console.log(`${req.method} 가 요청되었습니다.`);
  res.send(`${req.method} 가 요청되었습니다.`);
});

export default router;