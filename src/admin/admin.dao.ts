import db from '../config/db';
import * as sql from './admin.sql';
import { Container, Service } from 'typedi';
import 'reflect-metadata';

@Service()
class AdminRepository {
  async get_user_data(conn: any, alphasql: any) {
    const finalsql: any = sql.GET_USER_DATA + alphasql;
    const [user] = await conn.query(finalsql);
    return user;
  }
  async get_user_data_user_id(conn: any, user_id: any) {
    const [user] = await conn.query(sql.GET_USER_ID, user_id);
    return user;
  }
  async update_user_data_user_id(conn: any, user_data: any) {
    const [user] = await conn.query(sql.UPDATE_USER_ID, user_data);
    return user;
  }
}

export default AdminRepository;
