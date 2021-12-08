import { IUserInfo } from 'shared';
import { ILocalProject } from './local-project';
import { IPublicProject } from './public-project';

export interface IProjectType {
  'LocalProject': ILocalProject;
  'PublicProject': IPublicProject;
}

export interface IProjectTeam {
  _id?: string;
  name: string;               // 팀이름
  members: IUserInfo[]; // 팀원
  creator?: IUserInfo;  // 팀 생성자
  createdAt?: Date;           // 팀 생성일
  updatedAt?: Date;           // 팀 수정일
}
