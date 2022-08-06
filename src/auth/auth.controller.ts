import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';

import AuthService from './auth.service';

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const AuthController = {
  login: async (req: Request, res: Response) => {
    const AuthServiceInstance: AuthService = Container.get(AuthService);
    const { user_name, password } = req.body;
    const response = await AuthServiceInstance.login(user_name, password);
    res.send(response);
  },

  kakao_login: async (req: Request, res: Response) => {
    const AuthServiceInstance: AuthService = Container.get(AuthService);
    const response = await AuthServiceInstance.kakao_login();
    res.redirect(response);
  },

  kakao_login_callback: async (req: Request, res: Response) => {
    const AuthServiceInstance: AuthService = Container.get(AuthService);
    const response = await AuthServiceInstance.kakao_login_callback(req.query.code);
    res.send(response);
  },

  kakao_get_access_token: async (req: Request, res: Response) => {
    const AuthServiceInstance: AuthService = Container.get(AuthService);
    const a = req.headers.Authorization;
    const response = await AuthServiceInstance.kakao_get_access_token(req.headers.authorization);
    res.send(response);
  },
  auto_login: async (req: Request, res: Response) => {
    const AuthServiceInstance: AuthService = Container.get(AuthService);
    const refresh_token = req.headers.authorization?.split(' ')[1];
    const response: any = await AuthServiceInstance.auto_login(refresh_token);
    res.send(response);
  },
};

export default AuthController;
