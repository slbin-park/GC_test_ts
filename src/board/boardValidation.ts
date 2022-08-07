import express, { Request, Response, NextFunction } from 'express';
import baseResponse from '../config/baseResponse';

const post_board_vali = (req: Request, res: Response, next: NextFunction) => {
  const { board_content } = req.body;

  if (!board_content) {
    res.send(baseResponse.BOARD_CONTENT_EMPTY);
    return;
  } else if (board_content.length > 1000) {
    res.send(baseResponse.BOARD_EDIT_CONTENT_LEGNTH);
  }
  next();
};

const post_reply_vali = (req: Request, res: Response, next: NextFunction) => {
  const { board_id, reply_content } = req.body;

  if (!board_id) {
    res.send(baseResponse.REPLY_BOARDID_EMPTY);
  } else if (!reply_content) {
    res.send(baseResponse.REPLY_REPLYCONTENT_EMPTY);
  } else {
    // 모든 데이터 다 있을경우 넘김
    next();
  }
};

const post_reply_like_vali = (req: Request, res: Response, next: NextFunction) => {
  const { board_id } = req.body;
  if (!board_id) {
    res.send(baseResponse.REPLY_BOARDID_EMPTY);
  } else {
    // 모든 데이터 다 있을경우 넘김
    next();
  }
};

const post_reply_report_vali = (req: Request, res: Response, next: NextFunction) => {
  const { report_content } = req.body;
  if (!report_content) {
    res.send(baseResponse.REPLY_REPORT_REPORTCONTENT_EMPTY);
  } else {
    next();
  }
};

const post_board_report_vali = (req: Request, res: Response, next: NextFunction) => {
  const { report_content } = req.body;
  if (!report_content) {
    res.send(baseResponse.BOARD_REPORT_REPORTCONTENT_EMPTY);
  } else {
    next();
  }
};

const put_board_edit_vali = (req: Request, res: Response, next: NextFunction) => {
  const { board_content } = req.body;
  if (!board_content) {
    res.send(baseResponse.BOARD_EDIT_CONTENT_EMPTY);
  } else if (board_content.length > 1000) {
    res.send(baseResponse.BOARD_EDIT_CONTENT_LEGNTH);
  } else {
    next();
  }
};

export {
  post_board_vali,
  post_reply_vali,
  post_reply_report_vali,
  post_board_report_vali,
  put_board_edit_vali,
  post_reply_like_vali,
};
