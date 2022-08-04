const SAVE_USER = `INSERT INTO 
user(user_name , phone_number , name , password , birthday , register , user_status ,accept_date ,refresh_token) 
VALUES( ? , ? , ? , ? , ? , ? , 'ACTIVE' , ? , ? );`;

const FIND_USER_ALL = `SELECT user_name , phone_number , name , birthday , register , user_status, accept_date
FROM user;`;
const FIND_USER_ID = `SELECT user_name , phone_number , name , birthday , register , user_status, accept_date
FROM user
WHERE user_name = ?;`;

const SAVE_USER_KAKAO = `INSERT INTO 
user(user_name , phone_number , name  , birthday , register , user_status ,accept_date ,refresh_token , social_id) 
VALUES( ? , ? , ? ,  ? , ? , 'ACTIVE' , ? , ? , ? );`;

export { SAVE_USER, FIND_USER_ALL, FIND_USER_ID, SAVE_USER_KAKAO };
