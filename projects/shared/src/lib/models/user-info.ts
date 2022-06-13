import { CENTERS, UNIVERSITIES } from '../constants/common';
import { IUser, TUserRole } from './user';

export declare type TUserInfoUniversity = typeof UNIVERSITIES[number];
export declare type TUserInfoCenter = typeof CENTERS[number];
export const USER_INFO_CENTERS: TUserInfoCenter[] = CENTERS;

export interface IUserInfo {
  _id?: string;
  image?: string;
  no?: string;
  name?: string;
  email?: string;
  phone?: string;
  department?: string;
  position?: string;
  university?: TUserInfoUniversity;
  center?: TUserInfoCenter;
  role?: TUserRole;
  user?: IUser;
  joinedAt?: Date;
  updatedAt?: Date;
}
