import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';

import UserService from '../user/user.service';
import ChatService from './chat.service';

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴

const ChatController = {
  save_chat: async (req: Request, res: Response) => {
    const chatServiceInstance: ChatService = Container.get(ChatService);
    const { user_id, message } = req.body;
    const response = await chatServiceInstance.Save_Chat(user_id, message);
    res.send(response);
  },

  get_chat: async (req: Request, res: Response) => {
    const chatServiceInstance: ChatService = Container.get(ChatService);
    const { user_id } = req.body;
    const response = await chatServiceInstance.Get_Chat(user_id);
    res.send(response);
  },
};

export default ChatController;
