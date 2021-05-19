import { environment as env } from '../../../../global/environments/environment.prod';

export const environment = {
  ...env,
  loginPageUrl: '/account/login'
};
