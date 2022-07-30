import express, { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
// 서비스에 이걸 임포트 해야함

import UserRepository from '../datamanager/user/user.dm';
import ProfileRepository from '../datamanager/profile/profile.dm';
import jwt from '../middlewares/auth/jwt';
const bcrypt = require('bcrypt');
const saltRounds = 10;

// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할

// 데이터를 검증한 후 제대로 받았을경우
// 비밀번호 암호화 기능
// 토큰 발급 기능 다 넣기

@Service()
class ProfileService {
  // 여기서는 Model 을 주입시켜주자
  private readonly userRepository: UserRepository;
  private readonly profileRepository: ProfileRepository;

  constructor() {
    this.userRepository = Container.get(UserRepository);
    this.profileRepository = Container.get(ProfileRepository);
  }

  async Save(user: any) {
    try {
      let access_token;
      let refresh_token;
      let response;
      access_token = await jwt.create_access_token(user.user_name);
      refresh_token = await jwt.create_refresh_token();
      user.refresh_token = refresh_token;
      user.password = await bcrypt.hash(user.password, saltRounds);
      response = await this.userRepository.save(user);
      await jwt.save_refresh_token(user.user_name, refresh_token);

      console.log('서비스 실행');
      return { user_name: user.user_name, access_token, refresh_token, success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async Follow(user_name: any, follow_user_name: any) {
    try {
      let response;
      let follow_status = 'FOLLOW';
      // 대상유저가 존재하는 아이디 인지 체크
      const check_id: any = await this.profileRepository.checkbyid(follow_user_name);
      if (check_id.count == 0) {
        return { msg: '존재하지 않는 유저' };
      }
      // 팔로우 요청을 한적이 있는지 체크
      // 비공개 로직을 위해 전체 데이터를 다 가져옴
      // 요청한 적이 있으면 status를 FOLLOW로 바꿈
      const check_follow: any = await this.profileRepository.check_follow(
        user_name,
        follow_user_name
      );

      if (check_follow.length == 0) {
        //   팔로우 함
        const follow: any = await this.profileRepository.follow(
          user_name,
          follow_user_name,
          follow_status
        );
      } else {
        console.log(check_follow[0].follow_status);
        // 팔로우 한적이 있으면 업데이트
        const update_follow: any = await this.profileRepository.update_follow(
          user_name,
          follow_user_name,
          follow_status
        );
        return { msg: '팔로우 변경함 ' };
      }
      return { success: true, msg: '팔로우 신청 성공' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default ProfileService;
