import express from 'express';
import user from './userRouter';
import auth from './authRouter';
import board from './boardRouter';
import profile from './profileRouter';
const router = express();

router.use('/user', user);
router.use('/auth', auth);
router.use('/board', board);
router.use('/profile', profile);
export default router;
