import db from '../config/db';
import * as sql from './chat.sql';
import { Service } from 'typedi';
import 'reflect-metadata';

@Service()
class ChatRepository {
  async save_chat(conn: any, user_id: any, message: any) {
    const [save_chat] = await conn.query(sql.SAVE_CHAT, [user_id, message]);
    return save_chat;
  }
  async get_chat(conn: any, user_id: any) {
    const [get_chat] = await conn.query(sql.GET_CHAT, user_id);
    return get_chat;
  }
}

export default ChatRepository;
