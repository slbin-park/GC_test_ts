import express, { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
// 서비스에 이걸 임포트 해야함

import pool from '../config/db';

import { response, errResponse } from '../config/response';
import logger from '../config/winston';
import baseResponse from '../config/baseResponse';

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
  constructor() {
    this.userRepository = Container.get(UserRepository);
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
      const access_token = await jwt.create_access_token(user_name);
      const refresh_token = await jwt.create_refresh_token();
      password = await bcrypt.hash(password, saltRounds);
      const SaveData = [
        user_name,
        phone_number,
        name,
        password,
        birthday,
        register,
        user_status,
        accept_date,
        refresh_token,
      ];
      await this.userRepository.save(conn, SaveData);
      // save 에 필요함
      await conn.commit();
      return response(baseResponse.SUCCESS, {
        user_name,
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

      const access_token = await jwt.create_access_token(user_name);
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
      await this.userRepository.save_kakao(conn, SaveUserKakaoData);
      await conn.commit();
      return response(baseResponse.SUCCESS, {
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
      logger.error(`App - Saveuser Service error\n: ${err.message} \n${JSON.stringify(err)}`);
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
      logger.error(`App - Saveuser Service error\n: ${err.message} \n${JSON.stringify(err)}`);
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }
}

export default UserService;
