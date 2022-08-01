import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';
import BoardService from './board.service';

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

  save_board_like: async (req: Request, res: Response) => {
    try {
      const replyInfo = req.body;
      const boardServiceInstance: BoardService = Container.get(BoardService);
      const response = await boardServiceInstance.Save_board_like(
        req.params.board_id,
        replyInfo.user_name
      );
      res.send({ response });
    } catch (err: any) {}
  },

  cancel_board_like: async (req: Request, res: Response) => {
    try {
      const replyInfo = req.body;
      const boardServiceInstance: BoardService = Container.get(BoardService);
      const response = await boardServiceInstance.Cancel_board_like(
        req.params.board_id,
        replyInfo.user_name
      );
      res.send({ response });
    } catch (err: any) {}
  },

  save_reply_like: async (req: Request, res: Response) => {
    try {
      const replyInfo = req.body;
      const boardServiceInstance: BoardService = Container.get(BoardService);
      const response = await boardServiceInstance.Save_reply_like(
        req.params.reply_id,
        replyInfo.user_name
      );
      res.send({ response });
    } catch (err: any) {}
  },

  cancel_reply_like: async (req: Request, res: Response) => {
    try {
      const replyInfo = req.body;
      const boardServiceInstance: BoardService = Container.get(BoardService);
      const response = await boardServiceInstance.Cancel_reply_like(
        req.params.reply_id,
        replyInfo.user_name
      );
      res.send({ response });
    } catch (err: any) {}
  },
};

export default BoardController;
