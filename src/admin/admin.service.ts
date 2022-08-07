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
      await this.adminRepository.update_user_data_user_id(conn, user_info);
      conn.commit();
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      conn.rollback();
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

  async Delete_user_admin(user_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      await this.adminRepository.delete_user_admin(conn, user_id);
      conn.commit();
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      logger.error(
        `App - Delete_user_admin AdminService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Delete_board_admin(board_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      await this.adminRepository.delete_feed_admin(conn, board_id);
      conn.commit();
      return response(baseResponse.SUCCESS);
    } catch (err: any) {
      logger.error(
        `App - Delete_board_admin AdminService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Get_feed_data(user_id: any, board_status: any, create_at: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      let alphasql = '';
      if (user_id) {
        alphasql += `WHERE b.user_id_fk = ${user_id}`;
      }
      if (board_status) {
        if (alphasql == '') {
          alphasql += `WHERE b.board_status = '${board_status}'`;
        } else {
          alphasql += `AND b.board_status = '${board_status}'`;
        }
      }
      if (create_at) {
        if (alphasql == '') {
          alphasql += `WHERE DATE_FORMAT(b.create_at, '%Y-%m-%d')  = STR_TO_DATE('${create_at}','%Y%m%d')`;
        } else {
          alphasql += `AND DATE_FORMAT(b.create_at, '%Y-%m-%d')  = STR_TO_DATE('${create_at}','%Y%m%d')`;
        }
      }
      alphasql += `
      ORDER BY b.create_at DESC;
      `;
      const get_feed_data = await this.adminRepository.get_feed_data(conn, alphasql);
      return response(baseResponse.SUCCESS, get_feed_data);
    } catch (err: any) {
      logger.error(
        `App - Get_feed_data AdminService error\n: ${err.message} \n${JSON.stringify(err)}`
      );
      return errResponse(baseResponse.DB_ERROR);
    } finally {
      conn.release();
    }
  }

  async Get_feed_all_board_id(board_id: any) {
    const conn = await pool.getConnection(async (conn: any) => conn);
    try {
      const get_reply_data = await this.adminRepository.get_feed_reply_data(conn, board_id);
      const get_feed_like_data = await this.adminRepository.get_feed_like_data(conn, board_id);
      const get_feed_img = await this.adminRepository.get_feed_img(conn, board_id);
      const get_reply_like = await this.adminRepository.get_reply_like_data(conn, board_id);
      const res_data = {
        feed_img: get_feed_img,
        feed_like: get_feed_like_data,
        reply: get_reply_data,
        repl_like: get_reply_like,
      };

      return response(baseResponse.SUCCESS, res_data);
    } catch (err: any) {
      logger.error(
        `App - Get_feed_reply_board_id AdminService error\n: ${err.message} \n${JSON.stringify(
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
