import express from 'express';
import user from '../user/userRouter';
import auth from '../auth/authRouter';
import board from '../board/boardRouter';
import profile from '../profile/profileRouter';
import admin from '../admin/adminRouter';
import chat from '../chat/chatRouter';

const router = express();

router.use('/user', user);
router.use('/auth', auth);
router.use('/board', board);
router.use('/profile', profile);
router.use('/admin', admin);
router.use('/chat', chat);

export default router;
