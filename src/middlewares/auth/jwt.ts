// 필요한것들
// refresh , access 토큰 만들기
// refresh 토큰 검증
// access 토큰 검증
// 카카오껀지
import '../../config/env';
import AuthRepository from '../../datamanager/auth/auth.dm';
import { Container, Service } from 'typedi';
const jwt = require('jsonwebtoken');

const create_access_token = (user: any) => {
  return new Promise(async (resolve, reject) => {
    resolve(
      jwt.sign(
        {
          user_name: user.user_name,
        },
        process.env.JWT_ACCESS_SECRET,
        {
          //ACCESS_TOKEN_SECRET 키를 이용하여 jwt를 만들어서 리턴을 해줌
          expiresIn: '10m', // 토큰 유효시간 10분임
        }
      )
    );
  });
};

// refresh token 은 페이로드가 없음
const create_refresh_token = () => {
  return new Promise(async (resolve, reject) => {
    resolve(
      jwt.sign(process.env.JWT_ACCESS_SECRET, {
        //ACCESS_TOKEN_SECRET 키를 이용하여 jwt를 만들어서 리턴을 해줌
        expiresIn: '180days', // 토큰 유효시간 10분임
      })
    );
  });
};

const check_access_token = (access_token: any) => {
  try {
    const secret_key = process.env.JWT_ACCESS_SECRET;
    // check 가 true면 Access , false면 Refresh
    // const payload = jwt.decode(token, secret_key);
    return {
      token: jwt.verify(access_token, secret_key),
      success: true,
    };
  } catch (error: any) {
    console.log(error.name);
    // 유효기간이 초과된 경우
    if (error.name === 'TokenExpiredError') {
      return { success: false, msg: '토큰이 만료되었습니다.' }; // 419 추가예정
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    return { success: false, msg: '유효하지 않은 토큰입니다.' }; // 401 추가예정
  }
};

const check_refresh_token = (refresh_token: any) => {
  try {
    const secret_key = process.env.JWT_REFRESH_SECRET;
    return {
      token: jwt.verify(refresh_token, secret_key),
      success: true,
    };
  } catch (error: any) {
    console.log(error.name);
    // 유효기간이 초과된 경우
    if (error.name === 'TokenExpiredError') {
      return { success: false, msg: '토큰이 만료되었습니다.' }; // 419 추가예정
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    return { success: false, msg: '유효하지 않은 토큰입니다.' }; // 401 추가예정
  }
};

const save_refresh_token = async (id: string, refresh_token: any) => {
  try {
    const authRepository = Container.get(AuthRepository);
    await authRepository.update_refresh_token(id, refresh_token);
  } catch (err) {
    console.log(err);
  }
};
