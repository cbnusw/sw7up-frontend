import { IUserInfo } from 'shared';

export interface IGithubAccount {
  _id?: string;
  username: string;
  accessToken: string;
  user: IUserInfo;
  createdAt: Date | null;
  updatedAt: Date | null;
}
