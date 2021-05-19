import { ACCESS, CENTERS } from '../constants/common';
import { IFile } from './file';
import { IUserInfo } from './user-info';

export const NOTICE_CATEGORIES = CENTERS;
export const NOTICE_ACCESS = ACCESS;
export declare type TNoticeCategory = typeof CENTERS[number];
export declare type TNoticeAccess = typeof ACCESS[number];

export interface INotice {
  _id?: string;
  category?: TNoticeCategory;
  title?: string;
  content?: string;
  attachments?: Array<IFile>;
  hits?: number;
  important?: boolean;
  period?: Date;
  access?: Array<TNoticeAccess>;
  writer?: IUserInfo;
  createdAt?: Date;
  updatedAt?: Date;
}
