import { IFile } from './file';
import { IUserInfo } from './user-info';

export interface IOverseasEducation {
  _id?: string;
  title: string;
  content: string;
  attachments: Array<IFile>;
  writer: IUserInfo;
  createdAt: Date;
  udpatedAt: Date;
}
