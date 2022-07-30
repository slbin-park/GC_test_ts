import express from 'express';
import user from './userRouter';
import auth from './authRouter';
import board from './boardRouter';
const router = express();

router.use('/user', user);
router.use('/auth', auth);
router.use('/board', board);
export default router;
