import { SharedConfig } from '../shared-config';
import { RequestBase } from './request-base';

export class ApiBase extends RequestBase {
  constructor(config: SharedConfig,
              basePath: string) {
    super(config.apiHost);
    this.baseUrl = `${this.baseUrl}/${config.apiVersion}${basePath}`;
  }
}
