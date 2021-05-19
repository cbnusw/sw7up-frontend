import { environment as env } from './environment.shared';

export const environment = {
  production: true,
  ...env,
  authHost: 'https://swauth.cbnu.ac.kr',
  apiHost: 'https://swapi.cbnu.ac.kr',
  apiVersion: 'v1',
  uploadHost: 'https://swupload.cbnu.ac.kr',
  codeHost: 'https://swcode.cbnu.ac.kr',
};
