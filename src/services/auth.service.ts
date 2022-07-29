import express, { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
import AuthRepository from '../datamanager/auth/auth.dm';
import '../config/env';
const axios = require('axios');
const fetch = require('node-fetch');

const KAKAO_LOGIN_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_DATA_URL = 'https://kapi.kakao.com/v2/user/me';
const KAKAO_REFRESH_TOKEN = 'https://kauth.kakao.com/oauth/token';
const KAKAO_REDIRECT_URI = 'http://localhost:8080/api/auth/kakao/callback';

// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할

// 데이터를 검증한 후 제대로 받았을경우
// 비밀번호 암호화 기능
// 토큰 발급 기능 다 넣기

@Service()
class AuthService {
  // 여기서는 Model 을 주입시켜주자
  private readonly authRepository: AuthRepository;
  constructor() {
    this.authRepository = Container.get(AuthRepository);
  }

  async kakao_login() {
    try {
      console.log('kakao 로그인 실행');
      const config: any = {
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: KAKAO_REDIRECT_URI,
        response_type: 'code',
      };

      const params = new URLSearchParams(config).toString();

      const finalUrl = `${KAKAO_LOGIN_URL}?${params}`;
      return finalUrl;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async kakao_login_callback(code: any) {
    // 받은 코드로 access , refresh token을 받음
    try {
      const baseUrl = 'https://kauth.kakao.com/oauth/token';
      const config: any = {
        client_id: process.env.KAKAO_CLIENT_ID,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:8080/api/auth/kakao/callback',
        code,
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
        res_data = await AuthService.get_kakao_data(json.access_token);
      } else {
        return 'access_token 없음';
      }
      console.log(res_data);
      // res_data 에서 userid 뽑아서 db에서 검색 후
      // 가입하지않았으면 login fail 넣어주고
      // 가입했으면 login success
      // access , refresh token 을 보내줌

      return res_data; // 프론트엔드에서 확인하려고
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
  async kakao_get_access_token(refresh_token: any) {
    try {
      const data = {
        grant_type: 'refresh_token',
        client_id: `${process.env.KAKAO_CLIENT_ID}`,
        refresh_token: `${refresh_token}`,
      };

      const params = new URLSearchParams(data).toString();
      const finalUrl = `${KAKAO_REFRESH_TOKEN}?${params}`;

      let kakao_token;
      kakao_token = await axios.post(finalUrl).catch((err: any) => {
        return { status: err.response.status, data: err.response.data };
        // console.log(err.response.data);
        // console.log(err.response.status);
        // console.log(err.response.headers);
      });
      if (kakao_token != undefined) {
        if (kakao_token.refresh_token != undefined) {
          // 리프레시 토큰 디비에 다시넣기
        }
        return kakao_token.access_token;
      }
    } catch (err: any) {
      //   console.log(err);
    }
  }
}

export default AuthService;
