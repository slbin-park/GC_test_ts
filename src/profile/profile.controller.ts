import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';

import UserService from '../user/user.service';
import ProfileService from './profile.service';

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴

const ProfileController = {
  get_profile: async (req: Request, res: Response) => {
    const profileServiceInstance: ProfileService = Container.get(ProfileService);

    const response = await profileServiceInstance.Get_profile(req.params.user_name);
    res.status(200).send(response);
  },

  follow_user: async (req: Request, res: Response) => {
    const profileServiceInstance: ProfileService = Container.get(ProfileService);
    const response = await profileServiceInstance.Save_follow(
      req.body.user_name,
      req.params.follow_user_name
    );
    res.status(200).send(response);
  },

  get_feed: async (req: Request, res: Response) => {
    const profileServiceInstance: ProfileService = Container.get(ProfileService);
    const response = await profileServiceInstance.Get_feed(
      req.params.user_name,
      req.body.last_board_id
    );
    res.status(200).send(response);
  },

  get_follow_feed: async (req: Request, res: Response) => {
    const { user_name, last_board_id } = req.body;
    const profileServiceInstance: ProfileService = Container.get(ProfileService);
    const response = await profileServiceInstance.Get_feed_follow(user_name, last_board_id);
    res.status(200).send(response);
  },
};

export default ProfileController;
