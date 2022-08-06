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
};
