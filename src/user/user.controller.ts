import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';

import UserService from './user.service';

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const UserController = {
  post_user: async (req: Request, res: Response) => {
    const userServiceInstance: UserService = Container.get(UserService);
    let user, response;
    const {
      user_name,
      phone_number,
      name,
      password,
      birthday,
      register,
      user_status,
      accept_date,
      social_id,
    } = req.body;
    if (req.body.register == 'KAKAO') {
      response = await userServiceInstance.Save_Kakao(
        user_name,
        phone_number,
        name,
        password,
        birthday,
        register,
        user_status,
        accept_date,
        social_id
      );
    } else if (req.body.register == 'SELF') {
      response = await userServiceInstance.Save(
        user_name,
        phone_number,
        name,
        password,
        birthday,
        register,
        user_status,
        accept_date
      );
      res.send(response);
    }
  },

  get_user: async (req: Request, res: Response) => {
    const userServiceInstance: UserService = Container.get(UserService);
    const response = await userServiceInstance.Find();
    res.json(response);
  },

  get_user_id: async (req: Request, res: Response) => {
    const { id } = req.params;
    const userServiceInstance: UserService = Container.get(UserService);
    const response = await userServiceInstance.Find_Id(id);
    res.json(response);
  },
  // 구현해야함 - 0804
  update_user_profile: async (req: Request, res: Response) => {
    const { id } = req.params;
    const userServiceInstance: UserService = Container.get(UserService);
    const response = await userServiceInstance.Find_Id(id);
    res.json(response);
  },
  get_user_name: async (req: Request, res: Response) => {
    const { user_name } = req.params;
    const userServiceInstance: UserService = Container.get(UserService);
    const response = await userServiceInstance.Find_user_name(user_name);
    res.json(response);
  },
  update_user_name: async (req: Request, res: Response) => {
    const { user_name, user_id } = req.body;
    const userServiceInstance: UserService = Container.get(UserService);
    const response = await userServiceInstance.Update_user_name(user_name, user_id);
    res.json(response);
  },
  update_user_status: async (req: Request, res: Response) => {
    const { user_id, user_status } = req.body;
    const userServiceInstance: UserService = Container.get(UserService);
    const response = await userServiceInstance.Update_user_status(user_id, user_status);
    res.json(response);
  },
  update_user_psword: async (req: Request, res: Response) => {
    const { phone_number, password } = req.body;
    const userServiceInstance: UserService = Container.get(UserService);
    const response = await userServiceInstance.Update_user_psword(phone_number, password);
    res.json(response);
  },
};

export default UserController;
