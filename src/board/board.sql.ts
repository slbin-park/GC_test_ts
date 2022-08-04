const SAVE = `
INSERT INTO 
board(  user_id_fk , board_status , board_content ) 
VALUES(  ? , ? , ? );
`;

const SAVE_IMAGE = `
INSERT INTO
board_image (board_id_fk , image_address)
VALUES( ? , ? );`;

const GET_BY_ID = `
SELECT *
FROM board
WHERE board_id = ?
`;

const SAVE_REPLY = `
INSERT INTO 
board_reply( board_id_fk , user_id_fk , reply_content , reply_status ) 
VALUES( ? , ? , ? , 'VISIBLE' );
`;

const SAVE_BOARD_LIKE = `
INSERT INTO
board_like(board_id_fk, board_like_status, user_id_fk)
VALUES(? , ?, ? )
`;

const GET_BY_ID_BOARD_LIKE = `
SELECT *
FROM board_like
WHERE board_id_fk = ?
AND
user_id_fk = ?
`;

const UPDATE_BOARD_LIKE = `
UPDATE board_like 
SET board_like_status = ? 
WHERE board_like_id = ?;
`;

const GET_BY_ID_REPLY = `
SELECT *
FROM board_reply
WHERE reply_id = ?;
`;

const GET_BY_ID_REPLY_LIKE = `
SELECT *
FROM reply_like
WHERE reply_id_fk = ?
AND
user_id_fk = ? ;
`;

const SAVE_REPLY_LIKE = `
INSERT INTO
reply_like(reply_id_fk, reply_status , user_id_fk)
VALUES(? , ? , ? );
`;

const UPDATE_REPLY_LIKE = `
UPDATE reply_like
SET reply_status = ?
WHERE reply_like_id = ?
`;

const SAVE_REPLY_REPORT = `
INSERT INTO
reply_report (reply_id_Fk , report_content , user_id_fk , reply_report_status)
VALUES( ? , ? , ? , ?);
`;

const SAVE_BOARD_REPORT = `
INSERT INTO
board_report (board_id, report_content, user_id_fk, board_report_status)
VALUES( ? , ? , ? , ?);
`;

const UPDATE_BOARD = `
UPDATE board 
SET board_content = ?
WHERE board_id = ?
`;

export {
  SAVE,
  SAVE_IMAGE,
  GET_BY_ID,
  SAVE_REPLY,
  SAVE_BOARD_LIKE,
  GET_BY_ID_BOARD_LIKE,
  UPDATE_BOARD_LIKE,
  GET_BY_ID_REPLY,
  GET_BY_ID_REPLY_LIKE,
  SAVE_REPLY_LIKE,
  UPDATE_REPLY_LIKE,
  SAVE_REPLY_REPORT,
  SAVE_BOARD_REPORT,
  UPDATE_BOARD,
};
