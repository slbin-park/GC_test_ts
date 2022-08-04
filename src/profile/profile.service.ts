import express, { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
// 서비스에 이걸 임포트 해야함
import pool from '../config/db';
import UserRepository from '../user/user.dao';
import ProfileRepository from './profile.dao';

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

  async Get_profile(user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const check_user: any = await this.profileRepository.get_by_id(conn, user_id);
      if (check_user.length == 0) {
        return response(baseResponse.USER_NOTHING);
      }
      const following: any = await this.profileRepository.get_following_count(conn, user_id);
      const follower: any = await this.profileRepository.get_follower_count(conn, user_id);
      const board: any = await this.profileRepository.get_board_count(conn, user_id);
      return response(baseResponse.SUCCESS, {
        following,
        follower,
        board,
        name: check_user[0].name,
        user_id,
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
      const follow_status = 'FOLLOW';
      // 대상유저가 존재하는 아이디 인지 체크
      const check_id: any = await this.profileRepository.get_by_id(conn, follow_user_id);
      if (check_id.length == 0) {
        return response(baseResponse.USER_NOTHING);
      }
      // 팔로우 요청을 한적이 있는지 체크
      // 비공개 로직을 위해 전체 데이터를 다 가져옴
      // 요청한 적이 있으면 status를 FOLLOW로 바꿈
      const check_follow: any = await this.profileRepository.get_follow(
        conn,
        user_id,
        follow_user_id
      );

      if (check_follow.length == 0) {
        //   팔로우 함
        await this.profileRepository.save_follow(conn, user_id, follow_user_id, follow_status);
      } else {
        // 팔로우 한적이 있으면 업데이트
        await this.profileRepository.update_follow(conn, user_id, follow_user_id, follow_status);
      }
      await conn.commit();
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      logger.error(
        `App - Save_follow ProfileService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Get_feed(username: any, last_board_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);

    try {
      const res_Get_feed: any = await this.profileRepository.get_feed(
        conn,
        username,
        last_board_id
      );
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
      const res_Get_feed_follow: any = await this.profileRepository.get_follow_feed(
        conn,
        user_id,
        last_board_id
      );
      return response(baseResponse.SUCCESS, res_Get_feed_follow);
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
}

export default ProfileService;
