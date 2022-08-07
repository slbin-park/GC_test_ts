import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';

import AdminService from './admin.service';

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const AdminController = {
  get_user_data: async (req: Request, res: Response) => {
    const { userid, username, user_status, createat } = req.query;
    const userServiceInstance: AdminService = Container.get(AdminService);
    const response = await userServiceInstance.Get_user_data(
      userid,
      username,
      user_status,
      createat
    );
    res.send(response);
  },

  get_user_data_id: async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const userServiceInstance: AdminService = Container.get(AdminService);
    const response = await userServiceInstance.Get_user_data_user_id(user_id);
    res.send(response);
  },

  update_user_data_id: async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const {
      user_name,
      phone_number,
      name,
      password,
      birthday,
      register,
      user_status,
      accept_date,
      refresh_token,
      social_id,
      profileUrl,
      website,
      introduction,
      create_at,
      update_at,
    } = req.body;
    const user_info = [
      user_name,
      phone_number,
      name,
      password,
      birthday,
      register,
      user_status,
      accept_date,
      refresh_token,
      social_id,
      profileUrl,
      website,
      introduction,
      create_at,
      update_at,
      user_id,
    ];
    const userServiceInstance: AdminService = Container.get(AdminService);
    const response = await userServiceInstance.Update_user_data_user_id(user_info, user_id);
    res.send(response);
  },
};

export default AdminController;
