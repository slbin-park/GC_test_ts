import express, { Request, Response, NextFunction } from 'express';

const check_req = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const user_psword_regex = new RegExp(/[`~!@#$%^&*|\\\'\";:\/?]/gi);
  console.log('middleware');
  if (body.register == 'KAKAO') {
    if (body.refresh_token == undefined) {
      res.send('refresh_token 없음');
    }
    if (body.social_id == undefined) {
      res.send('social_id 없음');
    }
  }

  if (body.user_name.length <= 2 || body.user_name.length > 20) {
    // 3자 이상 20자 이하
    res.send('이름 유효성 검사 실패');
    return;
  }

  //비밀번호 체크
  if (body.register == 'SELF') {
    if (
      !user_psword_regex.test(body.password) ||
      body.password.length <= 5 ||
      body.password.length > 20
    ) {
      res.send('비밀번호 유효성 검사 실패');
      return;
    }
  }
  if (!body.phone_number) {
    res.send('휴대폰 유효성 검사 실패');
    return;
  }
  if (!body.birthday) {
    res.send('생일 유효성 검사 실패');
    return;
  }
  if (!body.register) {
    res.send('가입경로 유효성 검사 실패');
    return;
  }

  next();
};

export { check_req };
