import express, { Request, Response, NextFunction } from 'express';

// refresh_token이 있는지
const check_reply = (req: Request, res: Response, next: NextFunction) => {
  const { board_id, user_name, reply_content } = req.body;
  // console.log(req.headers);
  // 필요 정보
  // board_id 게시글 아이디
  // user_name 댓글 작성자 아이디
  // reply_content 댓글 내용
  // reply_status 는 처음에 visible 고정
  if (board_id == undefined) {
    res.send('게시글 아이디 없음');
  } else if (user_name == undefined) {
    res.send('댓글 작성자 아이디 없음');
  } else if (reply_content == undefined) {
    res.send('댓글 내용 없음');
  } else {
    // 모든 데이터 다 있을경우 넘김
    next();
  }
};

const check_reply_report = (req: Request, res: Response, next: NextFunction) => {
  const { report_content } = req.body;
  if (report_content == undefined) {
    res.send('신고 내용 없음');
  } else {
    next();
  }
};

const check_board_report = (req: Request, res: Response, next: NextFunction) => {
  const { report_content } = req.body;
  if (report_content == undefined) {
    res.send('신고 내용 없음');
  } else {
    next();
  }
};

const check_board_edit = (req: Request, res: Response, next: NextFunction) => {
  const { board_content } = req.body;
  if (board_content == undefined) {
    res.send('수정 내용 없음');
  } else {
    next();
  }
};
export { check_reply, check_reply_report, check_board_report, check_board_edit };
