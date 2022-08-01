import express, { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
// 서비스에 이걸 임포트 해야함

import UserRepository from '..//user/user.dm';
import ProfileRepository from './profile.dm';

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

  async profile(username: any) {
    try {
      const check_id: any = await this.profileRepository.checkbyid(username);
      if (check_id.count == 0) {
        return { msg: '존재하지 않는 유저' };
      }
      const count_following: any = await this.profileRepository.get_following_count(username);
      const count_follower: any = await this.profileRepository.get_follower_count(username);
      const count_board: any = await this.profileRepository.get_board_count(username);
      const name: any = await this.profileRepository.get_name(username);
      return {
        following: count_following.count,
        follower: count_follower.count,
        board: count_board.count,
        name: name.name,
        username,
        success: '성공',
      };
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

  async feed(username: any, last_board_id: any) {
    try {
      const response: any = await this.profileRepository.get_feed(username, last_board_id);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async follow_feed(username: any, last_board_id: any) {
    try {
      const response: any = await this.profileRepository.get_follow_feed(username, last_board_id);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default ProfileService;
