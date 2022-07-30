import db from '../../config/db';
import { SAVE, SAVE_IMAGE, GET_BY_ID, SAVE_REPLY } from './board.sql';
import { Container, Service } from 'typedi';
import 'reflect-metadata';

@Service()
class BoardRepository {
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
}

export default BoardRepository;
