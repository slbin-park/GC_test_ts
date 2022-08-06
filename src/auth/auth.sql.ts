const GET_BY_KAKAOID = `SELECT *
FROM user
WHERE social_id = '?'`;

const UPDATE_REFRESH_TOKEN = `
UPDATE user 
SET refresh_token = ? 
WHERE user_id = ? ;
`;

const GET_BY_USERNAME = `
SELECT *
FROM user
WHERE user_name = ? ;`;

const GET_BY_REFRESH_TOKEN = `
SELECT *
FROM user
WHERE refresh_token = ?
`;

export { GET_BY_KAKAOID, UPDATE_REFRESH_TOKEN, GET_BY_USERNAME, GET_BY_REFRESH_TOKEN };
