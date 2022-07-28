import express, { Request, Response } from 'express';
import '../config/env';
const fetch = require('node-fetch');
const axios = require('axios');
const KAKAO_DATA_URL = 'https://kapi.kakao.com/v2/user/me';
const router = express.Router();

type Config = {
  client_id: any;
  redirect_uri: string;
  response_type: string;
};
// 스케쥴 관련 요청을 scrouter로 이동
router.get('/kakao', (req: Request, res: Response) => {
  console.log('실행됨');
  const baseUrl = 'https://kauth.kakao.com/oauth/authorize';
  const config: Config = {
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: 'http://localhost:8080/api/auth/kakao/callback',
    response_type: 'code',
  };
  const params = new URLSearchParams(config).toString();

  const finalUrl = `${baseUrl}?${params}`;
  //   console.log(finalUrl);
  return res.redirect(finalUrl);
});

router.get('/kakao/callback', async (req: Request, res: Response) => {
  const baseUrl = 'https://kauth.kakao.com/oauth/token';
  const config: any = {
    client_id: process.env.KAKAO_CLIENT_ID,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:8080/api/auth/kakao/callback',
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const kakaoTokenRequest = await fetch(finalUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json', // 이 부분을 명시하지않으면 text로 응답을 받게됨
    },
  });
  const json = await kakaoTokenRequest.json();
  const access_token = json.access_token.toString();
  const get_data = await axios({
    method: 'get',
    url: KAKAO_DATA_URL,
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  // console.log(json);
  // console.log('------------------');
  // console.log(access_token);
  // console.log('------------------');
  // console.log(get_data);

  res.send(get_data.data); // 프론트엔드에서 확인하려고

  // const code = req.query.code;
  // if (code != undefined) {
  //   // 엑세스 토큰이 있는 경우 API에 접근
  //   const access_token = code;
  //   const userRequest = await axios('https://kapi.kakao.com/v2/user/me', {
  //     headers: {
  //       'Authorization': `Bearer ${access_token}`,
  //       'Content-type': 'application/json',
  //     },
  //   });
  //   console.log(userRequest);
  // } else {
  //   // 엑세스 토큰이 없으면 로그인페이지로 리다이렉트
  //   return res.redirect('/login');
  // }
  // res.send(req.query.code);
});

export default router;

module.exports = router;
