import express, { Request, Response } from 'express';
import '../config/env';
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

router.get('/kakao/callback', (req: Request, res: Response) => {
  console.log(req.query);
  console.log(`${req.method} 가 요청되었습니다.`);
  res.send(`${req.method} 가 요청되었습니다.`);
});

export default router;
