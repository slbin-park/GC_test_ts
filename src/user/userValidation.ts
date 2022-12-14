import express, { Request, Response, NextFunction } from 'express';
import { response } from '../config/response';
import baseResponse from '../config/baseResponse';

const post_user_vali = (req: Request, res: Response, next: NextFunction) => {
  const { social_id, register, user_name, phone_number, password, birthday, accept_date, name } =
    req.body;
  const user_psword_regex = new RegExp(/[`~!@#$%^&*|\\\'\";:\/?]/gi);
  if (!register) {
    res.send(baseResponse.SIGNUP_REGISTER_EMPTY);
    return;
  }
  if (register == 'KAKAO') {
    if (social_id == undefined) {
      res.send(baseResponse.SIGNUP_SOCIALID_EMPTY);
      return;
    }
  }
  if (!name) {
    res.send(baseResponse.SIGNUP_NAME_EMPTY);
    return;
  }
  if (!user_name) {
    res.send(baseResponse.SIGNUP_USERNAME_EMPTY);
    return;
  }
  if (user_name.length <= 2 || user_name.length > 20) {
    res.send(baseResponse.SIGNUP_USERNAME_LENGTH);
    return;
  }
  if (!phone_number) {
    res.send(baseResponse.SIGNUP_PHONENUMBER_EMPTY);
    return;
  }
  if (!password) {
    res.send(baseResponse.SIGNUP_PASSWORD_EMPTY);
    return;
  }
  //비밀번호 체크
  if (register == 'SELF') {
    if (!user_psword_regex.test(password) || password.length <= 5 || password.length > 20) {
      res.send(baseResponse.SIGNUP_PASSWORD_LENGTH);
      return;
    }
  }
  if (!birthday) {
    res.send(baseResponse.SIGNUP_BIRTHDAY_EMPTY);
    return;
  }
  if (!accept_date) {
    res.send(baseResponse.SIGNUP_ACCEPTDATE_EMPTY);
    return;
  }

  next();
};

const get_user_name = (req: Request, res: Response, next: NextFunction) => {
  const { user_name } = req.params;
  if (!user_name) {
    res.send(baseResponse.SIGNUP_USERNAME_EMPTY);
    return;
  } else if (user_name.length <= 2 || user_name.length > 20) {
    res.send(baseResponse.SIGNUP_USERNAME_LENGTH);
    return;
  } else {
    next();
  }
};

const put_user_name = (req: Request, res: Response, next: NextFunction) => {
  const { user_name } = req.body;
  if (!user_name) {
    res.send(baseResponse.SIGNUP_USERNAME_EMPTY);
    return;
  } else {
    next();
  }
};

const put_user_status = (req: Request, res: Response, next: NextFunction) => {
  const { user_status } = req.body;
  if (!user_status) {
    res.send(baseResponse.CHANGE_USER_STATUS_EMPTY);
  } else if (user_status != 'PRIVATE' && user_status != 'ACTIVE' && user_status != 'DELETE') {
    res.send(baseResponse.USER_STATUS_WRONG);
  } else {
    next();
  }
};

const put_user_psword = (req: Request, res: Response, next: NextFunction) => {
  const { phone_number, password } = req.body;
  const user_psword_regex = new RegExp(/[`~!@#$%^&*|\\\'\";:\/?]/gi);
  if (!phone_number) {
    res.send(baseResponse.SIGNUP_PHONENUMBER_EMPTY);
  } else if (!password) {
    res.send(baseResponse.SIGNUP_PASSWORD_EMPTY);
  } else if (!user_psword_regex.test(password) || password.length <= 5 || password.length > 20) {
    res.send(baseResponse.SIGNUP_PASSWORD_LENGTH);
    return;
  } else {
    next();
  }
};
export { post_user_vali, get_user_name, put_user_name, put_user_status, put_user_psword };
