import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';
import BoardService from '../../services/board.service';

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const BoardController = {
  save: async (req: Request, res: Response) => {
    try {
      const boardInfo = req.body;
      const boardServiceInstance: BoardService = Container.get(BoardService);
      const response = await boardServiceInstance.Save_board(boardInfo);
      res.send(response);
    } catch (err: any) {}
  },
  save_reply: async (req: Request, res: Response) => {
    try {
      const replyInfo = req.body;
      const boardServiceInstance: BoardService = Container.get(BoardService);
      const response = await boardServiceInstance.Save_reply(replyInfo);
      res.send({ response });
    } catch (err: any) {}
  },
};

export default BoardController;
