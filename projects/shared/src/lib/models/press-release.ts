import { IUserInfo } from './user-info';

export interface IPressRelease {
  _id?: string;
  title?: string;
  content?: string;
  link?: string;
  hits?: number;
  writer?: IUserInfo;
  createdAt?: Date;
  updatedAt?: Date;
}
