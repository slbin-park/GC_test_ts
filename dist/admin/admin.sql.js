"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_BOARD_ADMIN = exports.DELETE_USER = exports.GET_REPLY_LIKE = exports.GET_BOARD_IMG = exports.GET_BOARD_LIKE = exports.GET_BOARD_REPLY = exports.GET_BOARD_DATA = exports.UPDATE_USER_ID = exports.GET_USER_ID = exports.GET_USER_DATA = exports.SAVE_USER_DATA = void 0;
// 유저 관련 처리
const SAVE_USER_DATA = `
INSERT INTO 
user(user_name , phone_number , name , password , birthday , register , user_status  , accept_date  ,
refresh_token , social_id , profileUrl , website , introduction , update_at  , create_at )
VALUES(? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? );
`;
exports.SAVE_USER_DATA = SAVE_USER_DATA;
const GET_USER_DATA = `
SELECT *
FROM user
`;
exports.GET_USER_DATA = GET_USER_DATA;
const GET_USER_ID = `
SELECT *
FROM user
WHERE user_id = ?;
`;
exports.GET_USER_ID = GET_USER_ID;
const UPDATE_USER_ID = `
UPDATE user
SET user_name = ? , phone_number = ? , name = ? ,password = ? , birthday = STR_TO_DATE(?,'%Y-%m-%dT%H:%i:%s.000Z') , register = ? , user_status = ? , accept_date = STR_TO_DATE(?,'%Y-%m-%dT%H:%i:%s.000Z') ,
refresh_token = ? , social_id = ? , profileUrl = ? , website = ? , introduction = ? , update_at = STR_TO_DATE(?,'%Y-%m-%dT%H:%i:%s.000Z') , create_at = STR_TO_DATE(?,'%Y-%m-%dT%H:%i:%s.000Z')
WHERE user_id = ?
`;
exports.UPDATE_USER_ID = UPDATE_USER_ID;
const DELETE_USER = `
UPDATE user u
LEFT JOIN board b
ON u.user_id = b.user_id_fk
LEFT JOIN board_reply br
ON b.board_id = br.board_id_fk
LEFT JOIN reply_like rl
ON br.reply_id = rl.reply_id_fk
LEFT JOIN board_image bi
ON b.board_id = bi.board_id_fk
LEFT JOIN board_like bl
ON b.board_id = bl.board_id_fk
SET b.board_status = 'ADMINDELET',
    bi.board_image_status = 'ADMINDELET',
    bl.board_like_status = 'ADMINDELET',
    br.reply_status = 'ADMINDELET',
    rl.reply_status = 'ADMINDELET',
    u.user_status = 'ADMINDELET'
WHERE u.user_id = ?;
`;
exports.DELETE_USER = DELETE_USER;
// 피드 관련 처리
const GET_BOARD_DATA = `
SELECT u.user_name , b.*
FROM board b
INNER JOIN
user u
ON b.user_id_fk = u.user_id
`;
exports.GET_BOARD_DATA = GET_BOARD_DATA;
const GET_BOARD_REPLY = `
SELECT u.user_name , br.*
FROM board_reply br
INNER JOIN
user u
ON br.user_id_fk = u.user_id
WHERE br.board_id_fk = ?
ORDER BY br.create_at DESC;
`;
exports.GET_BOARD_REPLY = GET_BOARD_REPLY;
const GET_BOARD_LIKE = `
SELECT u.user_name , bl.*
FROM board_like bl
INNER JOIN
user u
ON bl.user_id_fk = u.user_id
WHERE bl.board_id_fk = ? 
ORDER BY bl.create_at DESC; 
`;
exports.GET_BOARD_LIKE = GET_BOARD_LIKE;
const GET_BOARD_IMG = `
SELECT *
FROM board_image 
WHERE board_id_fk = ? ;
`;
exports.GET_BOARD_IMG = GET_BOARD_IMG;
const GET_REPLY_LIKE = `
SELECT u.user_name , rl.*
FROM reply_like rl
INNER JOIN board_reply br
ON rl.reply_id_fk = br.reply_id
INNER JOIN
user u
ON rl.user_id_fk = u.user_id
WHERE br.board_id_fk = ?
ORDER BY rl.create_at DESC;
`;
exports.GET_REPLY_LIKE = GET_REPLY_LIKE;
const DELETE_BOARD_ADMIN = `
UPDATE board b
LEFT JOIN board_reply br
ON b.board_id = br.board_id_fk
LEFT JOIN reply_like rl
ON br.reply_id = rl.reply_id_fk
LEFT JOIN board_image bi
ON b.board_id = bi.board_id_fk
LEFT JOIN board_like bl
ON b.board_id = bl.board_id_fk
SET b.board_status = 'ADMINDELETE',
    bi.board_image_status = 'ADMINDELETE',
    bl.board_like_status = 'ADMINDELETE',
    br.reply_status = 'ADMINDELETE',
    rl.reply_status = 'ADMINDELETE'
WHERE b.board_id = ?;
`;
exports.DELETE_BOARD_ADMIN = DELETE_BOARD_ADMIN;
//# sourceMappingURL=admin.sql.js.map