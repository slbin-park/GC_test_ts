import express from 'express';
import user from './userRouter';
import auth from './authRouter';
const router = express();

router.use('/user', user);
router.use('/auth', auth);
export default router;
