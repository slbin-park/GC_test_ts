import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';
import { User } from './dto/user.dto';
import { Kakao_User } from './dto/kakao_user.dto';

import UserService from './user.service';

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const UserController = {
  post_user: async (req: Request, res: Response) => {
    const userServiceInstance: UserService = Container.get(UserService);
    let user, response;
    if (req.body.register == 'KAKAO') {
      user = new Kakao_User(req.body);
      response = await userServiceInstance.Save_Kakao(user);
    } else if (req.body.register == 'SELF') {
      user = new User(req.body);
      response = await userServiceInstance.Save(user);
      console.log(response);
    }
    res.status(200).json(response);
  },

  get_user: async (req: Request, res: Response) => {
    const userServiceInstance: UserService = Container.get(UserService);
    const response = await userServiceInstance.Find();
    res.status(200).json(response);
  },

  get_user_id: async (req: Request, res: Response) => {
    const { id } = req.params;
    const userServiceInstance: UserService = Container.get(UserService);
    const response = await userServiceInstance.Find_Id(id);
    res.status(200).json(response);
  },
  eidt_user_profile: async (req: Request, res: Response) => {
    const { id } = req.params;
    const userServiceInstance: UserService = Container.get(UserService);
    const response = await userServiceInstance.Find_Id(id);
    res.status(200).json(response);
  },
};

export default UserController;
