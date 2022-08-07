"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_CHAT = exports.SAVE_CHAT = void 0;
const SAVE_CHAT = `
INSERT INTO
chatting(user_id_fk, chatting_content, chatting_status)
VALUES(? , ? , 'ACTIVE')
`;
exports.SAVE_CHAT = SAVE_CHAT;
const GET_CHAT = `
SELECT user_id_fk,chatting_content,
case
   when DAY(create_at) = DAY(current_timestamp)
        then concat(IF(DATE_FORMAT(create_at,'%p') = 'PM','오후 ','오전 '),hour(create_at),' :',minute(create_at))
   when timestampdiff(day , create_at, current_timestamp) < 2
       then concat('어제',IF(DATE_FORMAT(create_at,'%p') = 'PM','오후 ','오전 '),hour(create_at),' :',minute(create_at))
   when timestampdiff(day , create_at, current_timestamp) < 7
       then concat(timestampdiff(day, create_at, current_timestamp), '일전,',IF(DATE_FORMAT(create_at,'%p') = 'PM','오후 ','오전 '),hour(create_at),' :',minute(create_at))
   else concat(MONTH(create_at) ,'월',DAY(create_at), '일',IF(DATE_FORMAT(create_at,'%p') = 'PM','오후 ','오전 '),hour(create_at),' :',minute(create_at))
end as upladTime
FROM chatting
WHERE user_id_fk = ?
`;
exports.GET_CHAT = GET_CHAT;
//# sourceMappingURL=chat.sql.js.map