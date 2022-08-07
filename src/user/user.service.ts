import express, { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
// 서비스에 이걸 임포트 해야함

import pool from '../config/db';

import { response, errResponse } from '../config/response';
import logger from '../config/winston';
import baseResponse from '../config/baseResponse';
import * as Log from '../middlewares/adminlog/log.dao';
import AuthRepository from '../auth/auth.dao';
import UserRepository from './user.dao';
import jwt from '../middlewares/auth/jwt';
const bcrypt = require('bcrypt');
const saltRounds = 10;

// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할

// 데이터를 검증한 후 제대로 받았을경우
// 비밀번호 암호화 기능
// 토큰 발급 기능 다 넣기

@Service()
class UserService {
  // 여기서는 Model 을 주입시켜주자
  private readonly userRepository: UserRepository;
  private readonly authRepository: AuthRepository;

  constructor() {
    this.userRepository = Container.get(UserRepository);
    this.authRepository = Container.get(AuthRepository);
  }

  async Save(
    user_name: any,
    phone_number: any,
    name: any,
    password: any,
    birthday: any,
    register: any,
    user_status: any,
    accept_date: any
  ) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      await conn.beginTransaction();
      const check_user_name = await this.authRepository.get_by_user_name(conn, user_name);
      if (check_user_name.length) {
        return response(baseResponse.SIGNUP_REDUNDANT_USER_NAME);
      }
      const refresh_token = await jwt.create_refresh_token();
      password = await bcrypt.hash(password, saltRounds);
      const SaveData = [
        user_name,
        phone_number,
        name,
        password,
        birthday,
        register,
        accept_date,
        refresh_token,
      ];
      const user_id = await this.userRepository.save(conn, SaveData);
      const access_token = await jwt.create_access_token(user_id.insertId);
      // save 에 필요함
      await conn.commit();
      await Log.save_user_log(user_id.insertId, 'CREATE');
      return response(baseResponse.SUCCESS, {
        user_id: user_id.insertId,
        access_token,
        refresh_token,
      });
    } catch (err: any) {
      await conn.rollback();
      logger.error(`App - SaveUser UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Save_Kakao(
    user_name: any,
    phone_number: any,
    name: any,
    password: any,
    birthday: any,
    register: any,
    user_status: any,
    accept_date: any,
    social_id: any
  ) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      await conn.beginTransaction();

      const refresh_token = await jwt.create_refresh_token();
      const SaveUserKakaoData = [
        user_name,
        phone_number,
        name,
        password,
        birthday,
        register,
        user_status,
        accept_date,
        social_id,
        refresh_token,
      ];
      const user_id = await this.userRepository.save_kakao(conn, SaveUserKakaoData);
      const access_token = await jwt.create_access_token(user_id.insertId);
      await conn.commit();
      await Log.save_user_log(user_id.insertId, 'CREATE');
      return response(baseResponse.SUCCESS, {
        user_id: user_id.insertId,
        user_name,
        access_token,
        refresh_token,
      });
    } catch (err: any) {
      await conn.rollback();
      logger.error(`App - Save_Kakao UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Find() {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const Find_response = await this.userRepository.find(conn);
      return response(baseResponse.SUCCESS, Find_response);
    } catch (err: any) {
      logger.error(`App - Find UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Find_Id(id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const Find_Id_response = await this.userRepository.findById(conn, id);
      return response(baseResponse.SUCCESS, Find_Id_response);
    } catch (err: any) {
      logger.error(`App - Find_Id UserService error\n: ${err.message} \n${JSON.stringify(err)}`);
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Find_user_name(user_name: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const Find_Id_response = await this.authRepository.get_by_user_name(conn, user_name);
      if (Find_Id_response.length) {
        return response(baseResponse.SIGNUP_REDUNDANT_USER_NAME);
      }
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      logger.error(`App - Find_user_name Service error\n: ${err.message} \n${JSON.stringify(err)}`);
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Update_user_name(user_name: any, user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const update_user_name_data = [user_name, user_id];
      const Find_Id_response = await this.authRepository.get_by_user_name(conn, user_name);
      if (Find_Id_response.length) {
        return response(baseResponse.SIGNUP_REDUNDANT_USER_NAME);
      }
      const count_change_user_name: any = await this.userRepository.get_change_user_name_count(
        conn,
        user_id
      );
      if (count_change_user_name.length >= 2) {
        return response(baseResponse.CHANGE_USER_NAME_OVER);
      }
      await this.userRepository.update_user_name(conn, update_user_name_data);
      await this.userRepository.save_user_name_change(conn, user_id);

      await conn.commit();
      await Log.save_user_log(user_id, 'UPDATE');
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      conn.rollback();
      logger.error(`App - Find_user_name Service error\n: ${err.message} \n${JSON.stringify(err)}`);
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Update_user_status(user_id: any, user_status: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const update_user_status_info = [user_status, user_id];
      const res_update_user_status: any = await this.userRepository.update_user_status(
        conn,
        update_user_status_info
      );
      if (user_status == 'DELETE') {
        await this.userRepository.delete_board(conn, user_id);
        await this.userRepository.delete_follow(conn, user_id);
      }

      await conn.commit();
      await Log.save_user_log(user_id, user_status);
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      conn.rollback();
      logger.error(
        `App - Update_user_status Service error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Update_user_psword(phone: any, password: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const check_user_phone = await this.userRepository.get_user_psword(conn, phone);
      if (!check_user_phone.length) {
        return response(baseResponse.USER_NOTHING);
      }
      password = await bcrypt.hash(password, saltRounds);
      const update_user_info = [password, phone];
      const update_user_psword = await this.userRepository.update_user_password(
        conn,
        update_user_info
      );
      await conn.commit();
      await Log.save_user_log(check_user_phone[0].user_id, 'UPDATE');
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      conn.rollback();
      logger.error(
        `App - Update_user_status Service error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }
}

export default UserService;
