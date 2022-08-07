"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_FOLLOW = exports.DELETE_BOARD = exports.UPDATE_USER_PSWORD = exports.GET_USER_PHONE = exports.UPDATE_USER_STATUS = exports.SAVE_USER_NAME_CHANGE = exports.UPDATE_USER_NAME = exports.GET_CHANGE_USER_NAME_COUNT = exports.SAVE_USER_KAKAO = exports.GET_USER_ID = exports.GET_USER_ALL = exports.SAVE_USER = void 0;
const SAVE_USER = `
INSERT INTO 
user(user_name , phone_number , name , password , birthday , register , user_status ,accept_date ,refresh_token) 
VALUES( ? , ? , ? , ? , ? , ? , 'ACTIVE' , ? , ? );`;
exports.SAVE_USER = SAVE_USER;
const GET_USER_ALL = `
SELECT user_id,user_name , phone_number , name , birthday , register , user_status, accept_date
FROM user;`;
exports.GET_USER_ALL = GET_USER_ALL;
const GET_USER_ID = `SELECT user_id,user_name , phone_number , name , birthday , register , user_status, accept_date
FROM user
WHERE user_id = ?;`;
exports.GET_USER_ID = GET_USER_ID;
const GET_USER_PHONE = `SELECT *
FROM user
WHERE phone_number = ?;
`;
exports.GET_USER_PHONE = GET_USER_PHONE;
const UPDATE_USER_PSWORD = `
UPDATE user
SET password = ?
WHERE user_phone_number = ?;
`;
exports.UPDATE_USER_PSWORD = UPDATE_USER_PSWORD;
const SAVE_USER_KAKAO = `
INSERT INTO 
user(user_name , phone_number , name  , birthday , register , user_status ,accept_date ,refresh_token , social_id) 
VALUES( ? , ? , ? ,  ? , ? , 'ACTIVE' , ? , ? , ? );`;
exports.SAVE_USER_KAKAO = SAVE_USER_KAKAO;
const UPDATE_USER_NAME = `
UPDATE user
SET user_name = ?
WHERE user_id = ?
`;
exports.UPDATE_USER_NAME = UPDATE_USER_NAME;
const SAVE_USER_NAME_CHANGE = `
INSERT INTO
change_user_name(user_id_fk)
VALUES(?)
`;
exports.SAVE_USER_NAME_CHANGE = SAVE_USER_NAME_CHANGE;
const GET_CHANGE_USER_NAME_COUNT = `
SELECT *
FROM change_user_name
WHERE user_id_fk = ?
AND
timestampdiff(day,update_timestamp,current_timestamp) < 14;
`;
exports.GET_CHANGE_USER_NAME_COUNT = GET_CHANGE_USER_NAME_COUNT;
const UPDATE_USER_STATUS = `
UPDATE user
SET user_status = ?
WHERE user_id = ?
`;
exports.UPDATE_USER_STATUS = UPDATE_USER_STATUS;
const DELETE_BOARD = `
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
SET b.board_status = 'DELETE',
    bi.board_image_status = 'DELETE',
    bl.board_like_status = 'DELETE',
    br.reply_status = 'DELETE',
    rl.reply_status = 'DELETE',
    u.user_status = 'DELETE'
WHERE u.user_id = ?;
`;
exports.DELETE_BOARD = DELETE_BOARD;
const DELETE_FOLLOW = `
UPDATE follow
SET follow_status = 'DELETE'
WHERE follow_user_fk = ?
OR followed_user_fk = ? ;
`;
exports.DELETE_FOLLOW = DELETE_FOLLOW;
//# sourceMappingURL=user.sql.js.map