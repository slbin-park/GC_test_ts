import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import '../../config/env';
const fetch = require('node-fetch');
const axios = require('axios');
const KAKAO_LOGIN_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_DATA_URL = 'https://kapi.kakao.com/v2/user/me';
const KAKAO_REFRESH_TOKEN = 'https://kauth.kakao.com/oauth/token';
const KAKAO_REDIRECT_URI = 'http://localhost:8080/api/auth/kakao/callback';

class Kakao {
  // 카카오톡 로그인 실행
  static async login(req: Request, res: Response) {
    console.log('kakao 로그인 실행');
    const config: any = {
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: KAKAO_REDIRECT_URI,
      response_type: 'code',
    };

    const params = new URLSearchParams(config).toString();

    const finalUrl = `${KAKAO_LOGIN_URL}?${params}`;
    return res.redirect(finalUrl);
  }

  // 카카오톡 로그인 성공 후 callback 받음
  static async login_callback(req: Request, res: Response) {
    // 받은 코드로 access , refresh token을 받음
    try {
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
      let res_data;

      //access_token으로 사용자 정보 불러옴
      if (json.access_token != undefined) {
        res_data = await Kakao.get_kakao_data(json.access_token);
      } else {
        return res.send('access_token 없음');
      }
      console.log(res_data);
      // res_data 에서 userid 뽑아서 db에서 검색 후
      // 가입하지않았으면 login fail 넣어주고
      // 가입했으면 login success
      // access , refresh token 을 보내줌
      res.send(res_data); // 프론트엔드에서 확인하려고
    } catch (err) {
      console.log(err);
    }
  }

  static async get_kakao_data(access_token: string) {
    try {
      const get_data = await axios({
        method: 'get',
        url: KAKAO_DATA_URL,
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });
      return get_data.data;
    } catch (err) {
      console.log(err);
    }
  }

  // refresh_token 으로 access_token 재발급 받기
  static async get_access_token(req: Request, res: Response) {
    try {
      const refresh_token = req.headers.authorization;
      const data = {
        grant_type: 'refresh_token',
        client_id: `${process.env.KAKAO_CLIENT_ID}`,
        refresh_token: `${refresh_token}`,
      };

      const params = new URLSearchParams(data).toString();
      const finalUrl = `${KAKAO_REFRESH_TOKEN}?${params}`;

      let kakao_token;
      kakao_token = await axios.post(finalUrl).catch((err: any) => {
        res.status(err.response.status).send(err.response.data);
        // console.log(err.response.data);
        // console.log(err.response.status);
        // console.log(err.response.headers);
      });
      if (kakao_token != undefined) {
        if (kakao_token.refresh_token != undefined) {
          // 리프레시 토큰 디비에 다시넣기
        }
        res.send(kakao_token.access_token);
      }
    } catch (err: any) {
      //   console.log(err);
    }
  }

  // refresh_token이 있는지
  static async check_toekn(req: Request, res: Response, next: NextFunction) {
    // console.log(req.headers);
    if (req.headers.authorization == undefined) {
      res.send('리프레시토큰 없음');
    } else {
      next();
    }
  }

  static async check_code(req: Request, res: Response, next: NextFunction) {
    const code = req.query.code;
    if (code != undefined) {
      next();
    } else {
      // 엑세스 토큰이 없으면 로그인페이지로 리다이렉트
      return res.redirect('/login');
    }
  }
}

export default Kakao;
