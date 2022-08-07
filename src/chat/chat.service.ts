import express, { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
// 서비스에 이걸 임포트 해야함
import pool from '../config/db';
import ChatRepository from './chat.dao';

import * as Log from '../middlewares/adminlog/log.dao';
import { response, errResponse } from '../config/response';
import logger from '../config/winston';
import baseResponse from '../config/baseResponse';

// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할

// 데이터를 검증한 후 제대로 받았을경우
// 비밀번호 암호화 기능
// 토큰 발급 기능 다 넣기

@Service()
class ChatService {
  // 여기서는 Model 을 주입시켜주자
  private readonly chatRepository: ChatRepository;

  constructor() {
    this.chatRepository = Container.get(ChatRepository);
  }

  // 채팅 저장
  async Save_Chat(user_id: any, message: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      await this.chatRepository.save_chat(conn, user_id, message);
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      await conn.rollback();
      logger.error(`App - Save_Chat ChatService error\n: ${err.message} \n${JSON.stringify(err)}`);
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      await conn.release();
    }
  }

  async Get_Chat(user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const res = await this.chatRepository.get_chat(conn, user_id);
      return response(baseResponse.SUCCESS, res);
    } catch (err: any) {
      await conn.rollback();
      logger.error(`App - Save_Chat ChatService error\n: ${err.message} \n${JSON.stringify(err)}`);
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      await conn.release();
    }
  }
}

export default ChatService;
