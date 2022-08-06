import express, { Request, Response, NextFunction } from 'express';
import baseResponse from '../config/baseResponse';
// refresh_token이 있는지
const post_access_token_vali = (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.headers);
  if (req.headers.authorization == undefined) {
    res.send(baseResponse.REFRESH_TOKEN_NOTHING);
  } else {
    next();
  }
};

const post_login_vali = (req: Request, res: Response, next: NextFunction) => {
  const { user_name, password } = req.body;
  if (!user_name) {
    res.send(baseResponse.SIGNUP_USERNAME_EMPTY);
  } else if (!password) {
    res.send(baseResponse.SIGNUP_PASSWORD_EMPTY);
  } else {
    next();
  }
};

const check_code = (req: Request, res: Response, next: NextFunction) => {
  const code = req.query.code;
  if (code != undefined) {
    next();
  } else {
    // 엑세스 토큰이 없으면 로그인페이지로 리다이렉트
    return res.redirect('/login');
  }
};
export { post_access_token_vali, check_code, post_login_vali };
