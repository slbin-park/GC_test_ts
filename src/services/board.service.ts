import express, { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
import BoardRepository from '../datamanager/board/board.dm';
import '../config/env';

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

  async Save_board_like(board_id: any, user_name: any) {
    try {
      const board_like_status = 'LIKE';
      // 게시글이 있는지 체크함
      const check_board_id: any = await this.boardRepository.get_by_id(board_id);
      if (check_board_id.length == 0) {
        return { success: false, msg: '없는 게시글 입니다.' };
      }
      // 문제점 자기가 눌렀는지 누가 눌렀는지 모름
      // FIX user_name 도 같이 눌러서 자기가 누른건지 확인함
      const check_board_like_id: any = await this.boardRepository.get_by_id_board_like(
        board_id,
        user_name
      );
      // 자신이 누른적이 있을경우
      if (check_board_like_id.length) {
        const board_like = check_board_like_id[0];
        const board_like_status_check = board_like.board_like_status;
        const board_like_id = board_like.board_like_id;
        //좋아요 취소를 했을경우 LIKE로 바꿔줌
        if (board_like_status_check == 'UNLIKE') {
          const response: any = await this.boardRepository.update_board_like(
            board_like_id,
            board_like_status
          );
          return { success: true, msg: '좋아요 누르기 성공' };
        }
        return { success: false, msg: '이미 좋아요 누른 게시글' };
      }
      const response = await this.boardRepository.save_board_like(
        board_id,
        board_like_status,
        user_name
      );
      return { response, success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async Cancel_board_like(board_id: any, user_name: any) {
    try {
      const board_like_status = 'UNLIKE';
      const check_board_id: any = await this.boardRepository.get_by_id(board_id);
      if (check_board_id.length == 0) {
        return { success: false, msg: '없는 게시글 입니다.' };
      }
      // 자신이 좋아요를 누른 기록이 있는지 확인
      const check_board_like_id: any = await this.boardRepository.get_by_id_board_like(
        board_id,
        user_name
      );
      // 좋아요 누른적이 있을경우에
      if (check_board_like_id.length) {
        const board_like = check_board_like_id[0];
        const board_like_status_check = board_like.board_like_status;
        const board_like_id = board_like.board_like_id;
        // LIKE 일 경우에 취소로 바꿔버림
        if (board_like_status_check == 'LIKE') {
          const response: any = await this.boardRepository.update_board_like(
            board_like_id,
            board_like_status
          );
          return { success: true, msg: '좋아요 취소 성공' };
        }
        // 아닐경우에는 이미 취소된 게시글
        return { success: false, msg: '이미 좋아요 취소한게시글' };
      } else {
        // 좋아요 누른적이 없는데 취소를 했을경우
        return { success: false, msg: '좋아요 누른적 없는 게시글' };
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default BoardService;
