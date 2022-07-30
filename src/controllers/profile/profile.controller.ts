import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';

import UserService from '../../services/user.service';
import ProfileService from '../../services/profile.service';

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴

const ProfileController = {
  get_profile: async (req: Request, res: Response) => {
    try {
      const userServiceInstance: UserService = Container.get(UserService);
      res.status(200).json('asdf');
    } catch (err) {
      res.status(500).send({ success: 'false', err });
    }
  },
  follow_user: async (req: Request, res: Response) => {
    try {
      const profileServiceInstance: ProfileService = Container.get(ProfileService);
      const response = await profileServiceInstance.Follow(
        req.body.user_name,
        req.params.follow_user_name
      );
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send({ success: 'false', err });
    }
  },
};

export default ProfileController;
