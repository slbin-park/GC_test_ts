import baseResponse from '../../config/baseResponse';
import pool from '../../config/db';
import { response } from '../../config/response';
import * as sql from './log.sql';

export const save_user_log = async (user_id: any, db_action: any) => {
  const conn = await pool.getConnection(async (conn: any) => conn);
  try {
    const [get_user_data] = await conn.query(sql.GET_USER_DATA, user_id);
    const {
      user_name,
      phone_number,
      name,
      password,
      birthday,
      register,
      user_status,
      accept_date,
      refresh_token,
      social_id,
      profileUrl,
      website,
      introduction,
    } = get_user_data[0];
    const save_log = [
      db_action,
      user_id,
      user_name,
      phone_number,
      name,
      password,
      birthday,
      register,
      user_status,
      accept_date,
      refresh_token,
      social_id,
      profileUrl,
      website,
      introduction,
    ];
    const result = await conn.query(sql.SAVE_USER_LOG, save_log);
    await conn.commit();
  } catch (err: any) {
    await conn.rollback();
    console.log(err);
    return '실패';
  } finally {
    conn.release();
  }
};

export const save_board_log = async (board_id: any, db_action: any) => {
  const conn = await pool.getConnection(async (conn: any) => conn);
  try {
    const [get_board_data] = await conn.query(sql.GET_BOARD_DATA, board_id);
    const { board_content, user_id_fk, board_status } = get_board_data[0];
    const save_log = [db_action, board_id, board_content, user_id_fk, board_status];
    const result = await conn.query(sql.SAVE_BOARD_LOG, save_log);
    await conn.commit();
  } catch (err: any) {
    await conn.rollback();
    console.log(err);
    return '실패';
  } finally {
    conn.release();
  }
};

export const save_reply_log = async (reply_id: any, db_action: any) => {
  const conn = await pool.getConnection(async (conn: any) => conn);
  try {
    const [get_reply_data] = await conn.query(sql.GET_REPLY_DATA, reply_id);
    const { board_id_fk, user_id_fk, reply_content, reply_status } = get_reply_data[0];
    const save_log = [db_action, reply_id, board_id_fk, user_id_fk, reply_content, reply_status];
    const result = await conn.query(sql.SAVE_REPLY_LOG, save_log);
    await conn.commit();
  } catch (err: any) {
    await conn.rollback();
    console.log(err);
    return '실패';
  } finally {
    conn.release();
  }
};

export const get_reply_log = async () => {
  const conn = await pool.getConnection(async (conn: any) => conn);
  try {
    const [res] = await conn.query(sql.GET_REPLY_LOG);
    await conn.commit();
    return response(baseResponse.SUCCESS, res);
  } catch (err: any) {
    await conn.rollback();
    console.log(err);
    return '실패';
  } finally {
    conn.release();
  }
};

export const get_board_log = async () => {
  const conn = await pool.getConnection(async (conn: any) => conn);
  try {
    const [res] = await conn.query(sql.GET_BOARD_LOG);
    await conn.commit();
    return response(baseResponse.SUCCESS, res);
  } catch (err: any) {
    await conn.rollback();
    console.log(err);
    return '실패';
  } finally {
    conn.release();
  }
};

export const get_user_log = async () => {
  const conn = await pool.getConnection(async (conn: any) => conn);
  try {
    const [res] = await conn.query(sql.GET_USER_LOG);
    await conn.commit();
    return response(baseResponse.SUCCESS, res);
  } catch (err: any) {
    await conn.rollback();
    console.log(err);
    return '실패';
  } finally {
    conn.release();
  }
};

export const save_report_log = async (report_id: any, report_category: any, db_action: any) => {
  const conn = await pool.getConnection(async (conn: any) => conn);
  try {
    if (report_category == 'BOARD') {
      const [board_data] = await conn.query(sql.GET_BOARD_REPORT_DATA, report_id);
      const { board_report_id, board_id, report_content, user_id_fk, board_report_status } =
        board_data[0];
      const rept_id = board_report_id;
      const report_idx = board_id;
      const report_status = board_report_status;
      await conn.query(sql.SAVE_REPORT_LOG, [
        db_action,
        report_category,
        rept_id,
        user_id_fk,
        report_idx,
        report_content,
        report_status,
      ]);
    } else {
      const [reply_data] = await conn.query(sql.GET_REPLY_REPORT_DATA, report_id);

      const { reply_report_id, user_id_fk, reply_id_fk, report_content, reply_report_status } =
        reply_data[0];
      const rept_id = reply_report_id;
      const report_idx = reply_id_fk;
      const report_status = reply_report_status;
      await conn.query(sql.SAVE_REPORT_LOG, [
        db_action,
        report_category,
        rept_id,
        user_id_fk,
        report_idx,
        report_content,
        report_status,
      ]);
    }
    await conn.commit();
  } catch (err: any) {
    await conn.rollback();
    console.log(err);
    return '실패';
  } finally {
    conn.release();
  }
};
export const get_report_log = async () => {
  const conn = await pool.getConnection(async (conn: any) => conn);
  try {
    const [res] = await conn.query(sql.GET_REPORT_LOG);
    await conn.commit();
    return response(baseResponse.SUCCESS, res);
  } catch (err: any) {
    await conn.rollback();
    console.log(err);
    return '실패';
  } finally {
    conn.release();
  }
};
