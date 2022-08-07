import express, { Request, Response } from 'express';
import * as Chatvalidation from './chatValidation';
import jwt from '../middlewares/auth/jwt';
import '../config/env';
import ChatController from './chat.controller';

const router = express.Router();

router.post('/', jwt.check_access_token, ChatController.save_chat);
router.get('/message', jwt.check_access_token, ChatController.get_chat);

export default router;
