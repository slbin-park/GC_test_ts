import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';
import { check_req } from '../../middlewares/validations/userValidation';
import { User } from './user.dto';

import UserService from '../../services/user.service';

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const UserController = {
  post_user: async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      const userServiceInstance: UserService = Container.get(UserService);
      const response = await userServiceInstance.Save(user);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send({ success: 'false', err });
    }
  },

  get_user: async (req: Request, res: Response) => {
    try {
      const userServiceInstance: UserService = Container.get(UserService);
      const response = await userServiceInstance.Find();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send({ success: 'false', err });
    }
  },

  get_user_id: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userServiceInstance: UserService = Container.get(UserService);
      const response = await userServiceInstance.Find_Id(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send({ success: 'false', err });
    }
  },
};

export default UserController;
