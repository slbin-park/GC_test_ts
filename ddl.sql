-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- user Table Create SQL
CREATE TABLE user
(
    `user_id`        INT             NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `user_name`      VARCHAR(45)     NOT NULL    COMMENT '사용자 이름', 
    `phone_number`   VARCHAR(20)     NOT NULL    COMMENT '휴대폰번호', 
    `name`           VARCHAR(20)     NOT NULL    COMMENT '이름', 
    `password`       VARCHAR(200)    NULL        COMMENT '비밀번호', 
    `birthday`       DATE            NOT NULL    COMMENT '생일', 
    `register`       VARCHAR(20)     NOT NULL    COMMENT '로그인구분', 
    `user_status`    VARCHAR(20)     NOT NULL    COMMENT '유저 상태', 
    `accept_date`    DATE            NULL        COMMENT '약관 동의 날짜', 
    `refresh_token`  TEXT            NULL        COMMENT '토큰 저장', 
    `social_id`      VARCHAR(45)     NULL        COMMENT '소셜 아이디', 
    `profileUrl`     TEXT            NULL        COMMENT '프로필 사진', 
    `website`        VARCHAR(45)     NULL        COMMENT '웹사이트', 
    `introduction`   VARCHAR(450)    NULL        COMMENT '소개', 
    `update_at`      TIMESTAMP       NOT NULL    DEFAULT current_timestamp on update current_timestamp COMMENT '수정 날짜', 
    `create_at`      TIMESTAMP       NOT NULL    DEFAULT current_timestamp COMMENT '만든 날짜', 
     PRIMARY KEY (user_id)
);

ALTER TABLE user COMMENT '유저 도메인';


-- board Table Create SQL
CREATE TABLE board
(
    `board_id`       INT            NOT NULL    AUTO_INCREMENT COMMENT '게시글 아이디', 
    `board_content`  TEXT           NULL        COMMENT '게시글 내용', 
    `user_id_fk`     INT            NOT NULL    COMMENT '사용자 이름', 
    `board_status`   VARCHAR(45)    NOT NULL    COMMENT '게시글 상태', 
    `create_at`      TIMESTAMP      NOT NULL    DEFAULT current_timestamp COMMENT '만든 날짜', 
    `update_at`      TIMESTAMP      NOT NULL    DEFAULT current_timestamp on update current_timestamp COMMENT '수정 날짜', 
     PRIMARY KEY (board_id)
);

ALTER TABLE board COMMENT '보드 도메인';

ALTER TABLE board
    ADD CONSTRAINT FK_board_user_id_fk_user_user_id FOREIGN KEY (user_id_fk)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- board_reply Table Create SQL
CREATE TABLE board_reply
(
    `reply_id`       INT            NOT NULL    AUTO_INCREMENT COMMENT '댓글 아이디', 
    `board_id_fk`    INT            NOT NULL    COMMENT '게시글 아이디', 
    `user_id_fk`     INT            NOT NULL    COMMENT '작성자 아이디', 
    `reply_content`  VARCHAR(45)    NOT NULL    COMMENT '댓글 내용', 
    `reply_status`   VARCHAR(45)    NOT NULL    COMMENT '댓글 상태', 
    `create_at`      TIMESTAMP      NOT NULL    DEFAULT current_timestamp COMMENT '만든 날짜', 
    `update_at`      TIMESTAMP      NOT NULL    DEFAULT current_timestamp on update current_timestamp COMMENT '수정 날짜', 
     PRIMARY KEY (reply_id)
);

ALTER TABLE board_reply COMMENT '게시글 댓글 테이블';

ALTER TABLE board_reply
    ADD CONSTRAINT FK_board_reply_board_id_fk_board_board_id FOREIGN KEY (board_id_fk)
        REFERENCES board (board_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE board_reply
    ADD CONSTRAINT FK_board_reply_user_id_fk_user_user_id FOREIGN KEY (user_id_fk)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- follow Table Create SQL
CREATE TABLE follow
(
    `follow_id`         INT            NOT NULL    AUTO_INCREMENT COMMENT '팔로우 아이디', 
    `follow_user_fk`    INT            NOT NULL    COMMENT '팔로우 할 유저', 
    `followed_user_fk`  INT            NOT NULL    COMMENT '팔로우 한 유저', 
    `follow_status`     VARCHAR(45)    NOT NULL    COMMENT '팔로우 상태', 
    `create_at`         TIMESTAMP      NOT NULL    DEFAULT current_timestamp COMMENT '만든 날짜', 
    `update_at`         TIMESTAMP      NOT NULL    DEFAULT current_timestamp on update current_timestamp COMMENT '수정 날짜', 
     PRIMARY KEY (follow_id)
);

ALTER TABLE follow COMMENT '팔로우 테이블';

ALTER TABLE follow
    ADD CONSTRAINT FK_follow_follow_user_fk_user_user_id FOREIGN KEY (follow_user_fk)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE follow
    ADD CONSTRAINT FK_follow_followed_user_fk_user_user_id FOREIGN KEY (followed_user_fk)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- chatting Table Create SQL
CREATE TABLE chatting
(
    `chatting_id`       INT            NOT NULL    AUTO_INCREMENT COMMENT '채팅 아이디', 
    `user_id_fk`        INT            NOT NULL    COMMENT '채팅 유저 아이디', 
    `chatting_content`  TEXT           NOT NULL    COMMENT '채팅 내용', 
    `chatting_status`   VARCHAR(45)    NOT NULL    COMMENT '채팅 상태', 
    `create_at`         TIMESTAMP      NOT NULL    DEFAULT current_timestamp COMMENT '만든 날짜', 
    `update_at`         TIMESTAMP      NOT NULL    DEFAULT current_timestamp on update current_timestamp COMMENT '수정 날짜', 
     PRIMARY KEY (chatting_id)
);

ALTER TABLE chatting COMMENT '채팅 테이블';

ALTER TABLE chatting
    ADD CONSTRAINT FK_chatting_user_id_fk_user_user_id FOREIGN KEY (user_id_fk)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- board_like Table Create SQL
CREATE TABLE board_like
(
    `board_like_id`      INT            NOT NULL    AUTO_INCREMENT COMMENT '게시글 좋아요 아이디', 
    `board_id_fk`        INT            NOT NULL    COMMENT '게시글 아이디', 
    `board_like_status`  VARCHAR(45)    NOT NULL    COMMENT '게시글 좋아요 상태', 
    `create_at`          TIMESTAMP      NOT NULL    DEFAULT current_timestamp COMMENT '만든 날짜', 
    `update_at`          TIMESTAMP      NOT NULL    DEFAULT current_timestamp on update current_timestamp COMMENT '수정 날짜', 
    `user_id_fk`         INT            NOT NULL    COMMENT '게시글 좋아요한 아이디', 
     PRIMARY KEY (board_like_id)
);

ALTER TABLE board_like COMMENT '게시글 좋아요 테이블';

ALTER TABLE board_like
    ADD CONSTRAINT FK_board_like_board_id_fk_board_board_id FOREIGN KEY (board_id_fk)
        REFERENCES board (board_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE board_like
    ADD CONSTRAINT FK_board_like_user_id_fk_user_user_id FOREIGN KEY (user_id_fk)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- reply_like Table Create SQL
CREATE TABLE reply_like
(
    `reply_like_id`  INT            NOT NULL    AUTO_INCREMENT COMMENT '댓글 좋아요 아이디', 
    `reply_id_fk`    INT            NOT NULL    COMMENT '댓글 아이디', 
    `user_id_fk`     INT            NOT NULL    COMMENT '좋아요 요청 아이디', 
    `reply_status`   VARCHAR(45)    NOT NULL    COMMENT '댓글 상태', 
    `create_at`      TIMESTAMP      NOT NULL    DEFAULT current_timestamp COMMENT '만든 날짜', 
    `update_at`      TIMESTAMP      NOT NULL    DEFAULT current_timestamp on update current_timestamp COMMENT '수정 날짜', 
     PRIMARY KEY (reply_like_id)
);

ALTER TABLE reply_like COMMENT '댓글 좋아요 테이블';

ALTER TABLE reply_like
    ADD CONSTRAINT FK_reply_like_reply_id_fk_board_reply_reply_id FOREIGN KEY (reply_id_fk)
        REFERENCES board_reply (reply_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE reply_like
    ADD CONSTRAINT FK_reply_like_user_id_fk_user_user_id FOREIGN KEY (user_id_fk)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- board_image Table Create SQL
CREATE TABLE board_image
(
    `image_id`            INT            NOT NULL    AUTO_INCREMENT COMMENT '이미지 아이디', 
    `board_id_fk`         INT            NOT NULL    COMMENT '게시글 아이디', 
    `image_address`       TEXT           NOT NULL    COMMENT '이미지 주소', 
    `create_at`           TIMESTAMP      NOT NULL    DEFAULT current_timestamp COMMENT '만든 날짜', 
    `update_at`           TIMESTAMP      NOT NULL    DEFAULT current_timestamp on update current_timestamp COMMENT '수정 날짜', 
    `board_image_status`  VARCHAR(45)    NOT NULL    COMMENT '이미지 상태', 
     PRIMARY KEY (image_id)
);

ALTER TABLE board_image COMMENT '게시글 이미지 테이블';

ALTER TABLE board_image
    ADD CONSTRAINT FK_board_image_board_id_fk_board_board_id FOREIGN KEY (board_id_fk)
        REFERENCES board (board_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- board_report Table Create SQL
CREATE TABLE board_report
(
    `board_report_id`      INT             NOT NULL    AUTO_INCREMENT COMMENT '게시글 신고 아이디', 
    `user_id_fk`           INT             NOT NULL    COMMENT '신고 유저', 
    `board_id`             INT             NOT NULL    COMMENT '신고 게시글 아이디', 
    `report_content`       VARCHAR(100)    NOT NULL    COMMENT '신고사유', 
    `board_report_status`  VARCHAR(20)     NOT NULL    COMMENT '게시글 신고 상태', 
    `create_at`            TIMESTAMP       NOT NULL    DEFAULT current_timestamp COMMENT '만든 날짜', 
    `update_at`            TIMESTAMP       NOT NULL    DEFAULT current_timestamp on update current_timestamp COMMENT '수정 날짜', 
     PRIMARY KEY (board_report_id)
);

ALTER TABLE board_report COMMENT '게시글 신고 테이블';

ALTER TABLE board_report
    ADD CONSTRAINT FK_board_report_board_id_board_board_id FOREIGN KEY (board_id)
        REFERENCES board (board_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE board_report
    ADD CONSTRAINT FK_board_report_user_id_fk_user_user_id FOREIGN KEY (user_id_fk)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- reply_report Table Create SQL
CREATE TABLE reply_report
(
    `reply_report_id`      INT             NOT NULL    AUTO_INCREMENT COMMENT '댓글 신고 아이디', 
    `user_id_fk`           INT             NOT NULL    COMMENT '신고 유저 아이디', 
    `reply_id_fk`          INT             NOT NULL    COMMENT '신고 댓글 아이디', 
    `report_content`       VARCHAR(100)    NOT NULL    COMMENT '신고 사유', 
    `create_at`            TIMESTAMP       NOT NULL    DEFAULT current_timestamp COMMENT '만든 날짜', 
    `update_at`            TIMESTAMP       NOT NULL    DEFAULT current_timestamp on update current_timestamp COMMENT '수정 날짜', 
    `reply_report_status`  VARCHAR(20)     NOT NULL    COMMENT '댓글 신고 상태', 
     PRIMARY KEY (reply_report_id)
);

ALTER TABLE reply_report COMMENT '댓글 신고 테이블';

ALTER TABLE reply_report
    ADD CONSTRAINT FK_reply_report_reply_id_fk_board_reply_reply_id FOREIGN KEY (reply_id_fk)
        REFERENCES board_reply (reply_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE reply_report
    ADD CONSTRAINT FK_reply_report_user_id_fk_user_user_id FOREIGN KEY (user_id_fk)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- change_user_name Table Create SQL
CREATE TABLE change_user_name
(
    `user_id_fk`        INT          NOT NULL    COMMENT '유저 아이디', 
    `id`                INT          NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `update_timestamp`  TIMESTAMP    NOT NULL    DEFAULT current_timestamp COMMENT '변경 날짜', 
     PRIMARY KEY (id)
);

ALTER TABLE change_user_name
    ADD CONSTRAINT FK_change_user_name_user_id_fk_user_user_id FOREIGN KEY (user_id_fk)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user_log Table Create SQL
CREATE TABLE user_log
(
    `idx`            INT            NOT NULL    AUTO_INCREMENT COMMENT '식별자', 
    `update_at`      TIMESTAMP      NULL        DEFAULT current_timestamp COMMENT '액션한 시간', 
    `db_action`      VARCHAR(45)    NULL        COMMENT 'CRUD행동', 
    `user_id`        INT            NULL        COMMENT '유저 식별자', 
    `user_name`      TEXT           NULL        COMMENT '사용자 이름', 
    `phone_number`   TEXT           NULL        COMMENT '휴대폰번호', 
    `name`           TEXT           NULL        COMMENT '이름', 
    `password`       TEXT           NULL        COMMENT '비밀번호', 
    `birthday`       TEXT           NULL        COMMENT '생일', 
    `register`       TEXT           NULL        COMMENT '로그인구분', 
    `user_status`    TEXT           NULL        COMMENT '유저 상태', 
    `accept_date`    TEXT           NULL        COMMENT '약관 동의 날짜', 
    `refresh_token`  TEXT           NULL        COMMENT '토큰 저장', 
    `social_id`      TEXT           NULL        COMMENT '소셜 아이디', 
    `profileUrl`     TEXT           NULL        COMMENT '프로필 사진', 
    `website`        TEXT           NULL        COMMENT '웹사이트', 
    `introduction`   TEXT           NULL        COMMENT '소개', 
     PRIMARY KEY (idx)
);

ALTER TABLE user_log COMMENT '유저 로그';


-- board_log Table Create SQL
CREATE TABLE board_log
(
    `idx`            INT            NOT NULL    AUTO_INCREMENT COMMENT '고유 인덱스', 
    `update_at`      TIMESTAMP      NULL        DEFAULT current_timestamp COMMENT '액션한 시간', 
    `db_action`      VARCHAR(45)    NULL        COMMENT 'CRUD행동', 
    `board_id`       INT            NULL        COMMENT '게시글 아이디', 
    `board_content`  TEXT           NULL        COMMENT '게시글 내용', 
    `user_id_fk`     TEXT           NULL        COMMENT '사용자 이름', 
    `board_status`   TEXT           NULL        COMMENT '게시글 상태', 
     PRIMARY KEY (idx)
);

ALTER TABLE board_log COMMENT '게시글 로그';


-- reply_log Table Create SQL
CREATE TABLE reply_log
(
    `idx`            INT            NOT NULL    AUTO_INCREMENT COMMENT '고유 인덱스', 
    `update_at`      TIMESTAMP      NULL        DEFAULT current_timestamp COMMENT '액션한 시간', 
    `db_action`      VARCHAR(45)    NULL        COMMENT 'CRUD행동', 
    `reply_id`       INT            NULL        COMMENT '댓글 아이디', 
    `board_id_fk`    TEXT           NULL        COMMENT '게시글 아이디', 
    `user_id_fk`     TEXT           NULL        COMMENT '작성자 아이디', 
    `reply_content`  TEXT           NULL        COMMENT '댓글 내용', 
    `reply_status`   TEXT           NULL        COMMENT '댓글 상태', 
     PRIMARY KEY (idx)
);

ALTER TABLE reply_log COMMENT '게시글 댓글 테이블';


-- report_log Table Create SQL
CREATE TABLE report_log
(
    `idx`              INT            NOT NULL    AUTO_INCREMENT COMMENT '고유 인덱스', 
    `update_at`        TIMESTAMP      NULL        DEFAULT current_timestamp COMMENT '액션한 시간', 
    `db_action`        VARCHAR(45)    NULL        COMMENT 'CRUD행동', 
    `report_category`  VARCHAR(45)    NULL        COMMENT '신고 종류', 
    `report_id`        INT            NULL        COMMENT '신고 아이디', 
    `user_id_fk`       INT            NULL        COMMENT '신고 유저 아이디', 
    `report_idx`       INT            NULL        COMMENT '신고 댓글,게시글 아이디', 
    `report_content`   TEXT           NULL        COMMENT '신고 사유', 
    `report_status`    TEXT           NULL        COMMENT '신고 상태', 
     PRIMARY KEY (idx)
);

ALTER TABLE report_log COMMENT '신고 로그';


