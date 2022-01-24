import { IGithubAccount } from './github-account';
import { IProjectCommitInfo } from './project';

export interface IGithubProject {
  url: string;
  fullName: string;
  name: string;
  description: string;
  size: number;
  owner: IGithubAccount;
  commits: IProjectCommitInfo[];
  createdAt: Date;
  updatedAt: Date;
}
