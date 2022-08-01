import db from '../config/db';
import {
  SAVE,
  SAVE_IMAGE,
  GET_BY_ID,
  SAVE_REPLY,
  SAVE_BOARD_LIKE,
  GET_BY_ID_BOARD_LIKE,
  UPDATE_BOARD_LIKE,
  GET_BY_ID_REPLY,
  GET_BY_ID_REPLY_LIKE,
  SAVE_REPLY_LIKE,
  UPDATE_REPLY_LIKE,
} from './board.sql';
import { Container, Service } from 'typedi';
import 'reflect-metadata';

@Service()
class BoardRepository {
  // 게시글 저장 ( 이미지는 따로 저장 )
  async save(boardInfo: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(
          SAVE,
          [boardInfo.user_name, boardInfo.board_status, boardInfo.board_content],
          (err: any, data: any) => {
            if (err) reject(`${err}`);
            resolve(data.insertId);
          }
        );
        conn.release();
      });
    });
  }

  // 피드 등록시 이미지 등록
  async save_image(board_id: any, image_address: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(SAVE_IMAGE, [board_id, image_address], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  // id로 게시글 조회
  async get_by_id(board_id: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(GET_BY_ID, [board_id], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  // 댓글 저장
  async save_reply(board_id: any, user_name_fk: any, reply_content: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(SAVE_REPLY, [board_id, user_name_fk, reply_content], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  // 게시글 좋아요 저장
  async save_board_like(board_id: any, board_like_status: any, user_name: any) {
    console.log(board_id, board_like_status, user_name);
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(
          SAVE_BOARD_LIKE,
          [board_id, board_like_status, user_name],
          (err: any, data: any) => {
            if (err) reject(`${err}`);
            resolve(data);
          }
        );
        conn.release();
      });
    });
  }

  // 게시글 좋아요 취소
  async update_board_like(board_like_id: any, board_like_status: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(UPDATE_BOARD_LIKE, [board_like_status, board_like_id], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  // 게시글 좋아요 눌렀는지 체크
  async get_by_id_board_like(board_id: any, user_name: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(GET_BY_ID_BOARD_LIKE, [board_id, user_name], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  // 댓글이 존재하는지 체크
  async get_by_id_reply(reply_id: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(GET_BY_ID_REPLY, [reply_id], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  // 댓글을 좋아요를 눌렀는지 체크
  async get_by_id_reply_like(reply_id: any, user_name: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(GET_BY_ID_REPLY_LIKE, [reply_id, user_name], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  // 댓글을 좋아요를 저장
  async save_reply_like(reply_id: any, reply_status: any, user_name: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(SAVE_REPLY_LIKE, [reply_id, reply_status, user_name], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  // 댓글을 좋아요를 수정
  async update_reply_like(reply_status: any, reply_like_id: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(UPDATE_REPLY_LIKE, [reply_status, reply_like_id], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }
}

export default BoardRepository;
