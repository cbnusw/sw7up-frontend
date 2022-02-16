import { IUserInfo } from 'shared';

export interface IProjectLanguage {
  language: string;
  count: number;
}

export interface ILanguageFilter {
  _id: string;
  name: string;
  creator: IUserInfo;
  createdAt: Date;
}
