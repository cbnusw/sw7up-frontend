import { IGithubAccount } from 'shared';
import { ILocalProject } from './local-project';

export interface IGitCommit {
  member: IGithubAccount;
  commit: number;
}

export interface IGithubRepo {
  url: string;
  fullName: string;
  name: string;
  description: string;
  size: number;
  owner: IGithubAccount;
  commits: IGitCommit[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPublicProject extends ILocalProject {
  repo: IGithubRepo;
}
