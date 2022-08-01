const FINDBYID = `
SELECT user_name
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

// 팔로잉 유저 개수
const FOLLOWCOUNT = `
SELECT COUNT(*) as count
FROM follow
WHERE followed_user_fk = ?;
`;

// 팔로워 유저 개수
const FOLLOWEDCOUNT = `
SELECT COUNT(*) as count
FROM follow
WHERE follow_user_fk = ?;
`;

// 게시글 개수
const BOARDCOUNT = `
SELECT COUNT(*) as count
FROM board
WHERE user_name_fk = ?;
`;

// 게시글 개수
const USERNAME = `
SELECT name 
FROM user
WHERE user_name = ?;
`;

// 피드 가져오기
const FEED = `
SELECT board_id , image_address
FROM board b
INNER JOIN (SELECT image_address FROM board_image ORDER BY board_id_fk ASC LIMIT 1) bi
WHERE b.user_name_fk = ?
AND b.board_id < ?
ORDER BY board_id DESC
LIMIT 9;
`;

const GETALLFEED = `
SELECT * , (
    SELECT COUNT(*)
    FROM board_reply br
    WHERE b.board_id = br.board_id_fk
    ) as reply_count
    ,
    (
    SELECT COUNT(*)
    FROM board_like bl
    WHERE b.board_id = bl.board_id_fk
    ) as board_like_count
FROM board b
INNER JOIN(
SELECT board_id_fk,group_concat(image_address) as image_addresses
FROM board_image bi1
GROUP BY board_id_fk) bi
ON b.board_id = bi.board_id_fk
WHERE b.user_name_fk IN (
    SELECT follow_user_fk
    FROM follow
    WHERE followed_user_fk = ?
    AND
        follow_status = 'FOLLOW'
    )
AND b.board_id < ?
ORDER BY board_id DESC
LIMIT 10;
`;

export {
  FINDBYID,
  CHECKID,
  FOLLOW,
  CHECKFOLLOW,
  UPDATEFOLLOW,
  FOLLOWCOUNT,
  FOLLOWEDCOUNT,
  BOARDCOUNT,
  USERNAME,
  FEED,
  GETALLFEED,
};
