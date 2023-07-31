import { IUserInfo } from './user-info';

export interface IStepUpContent {
  _id?: string;
  subject: string;
  title: string;
  tags: string[];
  problem: string;
  solution: string;
  hits?: number;
  writer?: IUserInfo;
  createdAt?: Date;
  updatedAt?: Date;
}
