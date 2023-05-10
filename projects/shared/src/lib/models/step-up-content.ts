import { IUserInfo } from './user-info';

export interface IStepUpContent {
  _id?: string;
  subject: string;
  title: string;
  content: string;
  hits?: number;
  writer?: IUserInfo;
  createdAt?: Date;
  updatedAt?: Date;
}
