// 필요한것들
// refresh , access 토큰 만들기
// refresh 토큰 검증
// access 토큰 검증
// 카카오껀지
import '../../config/env';
import AuthRepository from '../../auth/auth.dao';
import { Container, Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import pool from '../../config/db';
import { response } from '../../config/response';
import baseResponse from '../../config/baseResponse';
import logger from '../../config/winston';
const jwt = require('jsonwebtoken');

const create_access_token = (user_id: any) => {
  return new Promise(async (resolve, reject) => {
    resolve(
      jwt.sign(
        {
          user_id,
        },
        process.env.JWT_ACCESS_SECRET,
        {
          //ACCESS_TOKEN_SECRET 키를 이용하여 jwt를 만들어서 리턴을 해줌
          expiresIn: '180days', // 토큰 유효시간 10분임
        }
      )
    );
  });
};

// refresh token 은 페이로드가 없음
const create_refresh_token = () => {
  return new Promise(async (resolve, reject) => {
    resolve(
      jwt.sign({}, process.env.JWT_REFRESH_SECRET, {
        //ACCESS_TOKEN_SECRET 키를 이용하여 jwt를 만들어서 리턴을 해줌
        expiresIn: '180days', // 토큰 유효시간 10분임
      })
    );
  });
};

const check_access_token = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const access_token = req.headers.authorization?.split(' ')[1];
    const secret_key = process.env.JWT_ACCESS_SECRET;
    // check 가 true면 Access , false면 Refresh
    // const payload = jwt.decode(token, secret_key);
    const token = await jwt.verify(access_token, secret_key);
    // body에 GET_USER_ID 을 넣어서 보내줌
    req.body.user_id = token.user_id;
    next();
  } catch (err: any) {
    // 유효기간이 초과된 경우
    if (err.name === 'TokenExpiredError') {
      res.send(response(baseResponse.TOKEN_VERIFICATION_FAILURE)); // 419 추가예정
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    res.send(response(baseResponse.TOKEN_VERIFICATION_FAILURE)); // 419 추가예정
    logger.error(
      `App - Update_board BoardService error\n: ${err.message} \n${JSON.stringify(err)}`
    );
  }
};

const check_refresh_token = async (refresh_token: any) => {
  try {
    const secret_key = process.env.JWT_REFRESH_SECRET;
    const token = await jwt.verify(refresh_token, secret_key);
    return {
      token,
      success: true,
    };
  } catch (error: any) {
    // 유효기간이 초과된 경우
    if (error.name === 'TokenExpiredError') {
      return { success: false, msg: '토큰이 만료되었습니다.' }; // 419 추가예정
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    return { success: false, msg: '유효하지 않은 토큰입니다.' }; // 401 추가예정
  }
};

const save_refresh_token = async (id: string, refresh_token: any) => {
  const conn = await pool.getConnection(async (conn: any) => conn);

  try {
    const authRepository = Container.get(AuthRepository);
    const refresh_info = [refresh_token, id];
    const a = await authRepository.update_refresh_token(conn, refresh_info);
    conn.commit();
    return a;
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
};

export = {
  save_refresh_token,
  check_refresh_token,
  check_access_token,
  create_access_token,
  create_refresh_token,
};
