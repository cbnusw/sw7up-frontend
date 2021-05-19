import { IUserInfo } from './user-info';

export interface INewsletter {
  _id?: string;
  title?: string;       // * 제목
  yearMonth?: string;   // * 기사 년월(2020년 4월호일 경우 202004)
  content?: string;     // 본문(서버에서 자동으로 생성, index.html 내용)
  link?: string;        // 뉴스레터 링크(서버에서 자동으로 생성)
  hits?: number;        // 조회수
  writer?: IUserInfo;   // 작성자
  file?: File;          // * 뉴스레터 압축 파일(zip 형식, 압축 파일의 최상위에 index.html 필수)
  createdAt?: Date;     // 작성일
  updatedAt?: Date;     // 수정일
}
