import express, { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
// 서비스에 이걸 임포트 해야함

import pool from '../config/db';

import { response, errResponse } from '../config/response';
import logger from '../config/winston';
import baseResponse from '../config/baseResponse';

import AdminRepository from './admin.dao';
const bcrypt = require('bcrypt');
const saltRounds = 10;

// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할

// 데이터를 검증한 후 제대로 받았을경우
// 비밀번호 암호화 기능
// 토큰 발급 기능 다 넣기

@Service()
class AdminService {
  // 여기서는 Model 을 주입시켜주자
  private readonly adminRepository: AdminRepository;

  constructor() {
    this.adminRepository = Container.get(AdminRepository);
  }

  async Get_user_data(user_id: any, user_name: any, user_status: any, create_at: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      let alphasql = '';
      if (user_id) {
        alphasql += `WHERE user_id = ${user_id}`;
      }
      if (user_name) {
        if (alphasql == '') {
          alphasql += `WHERE user_name = '${user_name}'`;
        } else {
          alphasql += `AND user_name = '${user_name}'`;
        }
      }
      if (user_status) {
        if (alphasql == '') {
          alphasql += `WHERE user_status = '${user_status}'`;
        } else {
          alphasql += `AND user_status = '${user_status}'`;
        }
      }
      if (create_at) {
        if (alphasql == '') {
          alphasql += `WHERE DATE_FORMAT(create_at, '%Y-%m-%d')  = STR_TO_DATE('${create_at}','%Y%m%d')`;
        } else {
          alphasql += `AND DATE_FORMAT(create_at, '%Y-%m-%d')  = STR_TO_DATE('${create_at}','%Y%m%d')`;
        }
      }
      alphasql += `
      ORDER BY create_at DESC;
      `;
      console.log(alphasql);
      const get_user_data = await this.adminRepository.get_user_data(conn, alphasql);
      return response(baseResponse.SUCCESS, get_user_data);
    } catch (err: any) {
      logger.error(
        `App - Get_user_data AdminService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Get_user_data_user_id(user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const get_user_data = await this.adminRepository.get_user_data_user_id(conn, user_id);
      return response(baseResponse.SUCCESS, get_user_data);
    } catch (err: any) {
      logger.error(
        `App - Get_user_data_user_id AdminService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Update_user_data_user_id(user_info: any, user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const get_user_data = await this.adminRepository.update_user_data_user_id(conn, user_info);
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      logger.error(
        `App - Update_user_data_user_id AdminService error\n: ${err.message} \n${JSON.stringify(
          err
        )}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }
}

export default AdminService;
