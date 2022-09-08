import { environment as env } from './environment.shared';

export const environment = {
  production: false,
  ...env,
  authHost: 'http://auth.sw7up.local',
  apiHost: 'http://api.sw7up.local',
  apiVersion: 'v1',
  uploadHost: 'http://upload.sw7up.local',
  codeHost: 'http://code.sw7up.local',
};
