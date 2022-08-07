const SAVE_USER_DATA = `
INSERT INTO 
user(user_name , phone_number , name , password , birthday , register , user_status  , accept_date  ,
refresh_token , social_id , profileUrl , website , introduction , update_at  , create_at )
VALUES(? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? );
`;
const GET_USER_DATA = `
SELECT *
FROM user
`;
const GET_USER_ID = `
SELECT *
FROM user
WHERE user_id = ?;
`;
const UPDATE_USER_ID = `
UPDATE user
SET user_name = ? , phone_number = ? , name = ? ,password = ? , birthday = STR_TO_DATE(?,'%Y-%m-%dT%H:%i:%s.000Z') , register = ? , user_status = ? , accept_date = STR_TO_DATE(?,'%Y-%m-%dT%H:%i:%s.000Z') ,
refresh_token = ? , social_id = ? , profileUrl = ? , website = ? , introduction = ? , update_at = STR_TO_DATE(?,'%Y-%m-%dT%H:%i:%s.000Z') , create_at = STR_TO_DATE(?,'%Y-%m-%dT%H:%i:%s.000Z')
WHERE user_id = ?
`;
export { GET_USER_DATA, GET_USER_ID, UPDATE_USER_ID };
