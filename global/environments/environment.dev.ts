import { environment as env } from './environment.shared';

export const environment = {
  production: false,
  ...env,
  authHost: 'http://localhost:3000',
  apiHost: 'http://localhost:3001',
  apiVersion: 'v1',
  uploadHost: 'http://localhost:3002',
  codeHost: 'http://localhost:3003',
};
