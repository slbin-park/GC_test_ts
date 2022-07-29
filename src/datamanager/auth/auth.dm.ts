import db from '../../config/db';
import { FINDBY_KAKAOID } from './auth.sql';
import { Container, Service } from 'typedi';
import 'reflect-metadata';

@Service()
class UserRepository {
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
}

export default UserRepository;
