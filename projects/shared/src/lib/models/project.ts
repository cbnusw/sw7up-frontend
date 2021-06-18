import { IGithubAccount } from './github-account';

export interface IProjectCommit {
  member?: IGithubAccount;
  commit?: number;
}

export interface IProjectConfirm {
  from: Date;
  to: Date;
  commits: Array<IProjectCommit>;
}

export interface IProject {
  _id?: string;
  repository?: string;
  fullName?: string;
  name?: string;
  description?: string;
  size?: number;
  owner?: IGithubAccount;
  members?: Array<IGithubAccount>;
  confirms?: Array<IProjectConfirm>;
  createdAt?: Date;
  updatedAt?: Date;
}
