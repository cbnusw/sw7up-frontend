import { QNA_CATEGORIES } from '../constants/common';
import { IUserInfo } from './user-info';

export const E_HELP_CATEGORIES = QNA_CATEGORIES;
export declare type TEHelpCategory = typeof QNA_CATEGORIES[number];

export interface IQnaWriter {
  name?: string;
  department?: string;
  email?: string;
}

export interface IQnaReply {
  _id?: string;
  content?: string;
  writer?: IUserInfo;
  writerInfo?: IQnaWriter;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQna {
  _id?: string;
  category?: TEHelpCategory;
  title?: string;
  content?: string;
  password?: string;
  writer?: IUserInfo;
  writerInfo?: IQnaWriter;
  confirm?: boolean;
  permission?: boolean;
  replies?: Array<IQnaReply>;
  createdAt?: Date;
  updatedAt?: Date;
}
