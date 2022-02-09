import { IUserInfo } from 'shared';
import { IGithubAccount } from './github-account';
import { IProjectFile, TEntryList } from './project-file';

export const OWN_PROJECT_TYPES = ['공모전', '경진대회', '동아리', '기타'] as const;
export declare type TOwnProjectType = typeof OWN_PROJECT_TYPES[number];
export const SEMESTERS = ['1학기', '여름학기', '2학기', '겨울학기'] as const;
export declare type TSemester = typeof SEMESTERS[number];
export const PROJECT_TYPES = ['교과목프로젝트', '자체프로젝트'] as const;
export declare type TProejctType = typeof PROJECT_TYPES[number];

export interface IProjectBanner {
  link: string;
  file: IProjectFile;
}

export interface IProjectMento {
  name: string;
  organization: string;
  position: string;
}

export interface IProjectSubject {
  name: string;
  professor: string;
  mentoList: IProjectMento[];
}

export interface IOwnProject {
  type: TOwnProjectType;
  professor: string;
  mentoList: IProjectMento[];
}

export interface INotJoinedMember {
  no: string;
  school: string;
  name: string;
  department: string;
}

export interface IProjectMember {
  github: IGithubAccount[];
  joined: IUserInfo[];
  notJoined: INotJoinedMember[];
}

export interface IProjectTeam {
  name: string;             // 팀명
  member: IProjectMember;   // 프로젝트 멤버
}

export interface IProjectMeta {
  language: string;
  files: number;
  codes: number;
  comments: number;
}

export interface IProjectOss {
  name: string;           // OSS 이름
  link: string;           // OSS 링크
  license: string;        // OSS 라이선스
  description: string;    // OSS 설명
}

export interface IProjectDocument {
  name: string;
  file: IProjectFile;
}

export interface IProjectCommitInfo {
  committer: IGithubAccount;
  numOfCommits: number;
}

export interface IProjectRepository {
  url: string;
  fullName: string;
  name: string;
  description: string;
  size: number;
  owner: IGithubAccount;
  commitInfo: IProjectCommitInfo[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject {
  _id?: string;
  banners: IProjectBanner[];      // 프로젝트 소개 영상/이미지
  name: string;                   // 프로젝트명
  grade: number;                  // 프로젝트 수행 당시 학년
  year: number;                   // 프로젝트 수행 연도
  semester: TSemester;            // 프로젝트 수행 학기
  description: string;            // 프로젝트 설명
  projectType: TProejctType;      // 프로젝트 유형
  subject: IProjectSubject;       // 교과목 프로젝트 정보
  ownProject: IOwnProject;        // 자체 프로젝트 정보
  team: IProjectTeam;             // 프로젝트 팀
  isPublic: boolean;              // 공개 프로젝트 여부
  repo: IProjectRepository;       // 프로젝트 리파지터리
  soucreDir: string;              // 소스 파일의 디렉터리 경로
  source: TEntryList;             // 소스 파일
  meta: IProjectMeta[];           // 프로젝트 메타 정보
  ossList: IProjectOss[];         // 오픈소스 사용 정보
  documents: IProjectDocument[];  // 프로젝트 관련 문서
  approvedAt: Date;               // 프로젝트 승인 날짜
  creator: IUserInfo;
  createdAt: Date;
  updatedAt: Date;
}
