const FINDBY_KAKAOID = `SELECT *
FROM user
WHERE social_id = '?'`;

const UPDATE_REFRESH_TOKEN = `
UPDATE user 
SET refresh_token = ? 
WHERE user_name = ? ;
`;

const FINDBYUSERNAME = `
SELECT *
FROM user
WHERE user_name = ?;`;
export { FINDBY_KAKAOID, UPDATE_REFRESH_TOKEN, FINDBYUSERNAME };
