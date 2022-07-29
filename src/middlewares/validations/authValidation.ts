import express, { Request, Response, NextFunction } from 'express';

// refresh_token이 있는지
const check_toekn = (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.headers);
  if (req.headers.authorization == undefined) {
    res.send('리프레시토큰 없음');
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
export { check_toekn, check_code };
