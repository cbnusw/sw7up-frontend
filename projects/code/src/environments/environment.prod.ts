import { environment as env } from '../../../../global/environments/environment.prod';

export const environment = {
  ...env,
  host: 'https://sw7up.cbnu.ac.kr/code/',
  loginPageUrl: 'https://sw7up.cbnu.ac.kr/account/login'
};
