import { IUserInfo } from './user-info';

export interface IGithubAccount {
  _id?: string;
  username?: string;
  accessToken?: string;
  user?: IUserInfo;
  createdAt?: Date;
  updatedAt?: Date;
}
1
