import db from '../config/db';
import * as sql from './user.sql';
import { Container, Service } from 'typedi';
import 'reflect-metadata';

@Service()
class UserRepository {
  async save(conn: any, userInfo: any) {
    const [user] = await conn.query(sql.SAVE_USER, userInfo);
    return user;
  }
  async save_kakao(conn: any, userInfo: any) {
    const [user_kakao] = await conn.query(sql.SAVE_USER_KAKAO, userInfo);
    return user_kakao;
  }

  async find(conn: any) {
    const [user_data] = await conn.query(sql.GET_USER_ALL);
    return user_data;
  }

  async findById(conn: any, id: any) {
    const [user_data_id] = await conn.query(sql.GET_USER_ID, id);
    return user_data_id;
  }
  async get_change_user_name_count(conn: any, user_id: any) {
    const [user_data_id] = await conn.query(sql.GET_CHANGE_USER_NAME_COUNT, user_id);
    return user_data_id;
  }

  async update_user_name(conn: any, update_user_name_info: any) {
    const [res_update_user_name] = await conn.query(sql.UPDATE_USER_NAME, update_user_name_info);
    return res_update_user_name;
  }

  async save_user_name_change(conn: any, user_name: any) {
    const [res_update_user_name] = await conn.query(sql.SAVE_USER_NAME_CHANGE, user_name);
    return res_update_user_name;
  }

  async update_user_status(conn: any, user_info: any) {
    const [res_update_user_stauts] = await conn.query(sql.UPDATE_USER_STATUS, user_info);
    return res_update_user_stauts;
  }
}

export default UserRepository;
