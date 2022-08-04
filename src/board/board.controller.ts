import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import 'reflect-metadata';
import BoardService from './board.service';

// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후
// 서비스 레이어와 상호작용만 하도록
// 유효성 검사가 끝난 후 req가 넘어옴
const BoardController = {
  save: async (req: Request, res: Response) => {
    const boardInfo = req.body;
    const boardServiceInstance: BoardService = Container.get(BoardService);
    const response = await boardServiceInstance.Save_board(
      req.body.user_id,
      req.body.board_content,
      req.body.images
    );
    res.send(response);
  },

  save_reply: async (req: Request, res: Response) => {
    const replyInfo = req.body;
    const boardServiceInstance: BoardService = Container.get(BoardService);
    const response = await boardServiceInstance.Save_reply(replyInfo);
    res.send({ response });
  },

  save_board_like: async (req: Request, res: Response) => {
    const replyInfo = req.body;
    const boardServiceInstance: BoardService = Container.get(BoardService);
    const response = await boardServiceInstance.Save_board_like(
      req.params.board_id,
      replyInfo.user_id
    );
    res.send({ response });
  },

  cancel_board_like: async (req: Request, res: Response) => {
    const replyInfo = req.body;
    const boardServiceInstance: BoardService = Container.get(BoardService);
    const response = await boardServiceInstance.Cancel_board_like(
      req.params.board_id,
      replyInfo.user_id
    );
    res.send({ response });
  },

  save_reply_like: async (req: Request, res: Response) => {
    const replyInfo = req.body;
    const boardServiceInstance: BoardService = Container.get(BoardService);
    const response = await boardServiceInstance.Save_reply_like(
      req.params.reply_id,
      replyInfo.user_id
    );
    res.send({ response });
  },

  cancel_reply_like: async (req: Request, res: Response) => {
    const replyInfo = req.body;
    const boardServiceInstance: BoardService = Container.get(BoardService);
    const response = await boardServiceInstance.Cancel_reply_like(
      req.params.reply_id,
      replyInfo.user_id
    );
    res.send({ response });
  },

  save_reply_report: async (req: Request, res: Response) => {
    const { user_id, report_content } = req.body;
    const boardServiceInstance: BoardService = Container.get(BoardService);
    const response = await boardServiceInstance.Save_reply_report(
      req.params.reply_id,
      user_id,
      report_content
    );
    res.send({ response });
  },

  save_board_report: async (req: Request, res: Response) => {
    const { user_id, report_content } = req.body;
    const boardServiceInstance: BoardService = Container.get(BoardService);
    const response = await boardServiceInstance.Save_board_report(
      req.params.board_id,
      user_id,
      report_content
    );
    res.send({ response });
  },

  edit_board: async (req: Request, res: Response) => {
    const { user_id, board_content } = req.body;
    const boardServiceInstance: BoardService = Container.get(BoardService);
    const response = await boardServiceInstance.Update_board(
      req.params.board_id,
      user_id,
      board_content
    );
    res.send({ response });
  },
  delete_board: async (req: Request, res: Response) => {
    const { user_id } = req.body;
    const boardServiceInstance: BoardService = Container.get(BoardService);
    const response = await boardServiceInstance.Update_board_status(req.params.board_id, user_id);
    res.send({ response });
  },

  get_board_reply: async (req: Request, res: Response) => {
    const { user_id } = req.body;
    const boardServiceInstance: BoardService = Container.get(BoardService);
    const response = await boardServiceInstance.Get_board_reply(req.params.board_id, user_id);
    res.send({ response });
  },
};

export default BoardController;
