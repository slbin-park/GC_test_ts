import db from '../config/db';
import { SAVE, FIND, FINDBYID, SAVE_KAKAO } from './user.sql';
import { Container, Service } from 'typedi';
import 'reflect-metadata';

@Service()
class UserRepository {
  async save(userInfo: any) {
    return new Promise(async (resolve, reject) => {
      console.log(SAVE);
      db((conn: any) => {
        conn.query(
          SAVE,
          [
            userInfo.user_name,
            userInfo.phone_number,
            userInfo.name,
            userInfo.password,
            userInfo.birthday,
            userInfo.register,
            userInfo.user_status,
            userInfo.accept_date,
            userInfo.refresh_token,
          ],
          (err: any, data: any) => {
            if (err) reject(`${err}`);
            resolve(data);
          }
        );
        conn.release();
      });
    });
  }
  async save_kakao(userInfo: any) {
    return new Promise(async (resolve, reject) => {
      console.log(userInfo.social_id);
      db((conn: any) => {
        conn.query(
          SAVE_KAKAO,
          [
            userInfo.user_name,
            userInfo.phone_number,
            userInfo.name,
            userInfo.birthday,
            userInfo.register,
            userInfo.user_status,
            userInfo.accept_date,
            userInfo.refresh_token,
            userInfo.social_id,
          ],
          (err: any, data: any) => {
            if (err) reject(`${err}`);
            resolve(data);
          }
        );
        conn.release();
      });
    });
  }

  async find() {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(FIND, [], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  async findById(id: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(FINDBYID, [id], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }
}

export default UserRepository;
