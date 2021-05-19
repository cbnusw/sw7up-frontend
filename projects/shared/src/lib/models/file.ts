import { ACCESS, FILE_TYPES } from '../constants/common';
import { IUserInfo } from './user-info';

export const FILE_ACCESS = [...ACCESS];
export declare type TFileAccess = typeof ACCESS[number];
export declare type TFileType = typeof FILE_TYPES[number];

export interface IFile {
  _id?: string;
  url?: string;                   // 파일 URL
  filename?: string;              // 원본 파일 이름
  mimetype?: string;              // Content-Type
  size?: number;                  // 파일 크기(Bytes)
  access?: TFileAccess[];         // 접근 가능 사용자 유형
  ref?: string;                   // 파일이 참조하는 인스턴스 또는 인스턴스 아이디
  refModel?: TFileType;           // 파일이 참조하는 모델 이름
  uploader?: string | IUserInfo;  // 파일을 업로드한 사용자 또는 사용자 아이디
  uploadedAt?: Date;              // 파일 업로드 날짜
}
