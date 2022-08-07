import express, { Request, Response, NextFunction } from 'express';
import baseResponse from '../config/baseResponse';

// refresh_token이 있는지
const post_chat_vali = (req: Request, res: Response, next: NextFunction) => {
  const { message } = req.body;
  if (!message) {
    res.send(baseResponse.MESSAGE_EMPTY);
  } else if (message.length > 200) {
    res.send(baseResponse.MESSAGE_LENGTH);
  } else {
    next();
  }
};

export { post_chat_vali };
