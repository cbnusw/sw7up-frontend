// 갤러리 사진(* 는 클라이언트에서 보내야 하는 정보)
import { IUserInfo } from './user-info';

export interface IGalleryPicture {
  url?: string;       // * 사진 이미지 URL
  caption?: string;   // * 사진 caption(옵션)
}

// 갤러리(* 는 클라이언트에서 보내야 하는 정보)
export interface IGallery {
  _id?: string;
  title?: string;                     // * 제목
  pictures?: Array<IGalleryPicture>;  // * 갤러리 사진
  hits?: number;                      // 조회수
  writer?: IUserInfo;                 // 작성자
  createdAt?: Date;                   // 작성일
  updatedAt?: Date;                   // 수정일
}
