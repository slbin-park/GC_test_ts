const FINDBYID = `
SELECT user_name 2
FROM user
WHERE user_name = ?;`;

const CHECKID = `
SELECT COUNT(*) as count
FROM user
WHERE user_name = ?;
`;

const FOLLOW = `INSERT INTO 
follow(follow_user_fk , followed_user_fk , follow_status) 
VALUES( ? , ? , ? );
`;

const CHECKFOLLOW = `
SELECT *
FROM follow
WHERE follow_user_fk = ? AND followed_user_fk = ?
`;

const UPDATEFOLLOW = `
UPDATE follow 
SET follow_status = ? 
WHERE follow_user_fk = ? AND followed_user_fk = ?;
`;
export { FINDBYID, CHECKID, FOLLOW, CHECKFOLLOW, UPDATEFOLLOW };
