const SAVE_USER = `
INSERT INTO 
user(user_name , phone_number , name , password , birthday , register , user_status ,accept_date ,refresh_token) 
VALUES( ? , ? , ? , ? , ? , ? , 'ACTIVE' , ? , ? );`;

const GET_USER_ALL = `
SELECT user_id,user_name , phone_number , name , birthday , register , user_status, accept_date
FROM user;`;

const GET_USER_ID = `SELECT user_id,user_name , phone_number , name , birthday , register , user_status, accept_date
FROM user
WHERE user_id = ?;`;

const GET_USER_PHONE = `SELECT *
FROM user
WHERE phone_number = ?;
`;

const UPDATE_USER_PSWORD = `
UPDATE user
SET password = ?
WHERE user_phone_number = ?;
`;

const SAVE_USER_KAKAO = `
INSERT INTO 
user(user_name , phone_number , name  , birthday , register , user_status ,accept_date ,refresh_token , social_id) 
VALUES( ? , ? , ? ,  ? , ? , 'ACTIVE' , ? , ? , ? );`;

const UPDATE_USER_NAME = `
UPDATE user
SET user_name = ?
WHERE user_id = ?
`;

const SAVE_USER_NAME_CHANGE = `
INSERT INTO
change_user_name(user_id_fk)
VALUES(?)
`;

const GET_CHANGE_USER_NAME_COUNT = `
SELECT *
FROM change_user_name
WHERE user_id_fk = ?
AND
timestampdiff(day,update_timestamp,current_timestamp) < 14;
`;

const UPDATE_USER_STATUS = `
UPDATE user
SET user_status = ?
WHERE user_id = ?
`;

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

const DELETE_FOLLOW = `
UPDATE follow
SET follow_status = 'DELETE'
WHERE follow_user_fk = ?
OR followed_user_fk = ? ;
`;
export {
  SAVE_USER,
  GET_USER_ALL,
  GET_USER_ID,
  SAVE_USER_KAKAO,
  GET_CHANGE_USER_NAME_COUNT,
  UPDATE_USER_NAME,
  SAVE_USER_NAME_CHANGE,
  UPDATE_USER_STATUS,
  GET_USER_PHONE,
  UPDATE_USER_PSWORD,
  DELETE_BOARD,
  DELETE_FOLLOW,
};
