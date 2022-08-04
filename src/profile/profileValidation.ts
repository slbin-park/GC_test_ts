import express, { Request, Response, NextFunction } from 'express';
import baseResponse from '../config/baseResponse';

// refresh_token이 있는지
const post_follow_vali = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.body;
  const { follow_user_id } = req.params;
  if (user_id == follow_user_id) {
    res.send(baseResponse.FOLLOW_NOT_SELF);
  } else {
    next();
  }
};

const put_user_profile = (req: Request, res: Response, next: NextFunction) => {
  const { profileUrl, website, introduction } = req.body;
  if (profileUrl == undefined) {
    res.send(baseResponse.PROFILE_URL_EMPTY);
  } else if (website == undefined) {
    res.send(baseResponse.PROFILE_URL_EMPTY);
  } else if (introduction == undefined) {
    res.send(baseResponse.INTRODUCTION_EMPTY);
  } else {
    next();
  }
};
export { post_follow_vali, put_user_profile };
