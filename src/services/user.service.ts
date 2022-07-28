import express, { Request, Response } from 'express';
import { Container, Service } from 'typedi';
import 'reflect-metadata';
// 서비스에 이걸 임포트 해야함
import User from '../controllers/user/user.dto';
import UserRepository from '../datamanager/user/user.dm';

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
      console.log('서비스 실행');
      user.refresh_token = '';
      user.password = await bcrypt.hash(user.password, saltRounds);
      console.log('password = ', user.password);
      const response = await this.userRepository.save(user);
      return { response, success: true };
    } catch (err) {
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
