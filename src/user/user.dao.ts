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
    const [user_data] = await conn.query(sql.FIND_USER_ALL);
    return user_data;
  }

  async findById(conn: any, id: any) {
    const [user_data_id] = await conn.query(sql.FIND_USER_ID, id);
    return user_data_id;
  }
}

export default UserRepository;
