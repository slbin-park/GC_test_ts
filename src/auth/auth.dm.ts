import db from '../config/db';
import { FINDBY_KAKAOID, UPDATE_REFRESH_TOKEN, FINDBYUSERNAME } from './auth.sql';
import { Container, Service } from 'typedi';
import 'reflect-metadata';

@Service()
class AuthRepository {
  async get_kakao_user(conn: any) {
    const get_kakao_user = await conn.query(FINDBY_KAKAOID);
    return get_kakao_user;
  }
  async update_refresh_token(conn: any, update_refresh_info: any) {
    const update_refresh_token = await conn.query(UPDATE_REFRESH_TOKEN, update_refresh_info);
    return update_refresh_token;
  }

  async get_user_data(conn: any, id: any) {
    const get_user_date = await conn.query(FINDBYUSERNAME, id);
    return get_user_date;
  }
}

export default AuthRepository;
