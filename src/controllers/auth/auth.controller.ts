import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';

import AuthService from '../../services/auth.service';

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const AuthController = {
  kakao_login: async (req: Request, res: Response) => {
    try {
      const AuthServiceInstance: AuthService = Container.get(AuthService);
      const response = await AuthServiceInstance.kakao_login();
      res.redirect(response);
    } catch (err) {
      res.status(500).send({ success: 'false', err });
    }
  },

  kakao_login_callback: async (req: Request, res: Response) => {
    try {
      const AuthServiceInstance: AuthService = Container.get(AuthService);
      const response = await AuthServiceInstance.kakao_login_callback(req, res);
      res.send(response);
    } catch (err) {
      res.status(500).send({ success: 'false', err });
    }
  },

  kakao_get_access_token: async (req: Request, res: Response) => {
    try {
      const AuthServiceInstance: AuthService = Container.get(AuthService);
      const response = await AuthServiceInstance.kakao_get_access_token(req.headers.authorization);
      res.send(response);
    } catch (err: any) {
      res.status(500).send({ success: 'false', err });
    }
  },
};

export default AuthController;
