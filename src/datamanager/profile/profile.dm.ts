import db from '../../config/db';
import {
  FINDBYID,
  CHECKID,
  FOLLOW,
  CHECKFOLLOW,
  UPDATEFOLLOW,
  FOLLOWCOUNT,
  FOLLOWEDCOUNT,
  BOARDCOUNT,
  USERNAME,
  FEED,
  GETALLFEED,
} from './profile.sql';
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

  // 팔로워 개수
  async get_follower_count(user_name: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(FOLLOWEDCOUNT, [user_name], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data[0]);
        });
        conn.release();
      });
    });
  }

  // 팔로잉 개수
  async get_following_count(user_name: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(FOLLOWCOUNT, [user_name], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data[0]);
        });
        conn.release();
      });
    });
  }

  // 게시글 개수
  async get_board_count(user_name: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(BOARDCOUNT, [user_name], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data[0]);
        });
        conn.release();
      });
    });
  }

  // 이름 가져오기
  async get_name(user_name: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(USERNAME, [user_name], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data[0]);
        });
        conn.release();
      });
    });
  }

  // 프로필 피드 가져오기
  async get_feed(user_name: any, last_board_id: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(FEED, [user_name, last_board_id], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }

  // 팔로우한 사람들 피드
  async get_follow_feed(user_name: any, last_board_id: any) {
    return new Promise(async (resolve, reject) => {
      db((conn: any) => {
        conn.query(GETALLFEED, [user_name, last_board_id], (err: any, data: any) => {
          if (err) reject(`${err}`);
          resolve(data);
        });
        conn.release();
      });
    });
  }
}

export default ProfileRepository;
