import db from '../config/db';
import * as sql from './board.sql';
import { Container, Service } from 'typedi';
import 'reflect-metadata';

@Service()
class BoardRepository {
  // 게시글 저장 ( 이미지는 따로 저장 )
  async save(conn: any, boardInfo: any) {
    const [save_board] = await conn.query(sql.SAVE, boardInfo);
    return save_board;
  }

  // 피드 등록시 이미지 등록
  async save_image(conn: any, board_id: any, image_address: any) {
    const [save_image] = await conn.query(sql.SAVE_IMAGE, [board_id, image_address]);
    return save_image;
  }

  // id로 게시글 조회
  async get_by_id(conn: any, board_id: any) {
    const [board_data] = await conn.query(sql.GET_BY_ID, board_id);
    return board_data;
  }

  // 댓글 저장
  async save_reply(conn: any, reply_info: any) {
    const [save_reply] = await conn.query(sql.SAVE_REPLY, reply_info);
    return save_reply;
  }

  // 게시글 좋아요 저장
  async save_board_like(conn: any, save_board_like_info: any) {
    const [save_board_like] = await conn.query(sql.SAVE_BOARD_LIKE, save_board_like_info);
    return save_board_like;
  }

  // 게시글 좋아요 취소
  async update_board_like(conn: any, board_like_const: any) {
    const [update_board_like] = await conn.query(sql.UPDATE_BOARD_LIKE, board_like_const);
    return update_board_like;
  }

  // 게시글 좋아요 눌렀는지 체크
  async get_by_id_board_like(conn: any, board_like_info: any) {
    const [get_board_like] = await conn.query(sql.GET_BY_ID_BOARD_LIKE, board_like_info);
    return get_board_like;
  }

  // 댓글이 존재하는지 체크
  async get_by_id_reply(conn: any, reply_id: any) {
    const [get_reply] = await conn.query(sql.GET_BY_ID_REPLY, reply_id);
    return get_reply;
  }

  // 댓글을 좋아요를 눌렀는지 체크
  async get_by_id_reply_like(conn: any, get_reply_like_info: any) {
    const [get_reply_like] = await conn.query(sql.GET_BY_ID_REPLY_LIKE, get_reply_like_info);
    return get_reply_like;
  }

  // 댓글을 좋아요를 저장
  async save_reply_like(conn: any, reply_like_info: any) {
    const [save_reply_like] = await conn.query(sql.SAVE_REPLY_LIKE, reply_like_info);
    return save_reply_like;
  }

  // 댓글을 좋아요를 수정
  async update_reply_like(conn: any, update_reply_like_info: any) {
    const [update_reply_like] = await conn.query(sql.UPDATE_REPLY_LIKE, update_reply_like_info);
    return update_reply_like;
  }

  async save_reply_report(conn: any, save_reply_report_info: any) {
    const [save_reply_report] = await conn.query(sql.SAVE_REPLY_REPORT, save_reply_report_info);
    return save_reply_report;
  }

  async save_board_report(conn: any, save_board_report_info: any) {
    const [save_board_report] = await conn.query(sql.SAVE_BOARD_REPORT, save_board_report_info);
    return save_board_report;
  }

  async update_board(conn: any, board_info: any) {
    const [update_board] = await conn.query(sql.UPDATE_BOARD, board_info);
    return update_board;
  }
  async update_board_status(conn: any, board_info: any) {
    const [update_board] = await conn.query(sql.UPDATE_BOARD_STATUS, board_info);
    return update_board;
  }

  async get_board_reply(conn: any, board_info: any) {
    const [get_board_reply] = await conn.query(sql.GET_BOARD_REPLY, board_info);
    return get_board_reply;
  }

  async update_reply_status(conn: any, reply_info: any) {
    const [get_board_reply] = await conn.query(sql.UPDATE_REPLY_STATUS, reply_info);
    return get_board_reply;
  }
}

export default BoardRepository;
