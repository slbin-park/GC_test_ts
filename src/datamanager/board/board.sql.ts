const SAVE = `
INSERT INTO 
board(  user_name_fk , board_status , board_content ) 
VALUES(  ? , ? , ? );
`;

const SAVE_IMAGE = `INSERT INTO
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
export { SAVE, SAVE_IMAGE, GET_BY_ID, SAVE_REPLY };
