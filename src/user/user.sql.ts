const SAVE = `INSERT INTO 
user(user_name , phone_number , name , password , birthday , register , user_status ,accept_date ,refresh_token) 
VALUES( ? , ? , ? , ? , ? , ? , ? , ? , ? );`;

const FIND = `SELECT user_name , phone_number , name , birthday , register , user_status, accept_date
FROM user;`;
const FINDBYID = `SELECT user_name , phone_number , name , birthday , register , user_status, accept_date
FROM user
WHERE user_name = ?;`;

const SAVE_KAKAO = `INSERT INTO 
user(user_name , phone_number , name  , birthday , register , user_status ,accept_date ,refresh_token , social_id) 
VALUES( ? , ? , ? ,  ? , ? , ? , ? , ? , ? );`;

export { SAVE, FIND, FINDBYID, SAVE_KAKAO };