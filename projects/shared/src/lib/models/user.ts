import { PERMISSIONS, ROLES, MAJORS } from '../constants/common';
import { IUserInfo } from './user-info';

export declare type TUserRole = typeof ROLES[number];
export declare type TUserPermission = typeof PERMISSIONS[number];
export declare type TMajor = typeof MAJORS[number];

export interface IUser {
  _id?: string;
  no?: string;                      // 사용자 학번 또는 교직원 번호(로그인시 사용)
  password?: string;                // 비밀번호
  role?: TUserRole;                 // 사용자 역할(관리자: 'admin', 운영자: 'operator', 학생: 'student', 교직원: 'staff'
  permissions?: TUserPermission[];  // 사용자 접근 권한
  info?: IUserInfo;
}
