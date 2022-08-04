import express from 'express';
import user from '../user/userRouter';
import auth from '../auth/authRouter';
import board from '../board/boardRouter';
import profile from '../profile/profileRouter';
const router = express();

router.use('/user', user);
router.use('/auth', auth);
router.use('/board', board);
router.use('/profile', profile);
export default router;
