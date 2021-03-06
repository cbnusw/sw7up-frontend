import { IFile } from './file';
import { IUserInfo } from './user-info';

export interface IOverseasEducation {
  _id?: string;
  title: string;
  content: string;
  hits: number;
  writer: IUserInfo;
  attachments: Array<IFile>;
  createdAt: Date;
  updatedAt: Date;
}
