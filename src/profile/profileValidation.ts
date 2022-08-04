import express, { Request, Response, NextFunction } from 'express';
import baseResponse from '../config/baseResponse';

// refresh_token이 있는지
const pose_follow_vali = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.body;
  const { follow_user_id } = req.params;
  if (user_id == follow_user_id) {
    res.send(baseResponse.FOLLOW_NOT_SELF);
  } else {
    next();
  }
};

export { pose_follow_vali };
