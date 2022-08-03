import express, { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
import BoardRepository from './board.dao';
import '../config/env';
import pool from '../config/db';

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

  async Save_board(user_name: any, board_content: any, images: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    const board_status = 'ACTIVE';
    try {
      await conn.beginTransaction();
      const boardInfo = [user_name, board_status, board_content];
      const response = await this.boardRepository.save(conn, boardInfo);
      const insertId = response[0].insertId;
      const save_image = this.boardRepository.save_image;

      if (images != undefined) {
        images.map(async (data: any) => {
          await save_image(conn, insertId, data);
        });
      }

      await conn.commit();

      return { msg: '게시글 등록 성공', success: true };
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      conn.release();
    }
  }

  async Save_reply(replyInfo: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      let success = true;
      let msg = '댓글 저장에 성공했습니다.';
      let response = '';
      await conn.beginTransaction();

      const { board_id, user_name, reply_content } = replyInfo;
      const reply_info = [board_id, user_name, reply_content];
      const check_board_id: any = await this.boardRepository.get_by_id(conn, board_id);
      if (check_board_id[0].length == 0) {
        success = false;
        msg = '없는 게시글 입니다.';
      } else {
        const save_reply = await this.boardRepository.save_reply(conn, reply_info);
        response = save_reply[0];
      }
      await conn.commit();

      return { success, response, msg };
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      conn.release();
    }
  }

  async Save_board_like(board_id: any, user_name: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);

    try {
      let success = true;
      await conn.beginTransaction();

      const board_like_status = 'LIKE';
      // 게시글이 있는지 체크함
      const check_board_id: any = await this.boardRepository.get_by_id(conn, board_id);
      if (check_board_id[0].length == 0) {
        return { success: false, msg: '없는 게시글 입니다.' };
      }
      // 문제점 자기가 눌렀는지 누가 눌렀는지 모름
      // FIX user_name 도 같이 눌러서 자기가 누른건지 확인함
      const board_like_info = [board_id, user_name];
      const check_board_like_id: any = await this.boardRepository.get_by_id_board_like(
        conn,
        board_like_info
      );
      // 자신이 누른적이 있을경우
      if (check_board_like_id[0].length) {
        const board_like = check_board_like_id[0][0];
        const board_like_status_check = board_like.board_like_status;
        const board_like_id = board_like.board_like_id;
        //좋아요 취소를 했을경우 LIKE로 바꿔줌
        if (board_like_status_check == 'UNLIKE') {
          const board_like_const = [board_like_status, board_like_id];
          const response: any = await this.boardRepository.update_board_like(
            conn,
            board_like_const
          );
          await conn.commit();
          return { success: true, msg: '좋아요 누르기 성공' };
        }
        return { success: false, msg: '이미 좋아요 누른 게시글' };
      }
      const save_board_like_info = [board_id, board_like_status, user_name];
      const response = await this.boardRepository.save_board_like(conn, save_board_like_info);
      return { response, success: true };
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      conn.release();
    }
  }

  async Cancel_board_like(board_id: any, user_name: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);

    try {
      await conn.beginTransaction();
      const board_like_status = 'UNLIKE';
      const check_board_id: any = await this.boardRepository.get_by_id(conn, board_id);
      if (check_board_id[0].length == 0) {
        return { success: false, msg: '없는 게시글 입니다.' };
      }
      // 자신이 좋아요를 누른 기록이 있는지 확인
      const get_board_like_info = [board_id, user_name];
      const check_board_like_id: any = await this.boardRepository.get_by_id_board_like(
        conn,
        get_board_like_info
      );
      // 좋아요 누른적이 있을경우에
      if (check_board_like_id[0].length) {
        const board_like = check_board_like_id[0][0];
        const board_like_status_check = board_like.board_like_status;
        const board_like_id = board_like.board_like_id;
        // LIKE 일 경우에 취소로 바꿔버림
        if (board_like_status_check == 'LIKE') {
          const update_board_like_info = [board_like_status, board_like_id];
          const response: any = await this.boardRepository.update_board_like(
            conn,
            update_board_like_info
          );
          await conn.commit();

          return { success: true, msg: '좋아요 취소 성공' };
        }
        // 아닐경우에는 이미 취소된 게시글
        return { success: true, msg: '이미 좋아요 취소한게시글' };
      } else {
        // 좋아요 누른적이 없는데 취소를 했을경우
        return { success: true, msg: '좋아요 누른적 없는 게시글' };
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      conn.release();
    }
  }

  async Save_reply_like(reply_id: any, user_name: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);

    try {
      await conn.beginTransaction();

      const reply_like_status = 'LIKE';
      const check_board_id: any = await this.boardRepository.get_by_id_reply(conn, reply_id);
      if (check_board_id[0].length == 0) {
        return { success: false, msg: '없는 댓글 입니다.' };
      }
      // 자신이 댓글을 좋아요를 누른 기록이 있는지 확인
      const get_reply_like_info = [reply_id, user_name];
      const check_reply_like: any = await this.boardRepository.get_by_id_reply_like(
        conn,
        get_reply_like_info
      );
      // 좋아요 누른적이 있을경우에
      if (check_reply_like[0].length) {
        const reply_like = check_reply_like[0][0];
        const reply_like_status_check = reply_like.reply_status;
        const reply_like_id = reply_like.reply_like_id;
        // UNLIKE 일 경우에 LIKE 로 바꿈
        if (reply_like_status_check == 'UNLIKE') {
          const update_reply_like_info = [reply_like_status, reply_like_id];
          const response: any = await this.boardRepository.update_reply_like(
            conn,
            update_reply_like_info
          );
          conn.commit();
          return { success: true, msg: '댓글 좋아요 수정 성공', response: response[0] };
        }
        // 아닐경우에는 이미 취소된 게시글
        return { success: false, msg: '이미 좋아요한 댓글 ' };
      } else {
        const reply_like_info = [reply_id, reply_like_status, user_name];
        const response = await this.boardRepository.save_reply_like(conn, reply_like_info);
        conn.commit();
        return { response: response[0], success: '댓글 좋아요 저장 성공' };
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      conn.release();
    }
  }

  async Cancel_reply_like(reply_id: any, user_name: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const reply_like_status = 'UNLIKE';
      const check_board_id: any = await this.boardRepository.get_by_id_reply(conn, reply_id);
      if (check_board_id.length == 0) {
        return { success: false, msg: '없는 댓글 입니다.' };
      }
      // 자신이 댓글을 좋아요를 누른 기록이 있는지 확인
      const get_reply_like_info = [reply_id, user_name];
      const check_reply_like: any = await this.boardRepository.get_by_id_reply_like(
        conn,
        get_reply_like_info
      );
      // 좋아요 누른적이 있을경우에
      if (check_reply_like.length) {
        const reply_like = check_reply_like[0];
        const reply_like_status_check = reply_like.reply_status;
        const reply_like_id = reply_like.reply_like_id;
        // LIKE 일 경우에 UNLIKE 로 바꿈
        console.log(reply_like_status_check);
        if (reply_like_status_check == 'LIKE') {
          const update_reply_like_info = [reply_like_status, reply_like_id];
          const response: any = await this.boardRepository.update_reply_like(
            conn,
            update_reply_like_info
          );
          return { success: true, msg: '댓글 좋아요 취소 성공', response };
        }
        // 아닐경우에는 이미 취소된 게시글
        return { success: false, msg: '이미 좋아요 취소한  댓글 ' };
      } else {
        return { success: '댓글 좋아요 누른적 없음' };
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      conn.release();
    }
  }

  async Save_reply_report(reply_id: any, user_name: any, report_content: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const reply_report_status = 'ACTIVE';
      // reply_id_Fk , report_content , user_name_fk , reply_report_status
      const check_reply_id: any = await this.boardRepository.get_by_id_reply(conn, reply_id);
      if (check_reply_id[0].length == 0) {
        return { success: true, msg: '없는 게시글 입니다.' };
      }
      // 자신이 단 댓글 신고 불가 로직
      // 신고를 여러번도 가능? 한듯
      // 좋아요 누른적이 있을경우에
      if (check_reply_id[0][0].user_name_fk == user_name) {
        return { success: true, msg: '자신의 게시글 에는 신고 불가합니다.' };
      }
      const reply_report_info = [reply_id, report_content, user_name, reply_report_status];
      const save_reply_report = await this.boardRepository.save_reply_report(
        conn,
        reply_report_info
      );
      return { response: save_reply_report, success: true };
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      conn.release();
    }
  }

  async Save_board_report(board_id: any, user_name: any, report_content: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const report_status = 'ACTIVE';
      // reply_id_Fk , report_content , user_name_fk , reply_report_status
      const check_board_id: any = await this.boardRepository.get_by_id(conn, board_id);
      if (check_board_id[0].length == 0) {
        return { success: true, msg: '없는 게시글 입니다.' };
      }
      // 자신이 단 댓글 신고 불가 로직
      // 신고를 여러번도 가능? 한듯
      // 좋아요 누른적이 있을경우에
      if (check_board_id[0][0].user_name_fk == user_name) {
        return { success: true, msg: '자신의 게시글 에는 신고 불가합니다.' };
      }
      const board_report_info = [board_id, report_content, user_name, report_status];
      const save_board_report = await this.boardRepository.save_board_report(
        conn,
        board_report_info
      );
      return { response: save_board_report, success: true };
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      conn.release();
    }
  }

  async Update_board(board_id: any, user_name: any, board_content: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const check_board_id = await this.boardRepository.get_by_id(conn, board_id);
      if (check_board_id[0].length == 0) {
        return { success: true, msg: '없는 게시글 입니다.' };
      } else if (check_board_id[0][0].user_name_fk != user_name) {
        return { success: true, msg: '게시글 작성자가 아닙니다.' };
      } else {
        const update_board_info = [board_content, board_id];
        const update_board: any = await this.boardRepository.update_board(conn, update_board_info);
        conn.commit();
        return { success: true, update_board: update_board[0], msg: '게시글 수정에 성공했습니다.' };
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      conn.release();
    }
  }
}

export default BoardService;
