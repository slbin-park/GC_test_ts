import express, { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
// 서비스에 이걸 임포트 해야함
import pool from '../config/db';
import ProfileRepository from './profile.dao';

import * as Log from '../middlewares/adminlog/log.dao';
import { response, errResponse } from '../config/response';
import logger from '../config/winston';
import baseResponse from '../config/baseResponse';

// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할

// 데이터를 검증한 후 제대로 받았을경우
// 비밀번호 암호화 기능
// 토큰 발급 기능 다 넣기

@Service()
class ProfileService {
  // 여기서는 Model 을 주입시켜주자
  private readonly profileRepository: ProfileRepository;

  constructor() {
    this.profileRepository = Container.get(ProfileRepository);
  }

  async Get_profile(user_id: any, self_user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const check_user: any = await this.profileRepository.get_by_id(conn, user_id);
      if (check_user.length == 0) {
        return response(baseResponse.USER_NOTHING);
      }

      const following: any = await this.profileRepository.get_following_count(conn, user_id);
      const follower: any = await this.profileRepository.get_follower_count(conn, user_id);
      const board_count: any = await this.profileRepository.get_board_count(conn, user_id);
      const { user_name, name, profileUrl, website, introduction } = check_user[0];
      const user_status = check_user[0].user_status;

      // 비공개 계정 처리 로직
      if (check_user[0].user_status == 'PRIVATE') {
        if (check_user[0].user_id != self_user_id) {
          const check_follow_status = await this.profileRepository.get_follow_status(conn, [
            self_user_id,
            user_id,
          ]);
          if (check_follow_status.length != 0) {
            if (check_follow_status[0].follow_status != 'FOLLOW') {
              return response(baseResponse.SUCCESS, {
                following_count: following[0].count,
                follower_count: follower[0].count,
                board_count: board_count[0].count,
                user_id,
                user_name,
                name,
                profileUrl,
                website,
                introduction,
                user_status,
              });
            }
          } else {
            return response(baseResponse.SUCCESS, {
              following_count: following[0].count,
              follower_count: follower[0].count,
              board_count: board_count[0].count,
              user_id,
              user_name,
              name,
              profileUrl,
              website,
              introduction,
              user_status,
            });
          }
        }
      }
      const user_post: any = await this.profileRepository.get_feed(conn, user_id, 10000);
      await conn.commit();
      await Log.save_user_log(user_id, 'READ');
      return response(baseResponse.SUCCESS, {
        following_count: following[0].count,
        follower_count: follower[0].count,
        board_count: board_count[0].count,
        user_status,
        user_id,
        user_name,
        name,
        profileUrl,
        website,
        introduction,
        user_post,
      });
    } catch (err: any) {
      logger.error(
        `App - Get_porfile ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Save_follow(user_id: any, follow_user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      await conn.beginTransaction();
      let follow_status = 'FOLLOW';
      // 대상유저가 존재하는 아이디 인지 체크
      const check_id: any = await this.profileRepository.get_by_id(conn, follow_user_id);
      if (check_id.length == 0) {
        return response(baseResponse.USER_NOTHING);
      }
      //팔로우 신청
      const check_follow: any = await this.profileRepository.get_follow(
        conn,
        user_id,
        follow_user_id
      );

      // 팔로우 할때 체크

      // 팔로우 요청을 한적이 있는지 체크
      // 비공개 로직을 위해 전체 데이터를 다 가져옴
      // 요청한 적이 있으면 status를 FOLLOW로 바꿈
      if (check_follow.length == 0) {
        //   팔로우 함
        if (check_id[0].user_status == 'PRIVATE') {
          follow_status = 'SUBSCRIPTION';
        }
        await this.profileRepository.save_follow(conn, user_id, follow_user_id, follow_status);
      } else {
        if (check_id[0].user_status == 'PRIVATE') {
          return response(baseResponse.FOLLOW_PRIVATE_ALREADY);
        }
        // 팔로우 한적이 있으면 업데이트
        else {
          await this.profileRepository.update_follow(conn, user_id, follow_user_id, follow_status);
        }
      }
      await conn.commit();
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      conn.rollback();
      logger.error(
        `App - Save_follow ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  // 팔로우 취소
  async Update_follow(user_id: any, follow_user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      await conn.beginTransaction();
      let follow_status = 'UNFOLLOW';
      // 대상유저가 존재하는 아이디 인지 체크
      const check_id: any = await this.profileRepository.get_by_id(conn, follow_user_id);
      if (check_id.length == 0) {
        return response(baseResponse.USER_NOTHING);
      }
      //팔로우 신청
      const check_follow: any = await this.profileRepository.get_follow(
        conn,
        user_id,
        follow_user_id
      );

      // 팔로우 할때 체크

      // 팔로우 요청을 한적이 있는지 체크
      // 비공개 로직을 위해 전체 데이터를 다 가져옴
      // 요청한 적이 있으면 status를 FOLLOW로 바꿈
      if (check_follow.length == 0) {
        return response(baseResponse.FOLLOW_NOTHING);
      } else {
        await this.profileRepository.update_follow(conn, user_id, follow_user_id, follow_status);
      }
      await conn.commit();
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      logger.error(
        `App - Update_follow ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  // 팔로우 신청 리스트 조회
  async Get_follow_sub_list(user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const follow_list = await this.profileRepository.get_follow_sub_list_private(conn, user_id);
      return response(baseResponse.SUCCESS, follow_list);
    } catch (err: any) {
      logger.error(
        `App - Get_follow_list ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Get_feed(user_id: any, last_board_id: any, self_user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);

    try {
      const check_user: any = await this.profileRepository.get_by_id(conn, user_id);
      const res_Get_feed: any = await this.profileRepository.get_feed(conn, user_id, last_board_id);
      if (check_user.length == 0) {
        return response(baseResponse.USER_NOTHING);
      }
      if (check_user[0].user_status == 'PRIVATE') {
        if (check_user[0].user_id != self_user_id) {
          const check_follow_status = await this.profileRepository.get_follow_status(conn, [
            self_user_id,
            user_id,
          ]);
          if (check_follow_status.length != 0) {
            if (check_follow_status[0].follow_status != 'FOLLOW') {
              return response(baseResponse.SUCCESS, res_Get_feed);
            } else {
              return response(baseResponse.PRIVATE_USER);
            }
          } else {
            return response(baseResponse.PRIVATE_USER);
          }
        }
      }
      return response(baseResponse.SUCCESS, res_Get_feed);
    } catch (err: any) {
      logger.error(
        `App - Get_feed ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Get_feed_follow(user_id: any, last_board_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);

    try {
      const board_data: any = await this.profileRepository.get_follow_feed(
        conn,
        user_id,
        last_board_id
      );
      for (let board of board_data) {
        const board_id = board.board_id;
        const board_img = await this.profileRepository.get_follow_feed_img(conn, board_id);
        board.imgs = board_img;
      }
      return response(baseResponse.SUCCESS, board_data);
    } catch (err: any) {
      logger.error(
        `App - Get_feed_follow ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Update_user_profile(user_id: any, profileUrl: any, website: any, introduction: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);

    try {
      const user_profile_info = [profileUrl, website, introduction, user_id];
      await this.profileRepository.update_user_profile(conn, user_profile_info);
      await conn.commit();
      await Log.save_user_log(user_id, 'UPDATE');
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      logger.error(
        `App - Update_user_profile ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Update_follow_accept(user_id: any, follow_user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      await conn.commit();
      const status = 'FOLLOW';
      const info = [status, user_id, follow_user_id];
      await this.profileRepository.update_follow(conn, follow_user_id, user_id, status);
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      conn.rollback();
      logger.error(
        `App - Save_follow ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }
}

export default ProfileService;
