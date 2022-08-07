"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAVE_REPORT_LOG = exports.GET_REPORT_LOG = exports.GET_REPLY_REPORT_DATA = exports.GET_BOARD_REPORT_DATA = exports.GET_BOARD_LOG = exports.GET_USER_LOG = exports.GET_REPLY_LOG = exports.GET_BOARD_DATA = exports.SAVE_BOARD_LOG = exports.GET_USER_DATA = exports.SAVE_USER_LOG = exports.SAVE_REPLY_LOG = exports.GET_REPLY_DATA = void 0;
const SAVE_USER_LOG = `
INSERT INTO
user_log(db_action, user_id, user_name, phone_number, name, password, birthday, register, user_status, accept_date, refresh_token, social_id, profileUrl, website, introduction)
VALUES (? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
exports.SAVE_USER_LOG = SAVE_USER_LOG;
const GET_USER_DATA = `
SELECT *
FROM user
WHERE user_id = ?
`;
exports.GET_USER_DATA = GET_USER_DATA;
const GET_USER_LOG = `
SELECT *
FROM user_log
ORDER BY update_at DESC;
`;
exports.GET_USER_LOG = GET_USER_LOG;
const SAVE_BOARD_LOG = `
INSERT INTO 
board_log(db_action, board_id, board_content, user_id_fk, board_status) 
VALUES (? , ? , ? , ? , ? )
`;
exports.SAVE_BOARD_LOG = SAVE_BOARD_LOG;
const GET_BOARD_DATA = `
SELECT *
FROM board
WHERE board_id = ? 
`;
exports.GET_BOARD_DATA = GET_BOARD_DATA;
const GET_BOARD_LOG = `
SELECT *
FROM board_log
ORDER BY update_at DESC;
`;
exports.GET_BOARD_LOG = GET_BOARD_LOG;
const GET_REPLY_DATA = `
SELECT *
FROM board_reply
WHERE reply_id = ?
`;
exports.GET_REPLY_DATA = GET_REPLY_DATA;
const SAVE_REPLY_LOG = `
INSERT INTO
reply_log(db_action, reply_id, board_id_fk, user_id_fk, reply_content, reply_status)
VALUES ( ? , ? , ? , ? , ? , ? )
`;
exports.SAVE_REPLY_LOG = SAVE_REPLY_LOG;
const GET_REPLY_LOG = `
SELECT *
FROM reply_log
ORDER BY update_at DESC;
`;
exports.GET_REPLY_LOG = GET_REPLY_LOG;
const SAVE_REPORT_LOG = `
INSERT INTO 
report_log(db_action, report_category, report_id, user_id_fk, report_idx, report_content, report_status)
VALUES( ? , ? , ? , ? , ? , ? , ?)
`;
exports.SAVE_REPORT_LOG = SAVE_REPORT_LOG;
const GET_BOARD_REPORT_DATA = `
SELECT *
FROM board_report
WHERE board_report_id = ?
`;
exports.GET_BOARD_REPORT_DATA = GET_BOARD_REPORT_DATA;
const GET_REPLY_REPORT_DATA = `
SELECT *
FROM reply_report
WHERE reply_report_id = ?
`;
exports.GET_REPLY_REPORT_DATA = GET_REPLY_REPORT_DATA;
const GET_REPORT_LOG = `
SELECT *
FROM report_log
ORDER BY update_at DESC;
`;
exports.GET_REPORT_LOG = GET_REPORT_LOG;
//# sourceMappingURL=log.sql.js.map