"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_CHECK_FOLLOW_STATUS = exports.GET_FOLLOW_SUB_LIST_PRIVATE = exports.GET_BOARD_IMG = exports.UPDATE_USER_PROFILE = exports.GET_ALL_FEED_FOLLOW = exports.GET_FEED = exports.GET_BOARD_COUNT = exports.GET_FOLLOWER_COUNT = exports.GET_FOLLOWING_COUNT = exports.UPDATE_FOLLOW = exports.GET_FOLOW_USER = exports.SAVE_FOLLOW = exports.GET_USER_ID = void 0;
const GET_USER_ID = `
SELECT user_id,user_name,name,profileUrl,website,introduction,user_status
FROM user
WHERE user_id = ?;`;
exports.GET_USER_ID = GET_USER_ID;
const SAVE_FOLLOW = `INSERT INTO 
follow(follow_user_fk , followed_user_fk , follow_status) 
VALUES( ? , ? , ? );
`;
exports.SAVE_FOLLOW = SAVE_FOLLOW;
const GET_FOLOW_USER = `
SELECT *
FROM follow
WHERE follow_user_fk = ? AND followed_user_fk = ?
`;
exports.GET_FOLOW_USER = GET_FOLOW_USER;
const UPDATE_FOLLOW = `
UPDATE follow 
SET follow_status = ? 
WHERE follow_user_fk = ? AND followed_user_fk = ?;
`;
exports.UPDATE_FOLLOW = UPDATE_FOLLOW;
// 팔로잉 유저 개수
const GET_FOLLOWING_COUNT = `
SELECT COUNT(*) as count
FROM follow
WHERE followed_user_fk = ?;
`;
exports.GET_FOLLOWING_COUNT = GET_FOLLOWING_COUNT;
// 팔로워 유저 개수
const GET_FOLLOWER_COUNT = `
SELECT COUNT(*) as count
FROM follow
WHERE follow_user_fk = ?;
`;
exports.GET_FOLLOWER_COUNT = GET_FOLLOWER_COUNT;
// 게시글 개수
const GET_BOARD_COUNT = `
SELECT COUNT(*) as count
FROM board
WHERE user_id_fk = ?;
`;
exports.GET_BOARD_COUNT = GET_BOARD_COUNT;
// 피드 가져오기
const GET_FEED = `
SELECT board_id , image_address
FROM board b
INNER JOIN (SELECT image_address FROM board_image ORDER BY board_id_fk ASC LIMIT 1) bi
WHERE b.user_id_fk = ?
AND b.board_id < ?
ORDER BY board_id DESC
LIMIT 9;
`;
exports.GET_FEED = GET_FEED;
const GET_ALL_FEED_FOLLOW = `
SELECT u.user_name , b.board_id , b.board_content ,
u.user_id, u.profileUrl,
IF(bl.board_like_status = 'ACTIVE', 'LIKE', 'UNLIKE') as likeOrNot,
(
    SELECT COUNT(*)
    FROM board_reply br
    WHERE b.board_id = br.board_id_fk
    ) as reply_count
    ,
    (
    SELECT COUNT(*)
    FROM board_like bl
    WHERE b.board_id = bl.board_id_fk
    ) as board_like_count,
    case
               when timestampdiff(second, b.update_at, current_timestamp) < 60
                   then concat(timestampdiff(second, b.update_at, current_timestamp), '초 전')
               when timestampdiff(minute , b.update_at, current_timestamp) < 60
                   then concat(timestampdiff(minute, b.update_at, current_timestamp), '분 전')
               when timestampdiff(hour , b.update_at, current_timestamp) < 24
                   then concat(timestampdiff(hour, b.update_at, current_timestamp), '시간 전')
               when timestampdiff(day , b.update_at, current_timestamp) < 365
                   then concat(timestampdiff(day, b.update_at, current_timestamp), '일 전')
               else concat(MONTH(b.update_at) ,'월',DAY(b.update_at), '일')
           end as uploadTime
FROM board b
    LEFT JOIN user as u
    ON b.user_id_fk = u.user_id
    LEFT JOIN board_like bl
    ON b.board_id = bl.board_id_fk
WHERE b.user_id_fk IN (
    SELECT follow_user_fk
    FROM follow
    WHERE followed_user_fk = ?
    AND
    follow_status = 'FOLLOW'
    )

AND b.board_id < ?
AND b.board_status = 'ACTIVE'
ORDER BY board_id DESC
LIMIT 10;
`;
exports.GET_ALL_FEED_FOLLOW = GET_ALL_FEED_FOLLOW;
const GET_BOARD_IMG = `
SELECT bi.image_id,bi.image_address
FROM board b
LEFT JOIN board_image bi
ON b.board_id = bi.board_id_fk
WHERE b.board_id = ?
`;
exports.GET_BOARD_IMG = GET_BOARD_IMG;
const UPDATE_USER_PROFILE = `
UPDATE user 
SET profileUrl = ? , website = ? , introduction = ?
WHERE user_id = ? ;
`;
exports.UPDATE_USER_PROFILE = UPDATE_USER_PROFILE;
const GET_FOLLOW_SUB_LIST_PRIVATE = `
SELECT u.user_id,u.user_name,u.profileUrl
FROM follow f
LEFT JOIN
user u
ON f.followed_user_fk = u.user_id
WHERE follow_user_fk = ?
AND
follow_status = 'SUBSCRIPTION'
`;
exports.GET_FOLLOW_SUB_LIST_PRIVATE = GET_FOLLOW_SUB_LIST_PRIVATE;
const GET_CHECK_FOLLOW_STATUS = `
SELECT *
FROM follow
WHERE 
followed_user_fk = ?
AND
follow_user_fk = ?
`;
exports.GET_CHECK_FOLLOW_STATUS = GET_CHECK_FOLLOW_STATUS;
//# sourceMappingURL=profile.sql.js.map