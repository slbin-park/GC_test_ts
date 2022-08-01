import db from '../config/db';
import { FINDBY_KAKAOID, UPDATE_REFRESH_TOKEN, FINDBYUSERNAME } from './auth.sql';
import { Container, Service } from 'typedi';
import 'reflect-metadata';

@Service()
class AuthRepository {
  async get_kakao_user(userInfo: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(FINDBY_KAKAOID, [], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }
  async update_refresh_token(id: any, refresh_token: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(UPDATE_REFRESH_TOKEN, [refresh_token, id], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  async get_user_data(id: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(FINDBYUSERNAME, [id], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data[0]);
        });
        conn.release();
      });
    });
  }
}

export default AuthRepository;
