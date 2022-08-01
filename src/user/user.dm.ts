import db from '../config/db';
import { SAVE, FIND, FINDBYID, SAVE_KAKAO } from './user.sql';
import { Container, Service } from 'typedi';
import 'reflect-metadata';

@Service()
class UserRepository {
  async save(conn: any, userInfo: any) {
    const user = await conn.query(SAVE, [
      userInfo.user_name,
      userInfo.phone_number,
      userInfo.name,
      userInfo.password,
      userInfo.birthday,
      userInfo.register,
      userInfo.user_status,
      userInfo.accept_date,
      userInfo.refresh_token,
    ]);
    return user;
  }
  async save_kakao(conn: any, userInfo: any) {
    const user_kakao = await conn.query(SAVE_KAKAO, [
      userInfo.user_name,
      userInfo.phone_number,
      userInfo.name,
      userInfo.birthday,
      userInfo.register,
      userInfo.user_status,
      userInfo.accept_date,
      userInfo.refresh_token,
      userInfo.social_id,
    ]);
    return user_kakao;
  }

  async find(conn: any) {
    const user_data = await conn.query(FIND);
    return user_data;
  }

  async findById(conn: any, id: any) {
    const user_data_id = await conn.query(FINDBYID, id);
    return user_data_id;
  }
}

export default UserRepository;
