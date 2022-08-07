import db from '../config/db';
import * as sql from './admin.sql';
import { Container, Service } from 'typedi';
import 'reflect-metadata';

@Service()
class AdminRepository {
  async get_user_data(conn: any, alphasql: any) {
    const finalsql: any = sql.GET_USER_DATA + alphasql;
    const [user] = await conn.query(finalsql);
    return user;
  }
  async get_user_data_user_id(conn: any, user_id: any) {
    const [user] = await conn.query(sql.GET_USER_ID, user_id);
    return user;
  }
  async update_user_data_user_id(conn: any, user_data: any) {
    const [user] = await conn.query(sql.UPDATE_USER_ID, user_data);
    return user;
  }
  async delete_user_admin(conn: any, user_id: any) {
    const [user] = await conn.query(sql.DELETE_USER, user_id);
    return user;
  }
  async get_feed_data(conn: any, alphasql: any) {
    const finalsql: any = sql.GET_BOARD_DATA + alphasql;
    const [user] = await conn.query(finalsql);
    return user;
  }
  async get_feed_reply_data(conn: any, board_id: any) {
    const [user] = await conn.query(sql.GET_BOARD_REPLY, board_id);
    return user;
  }
  async get_feed_like_data(conn: any, board_id: any) {
    const [user] = await conn.query(sql.GET_BOARD_LIKE, board_id);
    return user;
  }
  async get_feed_img(conn: any, board_id: any) {
    const [user] = await conn.query(sql.GET_BOARD_IMG, board_id);
    return user;
  }
  async get_reply_like_data(conn: any, board_id: any) {
    const [user] = await conn.query(sql.GET_REPLY_LIKE, board_id);
    return user;
  }
  async delete_feed_admin(conn: any, board_id: any) {
    const [board] = await conn.query(sql.DELETE_BOARD_ADMIN, board_id);
    return board;
  }
}

export default AdminRepository;
