import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';
// import { check_req } from '../../middlewares/validations/userValidation';

import UserService from '../../services/user.service';

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const BoardController = {
  //   post_user: async (req: Request, res: Response) => {
  //     try {
  //       const userServiceInstance: UserService = Container.get(UserService);
  //       let user, response;
  //       if (req.body.register == 'KAKAO') {
  //         user = new Kakao_User(req.body);
  //         response = await userServiceInstance.Save_Kakao(user);
  //       } else if (req.body.register == 'SELF') {
  //         user = new User(req.body);
  //         response = await userServiceInstance.Save(user);
  //       }
  //       res.status(200).json(response);
  //     } catch (err) {
  //       res.status(500).send({ success: 'false', err });
  //     }
  //   },
};

export default BoardController;
