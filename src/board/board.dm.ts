import db from '../config/db';
import {
  SAVE,
  SAVE_IMAGE,
  GET_BY_ID,
  SAVE_REPLY,
  SAVE_BOARD_LIKE,
  GET_BY_ID_BOARD_LIKE,
  UPDATE_BOARD_LIKE,
  GET_BY_ID_REPLY,
  GET_BY_ID_REPLY_LIKE,
  SAVE_REPLY_LIKE,
  UPDATE_REPLY_LIKE,
} from './board.sql';
import { Container, Service } from 'typedi';
import 'reflect-metadata';

@Service()
class BoardRepository {
  // 게시글 저장 ( 이미지는 따로 저장 )
  async save(conn: any, boardInfo: any) {
    const save_board = await conn.query(SAVE, [
      boardInfo.user_name,
      boardInfo.board_status,
      boardInfo.board_content,
    ]);
    return save_board;
  }

  // 피드 등록시 이미지 등록
  async save_image(conn: any, board_id: any, image_address: any) {
    const save_image = await conn.query(SAVE_IMAGE, [board_id, image_address]);
    return save_image;
  }

  // id로 게시글 조회
  async get_by_id(conn: any, board_id: any) {
    const board_data = await conn.query(GET_BY_ID, board_id);
    return board_data;
  }

  // 댓글 저장
  async save_reply(conn: any, board_id: any, user_name_fk: any, reply_content: any) {
    const save_reply = await conn.query(SAVE_REPLY, [board_id, user_name_fk, reply_content]);
    return save_reply;
  }

  // 게시글 좋아요 저장
  async save_board_like(conn: any, board_id: any, board_like_status: any, user_name: any) {
    const save_board_like = await conn.query(SAVE_BOARD_LIKE, [
      board_id,
      board_like_status,
      user_name,
    ]);
    return save_board_like;
  }

  // 게시글 좋아요 취소
  async update_board_like(conn: any, board_like_id: any, board_like_status: any) {
    const update_board_like = await conn.query(UPDATE_BOARD_LIKE, [
      board_like_status,
      board_like_id,
    ]);
    return update_board_like;
  }

  // 게시글 좋아요 눌렀는지 체크
  async get_by_id_board_like(conn: any, board_id: any, user_name: any) {
    const get_board_like = await conn.query(GET_BY_ID_BOARD_LIKE, [board_id, user_name]);
    return get_board_like;
  }

  // 댓글이 존재하는지 체크
  async get_by_id_reply(conn: any, reply_id: any) {
    const get_reply = await conn.query(GET_BY_ID_REPLY, reply_id);
    return get_reply;
  }

  // 댓글을 좋아요를 눌렀는지 체크
  async get_by_id_reply_like(conn: any, reply_id: any, user_name: any) {
    const get_reply_like = await conn.query(GET_BY_ID_REPLY_LIKE, [reply_id, user_name]);
    return get_reply_like;
  }

  // 댓글을 좋아요를 저장
  async save_reply_like(conn: any, reply_id: any, reply_status: any, user_name: any) {
    const save_reply_like = await conn.query(SAVE_REPLY_LIKE, [reply_id, reply_status, user_name]);
    return save_reply_like;
  }

  // 댓글을 좋아요를 수정
  async update_reply_like(conn: any, reply_status: any, reply_like_id: any) {
    const update_reply_like = await conn.query(UPDATE_REPLY_LIKE, [reply_status, reply_like_id]);
    return update_reply_like;
  }
}

export default BoardRepository;
