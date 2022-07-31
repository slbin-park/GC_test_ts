const SAVE = `
INSERT INTO 
board(  user_name_fk , board_status , board_content ) 
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
board_reply( board_id_fk , user_name_fk , reply_content , reply_status ) 
VALUES( ? , ? , ? , 'VISIBLE' );
`;

const SAVE_BOARD_LIKE = `
INSERT INTO
board_like(board_id_fk, board_like_status, user_name_fk)
VALUES(? , ?, ? )
`;

const GET_BY_ID_BOARD_LIKE = `
SELECT *
FROM board_like
WHERE board_id_fk = ?
AND
user_name_fk = ?
`;

const UPDATE_BOARD_LIKE = `
UPDATE board_like 
SET board_like_status = ? 
WHERE board_like_id = ?;
`;
export {
  SAVE,
  SAVE_IMAGE,
  GET_BY_ID,
  SAVE_REPLY,
  SAVE_BOARD_LIKE,
  GET_BY_ID_BOARD_LIKE,
  UPDATE_BOARD_LIKE,
};
