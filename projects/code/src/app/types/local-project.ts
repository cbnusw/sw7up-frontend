import { IUserInfo } from 'shared';
import { IMedia } from './media';
import { IProjectFile, TEntryList, TSelectableEntryList } from './project-file';
import { IProjectTeam } from './project-team';

export const SEMESTERS = [null, '1학기', '여름학기', '2학기', '겨울학기'] as const;
export declare type TSemester = typeof SEMESTERS[number];

export interface IProjectDocument {
  name: string;     // 문서명
  file: IProjectFile;
}

export interface IProjectMeta {
  language: string;
  files: number;
  codes: number;
  comments: number;
}

export interface IProjectSubject {
  name: string;       // 교과목 명
  code: string;       // 교과목 번호(교과목번호-분반 형식)
  professor: string;  // 담당교수
  year: number;
  semester: TSemester;  // 학기 정보
}

export interface IProjectOss {
  name: string;         // OSS 이름
  link: string;         // OSS 링크(대표 URL, 깃헙 또는 홈페이지)
  license: string;      // OSS 라이선스
  description: string;  // OSS 설명(활용한 내용 등)
}

export interface ILocalProject {
  _id?: string;
  banners: IMedia[];
  name: string;                                           // 프로젝트명
  subject: IProjectSubject;                               // 교과목 정보
  grade: number;                                          // 학년 정보
  source: TSelectableEntryList | TEntryList;                                     // 소스 코드
  meta: IProjectMeta[];                                   // 프로젝트 메타 정보
  ossList: IProjectOss[];
  team: IProjectTeam;
  documents: IProjectDocument[];
  creator: IUserInfo;
  createdAt: Date;
  updatedAt: Date;
}

