export = {
  // Success
  SUCCESS: { isSuccess: true, code: 1000, msg: '성공' },

  // Common
  TOKEN_EMPTY: { isSuccess: false, code: 2000, msg: 'JWT 토큰을 입력해주세요.' },
  TOKEN_VERIFICATION_FAILURE: { isSuccess: false, code: 3000, msg: 'JWT 토큰 검증 실패' },
  TOKEN_VERIFICATION_SUCCESS: { isSuccess: true, code: 1001, msg: 'JWT 토큰 검증 성공' }, // ?

  //Request error
  SIGNUP_REGISTER_EMPTY: { isSuccess: false, code: 2001, msg: '가입경로를 입력해주세요.' },
  SIGNUP_SOCIALID_EMPTY: { isSuccess: false, code: 2002, msg: 'SocialId를 입력해주세요.' },
  SIGNUP_USERNAME_EMPTY: { isSuccess: false, code: 2003, msg: '사용자 이름을 입력해주세요.' },
  SIGNUP_USERNAME_LENGTH: {
    isSuccess: false,
    code: 2004,
    msg: '유저 아이디는 6~20자리를 입력해주세요.',
  },
  SIGNUP_PHONENUMBER_EMPTY: { isSuccess: false, code: 2005, msg: '휴대폰 번호를 입력해주세요.' },
  SIGNUP_PASSWORD_EMPTY: { isSuccess: false, code: 2006, msg: '비밀번호를 입력해주세요.' },
  SIGNUP_PASSWORD_LENGTH: {
    isSuccess: false,
    code: 2007,
    msg: '비밀번호는 6~20자리를 입력해주세요.',
  },
  SIGNUP_BIRTHDAY_EMPTY: { isSuccess: false, code: 2008, msg: '생일을 입력해주세요.' },
  SIGNUP_ACCEPTDATE_EMPTY: { isSuccess: false, code: 2009, msg: '약관 동의 날짜를 입력해주세요.' },

  BOARD_CONTENT_EMPTY: {
    isSuccess: false,
    code: 2010,
    msg: '게시글 내용을 입력해주세요.',
  },

  REPLY_BOARDID_EMPTY: {
    isSuccess: false,
    code: 2011,
    msg: '게시글 번호를 입력해주세요.',
  },

  REPLY_REPLYCONTENT_EMPTY: {
    isSuccess: false,
    code: 2012,
    msg: '댓글을 입력해주세요.',
  },

  REPLY_REPORT_REPORTCONTENT_EMPTY: {
    isSuccess: false,
    code: 2013,
    msg: '댓글 신고 내용을 입력해주세요.',
  },

  BOARD_REPORT_REPORTCONTENT_EMPTY: {
    isSuccess: false,
    code: 2014,
    msg: '게시글 신고 내용을 입력해주세요.',
  },

  BOARD_EDIT_CONTENT_EMPTY: {
    isSuccess: false,
    code: 2015,
    msg: '게시글 수정 내용을 입력해주세요.',
  },

  BOARD_EDIT_CONTENT_LEGNTH: {
    isSuccess: false,
    code: 2016,
    msg: '게시글 내용은 1000자 이하로 입력해주세요.',
  },

  BOARD_NOTHING: {
    isSuccess: false,
    code: 2017,
    msg: '없는 게시글 입니다.',
  },
  BOARD_ALREADY_LIKE: {
    isSuccess: false,
    code: 2018,
    msg: '이미 좋아요를 누른 게시글 입니다.',
  },

  BOARD_ALREADY_UNLIKE: {
    isSuccess: false,
    code: 2019,
    msg: '이미 좋아요 취소한 게시글 입니다.',
  },

  BOARD_LIKE_NOTHING: {
    isSuccess: false,
    code: 2020,
    msg: '좋아요를 누른적이 없는 게시글 입니다.',
  },

  REPLY_NOTHING: {
    isSuccess: false,
    code: 2021,
    msg: '없는 댓글 입니다.',
  },

  REPLY_ALREADY_LIKE: {
    isSuccess: false,
    code: 2022,
    msg: '이미 좋아요를 누른 댓글 입니다.',
  },

  REPLY_ALREADY_UNLIKE: {
    isSuccess: false,
    code: 2023,
    msg: '이미 좋아요를 취소한 댓글 입니다.',
  },

  REPLY_LIKE_NOTHING: {
    isSuccess: false,
    code: 2024,
    msg: '좋아요를 누르적이 없는 댓글 입니다.',
  },

  REPLY_REPORT_SELF: {
    isSuccess: false,
    code: 2025,
    msg: '자신의 댓글에는 신고할수 없습니다.',
  },

  BOARD_REPORT_SELF: {
    isSuccess: false,
    code: 2026,
    msg: '자신의 게시글에는 신고할수 없습니다.',
  },

  BOARD_EDIT_NOT_SELF: {
    isSuccess: false,
    code: 2027,
    msg: '게시글 작성자만 수정이 가능합니다.',
  },

  FOLLOW_NOT_SELF: {
    isSuccess: false,
    code: 2028,
    msg: '자신에게 팔로우는 불가능 합니다.',
  },
  USER_NOTHING: {
    isSuccess: false,
    code: 2029,
    msg: '존재하지 않는 유저입니다.',
  },

  SIGNUP_NAME_EMPTY: { isSuccess: false, code: 2030, msg: '이름을 입력해주세요.' },

  PROFILE_URL_EMPTY: { isSuccess: false, code: 2031, msg: '프로필 URL을 입력해주세요' },

  WEBSITE__EMPTY: { isSuccess: false, code: 2032, msg: '웹 사이트를 입력해주세요' },

  INTRODUCTION_EMPTY: { isSuccess: false, code: 2033, msg: '소개를 입력해주세요' },

  CHANGE_USER_NAME_OVER: { isSuccess: false, code: 2034, msg: '14일 이내에 2번 변경하였습니다.' },

  CHANGE_USER_STATUS_EMPTY: { isSuccess: false, code: 2035, msg: '유저 상태를 입력해주세요.' },

  USER_STATUS_WRONG: {
    isSuccess: false,
    code: 2036,
    msg: '유저 상태는 PRVIATE , ACTIVE , DELETE 만 가능합니다.',
  },

  FOLLOW_PRIVATE_ALREADY: {
    isSuccess: false,
    code: 2037,
    msg: '이미 팔로우를 요청했습니다.',
  },

  REPLY_DELETE_CAN_SELF: {
    isSuccess: false,
    code: 2038,
    msg: '자신의 댓글만 삭제 할수있습니다.',
  },

  MESSAGE_EMPTY: {
    isSuccess: false,
    code: 2039,
    msg: '메세지를 입력해주세요.',
  },

  MESSAGE_LENGTH: {
    isSuccess: false,
    code: 2040,
    msg: '메세지는 200자 이하로만 입력 가능합니다.',
  },

  // Response error
  REFRESH_TOKEN_NOTHING: {
    isSuccess: false,
    code: 3001,
    msg: 'Refresh_Token 이 없습니다.',
  },
  LOGIN_FAIL: {
    isSuccess: false,
    code: 3002,
    msg: '아이디 혹은 비밀번호를 확인해주세요.',
  },

  SIGNUP_REDUNDANT_USER_NAME: { isSuccess: false, code: 3001, msg: '중복된 사용자 이름입니다.' },
  SIGNUP_REDUNDANT_NICKNAME: { isSuccess: false, code: 3002, msg: '중복된 닉네임입니다.' },

  SIGNIN_EMAIL_WRONG: { isSuccess: false, code: 3003, msg: '아이디가 잘못 되었습니다.' },
  SIGNIN_PASSWORD_WRONG: { isSuccess: false, code: 3004, msg: '비밀번호가 잘못 되었습니다.' },
  SIGNIN_INACTIVE_ACCOUNT: {
    isSuccess: false,
    code: 3005,
    msg: '비활성화 된 계정입니다. 고객센터에 문의해주세요.',
  },
  SIGNIN_WITHDRAWAL_ACCOUNT: {
    isSuccess: false,
    code: 3006,
    msg: '탈퇴 된 계정입니다. 고객센터에 문의해주세요.',
  },

  FOLLOW_NOTHING: {
    isSuccess: false,
    code: 3007,
    msg: '팔로우 요청 기록이 없습니다.',
  },
  PRIVATE_USER: {
    isSuccess: false,
    code: 3008,
    msg: '비공개 계정입니다.',
  },
  //Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 4000, msg: '데이터 베이스 에러' },
  SERVER_ERROR: { isSuccess: false, code: 4001, memsgssage: '서버 에러' },
};
