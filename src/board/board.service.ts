import express, { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
import BoardRepository from './board.dao';
import '../config/env';
import pool from '../config/db';

import { response, errResponse } from '../config/response';
import logger from '../config/winston';
import baseResponse from '../config/baseResponse';

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

  async Save_board(user_id: any, board_content: any, images: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    const board_status = 'ACTIVE';
    try {
      await conn.beginTransaction();
      const boardInfo = [user_id, board_status, board_content];
      const res_Save_board = await this.boardRepository.save(conn, boardInfo);
      const insertId = res_Save_board.insertId;
      const save_image = this.boardRepository.save_image;

      if (images != undefined) {
        images.map(async (data: any) => {
          await save_image(conn, insertId, data);
        });
      }

      await conn.commit();
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      logger.error(
        `App - Save_board BoardService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Save_reply(replyInfo: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      await conn.beginTransaction();
      const { board_id, user_id, reply_content } = replyInfo;
      const reply_info = [board_id, user_id, reply_content];
      const check_board_id: any = await this.boardRepository.get_by_id(conn, board_id);

      if (check_board_id.length == 0) {
        return response(baseResponse.BOARD_NOTHING);
      } else {
        await this.boardRepository.save_reply(conn, reply_info);
      }

      await conn.commit();

      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      logger.error(
        `App - Save_reply BoardService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Save_board_like(board_id: any, user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);

    try {
      await conn.beginTransaction();

      const board_like_status = 'LIKE';
      // 게시글이 있는지 체크함
      const check_board_id: any = await this.boardRepository.get_by_id(conn, board_id);
      if (check_board_id.length == 0) {
        return response(baseResponse.BOARD_NOTHING);
      }
      // 문제점 자기가 눌렀는지 누가 눌렀는지 모름
      // FIX GET_USER_ID 도 같이 보내서 자기가 누른건지 확인함
      const board_like_info = [board_id, user_id];
      const check_board_like_id: any = await this.boardRepository.get_by_id_board_like(
        conn,
        board_like_info
      );
      // 자신이 누른적이 있을경우
      if (check_board_like_id.length) {
        const board_like = check_board_like_id[0];
        const board_like_status_check = board_like.board_like_status;
        const board_like_id = board_like.board_like_id;
        //좋아요 취소를 했을경우 LIKE로 바꿔줌
        if (board_like_status_check == 'UNLIKE') {
          const board_like_const = [board_like_status, board_like_id];
          await this.boardRepository.update_board_like(conn, board_like_const);
          await conn.commit();
          return response(baseResponse.SUCCESS);
        }
        // 이미 좋아요를 누른 게시글
        return response(baseResponse.BOARD_ALREADY_LIKE);
      }
      const save_board_like_info = [board_id, board_like_status, user_id];
      this.boardRepository.save_board_like(conn, save_board_like_info);
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      logger.error(
        `App - Save_board_like BoardService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Cancel_board_like(board_id: any, user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);

    try {
      await conn.beginTransaction();
      const board_like_status = 'UNLIKE';
      const check_board_id: any = await this.boardRepository.get_by_id(conn, board_id);
      if (check_board_id.length == 0) {
        return response(baseResponse.BOARD_NOTHING);
      }
      // 자신이 좋아요를 누른 기록이 있는지 확인
      const get_board_like_info = [board_id, user_id];
      const check_board_like_id: any = await this.boardRepository.get_by_id_board_like(
        conn,
        get_board_like_info
      );
      // 좋아요 누른적이 있을경우에
      if (check_board_like_id.length) {
        const board_like = check_board_like_id[0];
        const board_like_status_check = board_like.board_like_status;
        const board_like_id = board_like.board_like_id;
        // LIKE 일 경우에 취소로 바꿔버림
        if (board_like_status_check == 'LIKE') {
          const update_board_like_info = [board_like_status, board_like_id];
          await this.boardRepository.update_board_like(conn, update_board_like_info);
          await conn.commit();

          return response(baseResponse.SUCCESS);
        }
        // 아닐경우에는 이미 취소된 게시글
        return response(baseResponse.BOARD_ALREADY_UNLIKE);
      } else {
        // 좋아요 누른적이 없는데 취소를 했을경우
        return response(baseResponse.BOARD_LIKE_NOTHING);
      }
    } catch (err: any) {
      logger.error(
        `App - Cancel_baord_like BoardService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Save_reply_like(reply_id: any, user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);

    try {
      await conn.beginTransaction();

      const reply_like_status = 'LIKE';
      const check_board_id: any = await this.boardRepository.get_by_id_reply(conn, reply_id);
      if (check_board_id.length == 0) {
        return response(baseResponse.REPLY_NOTHING);
      }
      // 자신이 댓글을 좋아요를 누른 기록이 있는지 확인
      const get_reply_like_info = [reply_id, user_id];
      const check_reply_like: any = await this.boardRepository.get_by_id_reply_like(
        conn,
        get_reply_like_info
      );
      // 좋아요 누른적이 있을경우에
      if (check_reply_like.length) {
        const reply_like = check_reply_like[0];
        const reply_like_status_check = reply_like.reply_status;
        const reply_like_id = reply_like.reply_like_id;
        // UNLIKE 일 경우에 LIKE 로 바꿈
        if (reply_like_status_check == 'UNLIKE') {
          const update_reply_like_info = [reply_like_status, reply_like_id];
          await this.boardRepository.update_reply_like(conn, update_reply_like_info);
          conn.commit();
          return response(baseResponse.SUCCESS);
        }
        // 아닐경우에는 이미 좋아요한 댓글
        return response(baseResponse.REPLY_ALREADY_LIKE);
      } else {
        const reply_like_info = [reply_id, reply_like_status, user_id];
        await this.boardRepository.save_reply_like(conn, reply_like_info);
        conn.commit();
        return response(baseResponse.SUCCESS);
      }
    } catch (err: any) {
      logger.error(
        `App - Save_reply_like BoardService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Cancel_reply_like(reply_id: any, user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const reply_like_status = 'UNLIKE';
      // 자신이 댓글을 좋아요를 누른 기록이 있는지 확인
      const get_reply_like_info = [reply_id, user_id];
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
        if (reply_like_status_check == 'LIKE') {
          const update_reply_like_info = [reply_like_status, reply_like_id];
          await this.boardRepository.update_reply_like(conn, update_reply_like_info);
          return response(baseResponse.SUCCESS);
        }
        // 아닐경우에는 이미 취소된 댓글
        return response(baseResponse.REPLY_ALREADY_UNLIKE);
      } else {
        return response(baseResponse.REPLY_LIKE_NOTHING);
      }
    } catch (err: any) {
      logger.error(
        `App - Cancel_reply_like BoardService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Save_reply_report(reply_id: any, user_id: any, report_content: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const reply_report_status = 'ACTIVE';
      const check_reply_id: any = await this.boardRepository.get_by_id_reply(conn, reply_id);
      if (check_reply_id.length == 0) {
        return response(baseResponse.REPLY_NOTHING);
      }
      // 자신이 단 댓글 신고 불가 로직
      // 신고를 여러번도 가능? 한듯
      // 좋아요 누른적이 있을경우에
      if (check_reply_id[0].user_id_fk == user_id) {
        return response(baseResponse.REPLY_REPORT_SELF);
      }
      const reply_report_info = [reply_id, report_content, user_id, reply_report_status];
      await this.boardRepository.save_reply_report(conn, reply_report_info);
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      logger.error(
        `App - Save_reply_report BoardService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Save_board_report(board_id: any, user_id: any, report_content: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const report_status = 'ACTIVE';
      // reply_id_Fk , report_content , user_name_fk , reply_report_status
      const check_board_id: any = await this.boardRepository.get_by_id(conn, board_id);
      if (check_board_id.length == 0) {
        return response(baseResponse.BOARD_NOTHING);
      }
      // 자신이 단 댓글 신고 불가 로직
      // 신고를 여러번도 가능? 한듯
      // 좋아요 누른적이 있을경우에
      if (check_board_id[0].user_id_fk == user_id) {
        return response(baseResponse.BOARD_REPORT_SELF);
      }
      const board_report_info = [board_id, report_content, user_id, report_status];
      this.boardRepository.save_board_report(conn, board_report_info);
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      logger.error(
        `App - Save_board_report BoardService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Update_board(board_id: any, user_id: any, board_content: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const check_board_id = await this.boardRepository.get_by_id(conn, board_id);
      if (check_board_id.length == 0) {
        return response(baseResponse.BOARD_NOTHING);
      } else if (check_board_id[0].user_id_fk != user_id) {
        return response(baseResponse.BOARD_EDIT_NOT_SELF);
      } else {
        const update_board_info = [board_content, board_id];
        await this.boardRepository.update_board(conn, update_board_info);
        conn.commit();
        return response(baseResponse.SUCCESS);
      }
    } catch (err: any) {
      logger.error(
        `App - Update_board BoardService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Update_board_status(board_id: any, user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const board_status = 'DELETE';
      const check_board_id = await this.boardRepository.get_by_id(conn, board_id);
      if (check_board_id.length == 0) {
        return response(baseResponse.BOARD_NOTHING);
      } else if (check_board_id[0].user_id_fk != user_id) {
        return response(baseResponse.BOARD_EDIT_NOT_SELF);
      } else {
        const delete_board_info = [board_status, board_id];
        await this.boardRepository.update_board_status(conn, delete_board_info);
        conn.commit();
        return response(baseResponse.SUCCESS);
      }
    } catch (err: any) {
      conn.rollback();
      logger.error(
        `App - Update_board_status BoardService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Get_board_reply(board_id: any, user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const get_board_reply: any = await this.boardRepository.get_board_reply(conn, board_id);
      console.log(get_board_reply);
      return response(baseResponse.SUCCESS, get_board_reply);
    } catch (err: any) {
      logger.error(
        `App - Get_board_reply BoardService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }
}

export default BoardService;
