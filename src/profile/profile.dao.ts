import db from '../config/db';
import * as sql from './profile.sql';
import { Service } from 'typedi';
import 'reflect-metadata';

@Service()
class ProfileRepository {
  async get_by_id(conn: any, id: any) {
    const [profile_data] = await conn.query(sql.GET_USER_NAME, id);
    return profile_data;
  }

  async save_follow(conn: any, user_name: any, follow_user_name: any, follow_status: any) {
    const follow_save = await conn.query(sql.SAVE_FOLLOW, [
      follow_user_name,
      user_name,
      follow_status,
    ]);
    return follow_save;
  }

  async get_follow(conn: any, user_name: any, follow_user_name: any) {
    const follow_check = await conn.query(sql.GET_FOLOW_USER, [follow_user_name, user_name]);
    return follow_check;
  }

  async update_follow(conn: any, user_name: any, follow_user_name: any, follow_status: any) {
    const follow_update = await conn.query(sql.UPDATE_FOLLOW, [
      follow_status,
      follow_user_name,
      user_name,
    ]);
    return follow_update;
  }

  // 팔로워 개수
  async get_follower_count(conn: any, user_name: any) {
    const follower_count = await conn.query(sql.GET_FOLLOWER_COUNT, user_name);
    return follower_count;
  }

  // 팔로잉 개수
  async get_following_count(conn: any, user_name: any) {
    const following_count = await conn.query(sql.GET_FOLLOWING_COUNT, user_name);
    return following_count;
  }

  // 게시글 개수
  async get_board_count(conn: any, user_name: any) {
    const board_count = await conn.query(sql.GET_BOARD_COUNT, user_name);
    return board_count;
  }

  // 프로필 피드 가져오기
  async get_feed(conn: any, user_name: any, last_board_id: any) {
    const feed_data = await conn.query(sql.GET_FEED, [user_name, last_board_id]);
    return feed_data;
  }

  // 팔로우한 사람들 피드
  async get_follow_feed(conn: any, user_name: any, last_board_id: any) {
    const follow_feed_data = await conn.query(sql.GET_ALL_FEED_FOLLOW, [user_name, last_board_id]);
    return follow_feed_data;
  }
}

export default ProfileRepository;
