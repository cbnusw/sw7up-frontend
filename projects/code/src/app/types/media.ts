import { IProjectFile } from './project-file';

export interface IMedia {
  link: string | null;        // 이미지 또는 동영상 링크(동영상은 유투브만)
  file: IProjectFile | null;  // 업로드한 파일(이미지만)
}
