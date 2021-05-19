import { IFile } from './file';
import { IUserInfo } from './user-info';

export interface IResource {
  _id?: string;
  title?: string;
  content?: string;
  attachments?: Array<IFile>;
  writer?: IUserInfo;
  createdAt?: Date;
  updatedAt?: Date;
}
