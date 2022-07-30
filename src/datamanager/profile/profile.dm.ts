import db from '../../config/db';
import { FINDBYID, CHECKID, FOLLOW, CHECKFOLLOW, UPDATEFOLLOW } from './profile.sql';
import { Service } from 'typedi';
import 'reflect-metadata';

@Service()
class ProfileRepository {
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

  async checkbyid(id: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(CHECKID, [id], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data[0]);
        });
        conn.release();
      });
    });
  }

  async follow(user_name: any, follow_user_name: any, follow_status: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(FOLLOW, [follow_user_name, user_name, follow_status], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  async check_follow(user_name: any, follow_user_name: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(CHECKFOLLOW, [follow_user_name, user_name], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  async update_follow(user_name: any, follow_user_name: any, follow_status: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(
          UPDATEFOLLOW,
          [follow_status, follow_user_name, user_name],
          (err: any, data: any) => {
            if (err) reject(`${err}`);
            resolve(data);
          }
        );
        conn.release();
      });
    });
  }
}

export default ProfileRepository;
