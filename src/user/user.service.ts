import express, { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
// 서비스에 이걸 임포트 해야함

import UserRepository from './user.dm';
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

  async Save_Kakao(user: any) {
    try {
      let access_token;
      let refresh_token;
      access_token = await jwt.create_access_token(user.user_name);
      refresh_token = await jwt.create_refresh_token();
      user.refresh_token = refresh_token;
      const response = await this.userRepository.save_kakao(user);
      return { user_name: user.user_name, access_token, refresh_token, success: true };
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }

  async Find() {
    try {
      const response = await this.userRepository.find();
      return { response, success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async Find_Id(id: any) {
    try {
      const response = await this.userRepository.findById(id);
      return { response, success: true };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default UserService;
