import express, { Request, Response } from 'express';
import UserController from '../controllers/user/user.controller';
import { check_req } from '../middlewares/validations/userValidation';
const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동
router.get('/', UserController.get_user);
router.get('/:id', UserController.get_user_id);

router.post('/', check_req, UserController.post_user);

router.put('/', (req: Request, res: Response) => {
  console.log(`${req.method} 가 요청되었습니다.`);
  res.send(`${req.method} 가 요청되었습니다.`);
});

export default router;
