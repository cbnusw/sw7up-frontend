import { IGithubAccount } from './github-account';

export interface IGithubRepo {
  url: string;
  fullName: string;
  name: string;
  description: string;
  size: number;
  owner: IGithubAccount;
  createdAt: Date;
  updatedAt: Date;
}
