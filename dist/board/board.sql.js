"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_BOARD = exports.GET_BOARD_DATA = exports.GET_BOARD_IMG = exports.UPDATE_REPLY_STATUS = exports.GET_BOARD_REPLY = exports.UPDATE_BOARD_STATUS = exports.UPDATE_BOARD = exports.SAVE_BOARD_REPORT = exports.SAVE_REPLY_REPORT = exports.UPDATE_REPLY_LIKE = exports.SAVE_REPLY_LIKE = exports.GET_BY_ID_REPLY_LIKE = exports.GET_BY_ID_REPLY = exports.UPDATE_BOARD_LIKE = exports.GET_BY_ID_BOARD_LIKE = exports.SAVE_BOARD_LIKE = exports.SAVE_REPLY = exports.GET_BY_ID = exports.SAVE_IMAGE = exports.SAVE = void 0;
const SAVE = `
INSERT INTO 
board(  user_id_fk , board_status , board_content ) 
VALUES(  ? , ? , ? );
`;
exports.SAVE = SAVE;
const SAVE_IMAGE = `
INSERT INTO
board_image (board_id_fk , image_address,board_image_status)
VALUES( ? , ? ,'ACTIVE');`;
exports.SAVE_IMAGE = SAVE_IMAGE;
const GET_BY_ID = `
SELECT *
FROM board
WHERE board_id = ?
`;
exports.GET_BY_ID = GET_BY_ID;
const SAVE_REPLY = `
INSERT INTO 
board_reply( board_id_fk , user_id_fk , reply_content , reply_status ) 
VALUES( ? , ? , ? , 'VISIBLE' );
`;
exports.SAVE_REPLY = SAVE_REPLY;
const SAVE_BOARD_LIKE = `
INSERT INTO
board_like(board_id_fk, board_like_status, user_id_fk)
VALUES(? , ?, ? )
`;
exports.SAVE_BOARD_LIKE = SAVE_BOARD_LIKE;
const GET_BY_ID_BOARD_LIKE = `
SELECT *
FROM board_like
WHERE board_id_fk = ?
AND
user_id_fk = ?
`;
exports.GET_BY_ID_BOARD_LIKE = GET_BY_ID_BOARD_LIKE;
const UPDATE_BOARD_LIKE = `
UPDATE board_like 
SET board_like_status = ? 
WHERE board_like_id = ?;
`;
exports.UPDATE_BOARD_LIKE = UPDATE_BOARD_LIKE;
const GET_BY_ID_REPLY = `
SELECT *
FROM board_reply
WHERE reply_id = ?;
`;
exports.GET_BY_ID_REPLY = GET_BY_ID_REPLY;
const GET_BY_ID_REPLY_LIKE = `
SELECT *
FROM reply_like
WHERE reply_id_fk = ?
AND
user_id_fk = ? ;
`;
exports.GET_BY_ID_REPLY_LIKE = GET_BY_ID_REPLY_LIKE;
const SAVE_REPLY_LIKE = `
INSERT INTO
reply_like(reply_id_fk, reply_status , user_id_fk)
VALUES(? , ? , ? );
`;
exports.SAVE_REPLY_LIKE = SAVE_REPLY_LIKE;
const UPDATE_REPLY_LIKE = `
UPDATE reply_like
SET reply_status = ?
WHERE reply_like_id = ?
`;
exports.UPDATE_REPLY_LIKE = UPDATE_REPLY_LIKE;
const SAVE_REPLY_REPORT = `
INSERT INTO
reply_report (reply_id_Fk , report_content , user_id_fk , reply_report_status)
VALUES( ? , ? , ? , ?);
`;
exports.SAVE_REPLY_REPORT = SAVE_REPLY_REPORT;
const SAVE_BOARD_REPORT = `
INSERT INTO
board_report (board_id, report_content, user_id_fk, board_report_status)
VALUES( ? , ? , ? , ?);
`;
exports.SAVE_BOARD_REPORT = SAVE_BOARD_REPORT;
const UPDATE_BOARD = `
UPDATE board 
SET board_content = ?
WHERE board_id = ?
`;
exports.UPDATE_BOARD = UPDATE_BOARD;
const UPDATE_BOARD_STATUS = `
UPDATE board
SET board_status = ?
WHERE board_id = ?
`;
exports.UPDATE_BOARD_STATUS = UPDATE_BOARD_STATUS;
const UPDATE_REPLY_STATUS = `
UPDATE board_reply
SET reply_status = ?
WHERE reply_id = ?
`;
exports.UPDATE_REPLY_STATUS = UPDATE_REPLY_STATUS;
const GET_BOARD_REPLY = `
SELECT br.reply_id , br.user_id_fk , br.reply_content , u.user_name, u.profileUrl,
       case
               when timestampdiff(second, br.update_at, current_timestamp) < 60
                   then concat(timestampdiff(second, br.update_at, current_timestamp), '초 전')
               when timestampdiff(minute , br.update_at, current_timestamp) < 60
                   then concat(timestampdiff(minute, br.update_at, current_timestamp), '분 전')
               when timestampdiff(hour , br.update_at, current_timestamp) < 24
                   then concat(timestampdiff(hour, br.update_at, current_timestamp), '시간 전')
               when timestampdiff(day , br.update_at, current_timestamp) < 365
                   then concat(timestampdiff(day, br.update_at, current_timestamp), '일 전')
               else concat(MONTH(br.update_at) ,'월',DAY(br.update_at), '일')
           end as uploadTime
FROM board_reply br
INNER JOIN
user u
ON br.user_id_fk = u.user_id
WHERE board_id_fk = ?
AND
reply_status = 'VISIBLE';
`;
exports.GET_BOARD_REPLY = GET_BOARD_REPLY;
const GET_BOARD_DATA = `
SELECT *
FROM board
WHERE board_id = ?
`;
exports.GET_BOARD_DATA = GET_BOARD_DATA;
const GET_BOARD_IMG = `
SELECT bi.image_id,bi.image_address
FROM board b
LEFT JOIN board_image bi
ON b.board_id = bi.board_id_fk
WHERE b.board_id = ?
`;
exports.GET_BOARD_IMG = GET_BOARD_IMG;
const DELETE_BOARD = `
UPDATE board b
LEFT JOIN board_reply br
ON b.board_id = br.board_id_fk
LEFT JOIN reply_like rl
ON br.reply_id = rl.reply_id_fk
LEFT JOIN board_image bi
ON b.board_id = bi.board_id_fk
LEFT JOIN board_like bl
ON b.board_id = bl.board_id_fk
SET b.board_status = 'DELETE',
    bi.board_image_status = 'DELETE',
    bl.board_like_status = 'DELETE',
    br.reply_status = 'DELETE',
    rl.reply_status = 'DELETE'
WHERE b.board_id = ?;
`;
exports.DELETE_BOARD = DELETE_BOARD;
//# sourceMappingURL=board.sql.js.map