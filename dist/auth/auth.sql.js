"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_BY_REFRESH_TOKEN = exports.GET_BY_USERNAME = exports.UPDATE_REFRESH_TOKEN = exports.GET_BY_KAKAOID = void 0;
const GET_BY_KAKAOID = `SELECT *
FROM user
WHERE social_id = '?'`;
exports.GET_BY_KAKAOID = GET_BY_KAKAOID;
const UPDATE_REFRESH_TOKEN = `
UPDATE user 
SET refresh_token = ? 
WHERE user_id = ? ;
`;
exports.UPDATE_REFRESH_TOKEN = UPDATE_REFRESH_TOKEN;
const GET_BY_USERNAME = `
SELECT *
FROM user
WHERE user_name = ? ;`;
exports.GET_BY_USERNAME = GET_BY_USERNAME;
const GET_BY_REFRESH_TOKEN = `
SELECT *
FROM user
WHERE refresh_token = ?
`;
exports.GET_BY_REFRESH_TOKEN = GET_BY_REFRESH_TOKEN;
//# sourceMappingURL=auth.sql.js.map