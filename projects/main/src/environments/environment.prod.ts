import { environment as env } from '../../../../global/environments/environment.prod';
import { URLS } from '../app/constants/urls';

export const environment = {
  ...env,
  loginPageUrl: URLS.ACCOUNT.LOGIN,
  baseUrl: 'https://sw7up.cbnu.ac.kr',
  baseTitle: '충북대학교 SW중심대학사업단',
  codeUrl: 'https://sw7up.cbnu.ac.kr/project/'
};
