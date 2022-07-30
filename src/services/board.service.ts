import express, { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
import BoardRepository from '../datamanager/board/board.dm';
import '../config/env';
const axios = require('axios');
const fetch = require('node-fetch');

// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할

// 데이터를 검증한 후 제대로 받았을경우
// 비밀번호 암호화 기능
// 토큰 발급 기능 다 넣기

@Service()
class BoardService {
  // 여기서는 Model 을 주입시켜주자
  private readonly boardRepository: BoardRepository;
  constructor() {
    this.boardRepository = Container.get(BoardRepository);
  }

  async Save_board(boardInfo: any) {
    try {
      console.log('');
      const response = await this.boardRepository.save(boardInfo);
      const save_image = this.boardRepository.save_image;
      if (boardInfo.image != undefined) {
        boardInfo.image.map(async (data: any) => {
          await save_image(response, data);
        });
      }
      return { response, success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async Save_reply(replyInfo: any) {
    try {
      const { board_id, user_name, reply_content } = replyInfo;
      const check_board_id: any = await this.boardRepository.get_by_id(board_id);
      if (check_board_id.length == 0) {
        return { success: false, msg: '없는 게시글 입니다.' };
      }
      const save_reply = await this.boardRepository.save_reply(board_id, user_name, reply_content);
      return { success: true, save_reply };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default BoardService;
