// 부조리 신고 댓글(*는 클라이언트에서 보내야 하는 정보)
import { IUserInfo } from './user-info';

export interface ICorruptionReportReply {
  _id?: string;
  content?: string;   // * 내용
  writer?: IUserInfo; // 작성자
  createdAt?: Date;   // 작성일
}

export interface ICorruptionReport {
  _id?: string;
  title?: string;                           // * 제목
  content?: string;                         // * 본문
  writer?: IUserInfo;                       // 작성자
  replies?: Array<ICorruptionReportReply>;  // 댓글 목록
  createdAt?: Date;                         // 작성일
  updatedAt?: Date;                         // 수정일
}
