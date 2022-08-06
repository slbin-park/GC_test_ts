import db from '../config/db';
import * as sql from './profile.sql';
import { Service } from 'typedi';
import 'reflect-metadata';

@Service()
class ProfileRepository {
  async get_by_id(conn: any, id: any) {
    const [profile_data] = await conn.query(sql.GET_USER_ID, id);
    return profile_data;
  }

  async save_follow(conn: any, user_id: any, follow_user_id: any, follow_status: any) {
    const [follow_save] = await conn.query(sql.SAVE_FOLLOW, [
      follow_user_id,
      user_id,
      follow_status,
    ]);
    return follow_save;
  }

  async get_follow(conn: any, user_id: any, follow_user_id: any) {
    const [follow_check] = await conn.query(sql.GET_FOLOW_USER, [follow_user_id, user_id]);
    return follow_check;
  }

  async update_follow(conn: any, user_id: any, follow_user_id: any, follow_status: any) {
    const [follow_update] = await conn.query(sql.UPDATE_FOLLOW, [
      follow_status,
      follow_user_id,
      user_id,
    ]);
    return follow_update;
  }

  // 팔로워 개수
  async get_follower_count(conn: any, user_id: any) {
    const [follower_count] = await conn.query(sql.GET_FOLLOWER_COUNT, user_id);
    return follower_count;
  }

  // 팔로잉 개수
  async get_following_count(conn: any, user_id: any) {
    const [following_count] = await conn.query(sql.GET_FOLLOWING_COUNT, user_id);
    return following_count;
  }

  // 게시글 개수
  async get_board_count(conn: any, user_id: any) {
    const [board_count] = await conn.query(sql.GET_BOARD_COUNT, user_id);
    return board_count;
  }

  // 프로필 피드 가져오기
  async get_feed(conn: any, user_id: any, last_board_id: any) {
    const [feed_data] = await conn.query(sql.GET_FEED, [user_id, last_board_id]);
    return feed_data;
  }

  // 팔로우한 사람들 피드
  async get_follow_feed(conn: any, user_id: any, last_board_id: any = 10000) {
    const [follow_feed_data] = await conn.query(sql.GET_ALL_FEED_FOLLOW, [user_id, last_board_id]);
    return follow_feed_data;
  }

  // 피드 이미지 불러오기
  async get_follow_feed_img(conn: any, img_info: any) {
    const [follow_feed_data] = await conn.query(sql.GET_BOARD_IMG, img_info);
    return follow_feed_data;
  }

  async update_user_profile(conn: any, user_profile: any) {
    const [res_user_profile] = await conn.query(sql.UPDATE_USER_PROFILE, user_profile);
    return res_user_profile;
  }

  async get_follow_sub_list_private(conn: any, user_id: any) {
    const [res_follow_list] = await conn.query(sql.GET_FOLLOW_SUB_LIST_PRIVATE, user_id);
    return res_follow_list;
  }
}

export default ProfileRepository;
