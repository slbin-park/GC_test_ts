import express, { Request, Response, NextFunction } from 'express';

// refresh_token이 있는지
const check_profile = (req: Request, res: Response, next: NextFunction) => {};
const check_follow = (req: Request, res: Response, next: NextFunction) => {
  const { user_name } = req.body;
  const { follow_user_name } = req.params;
  if (user_name == follow_user_name) {
    res.send('자신한테 요청 불가능');
  } else if (user_name == undefined) {
    res.send('user_name 이 없음');
  } else {
    next();
  }
};
export { check_profile, check_follow };
