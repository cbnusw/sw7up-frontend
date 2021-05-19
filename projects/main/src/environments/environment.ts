// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { environment as env } from '../../../../global/environments/environment.dev';
import { URLS } from '../app/constants/urls';

export const environment = {
  ...env,
  loginPageUrl: URLS.ACCOUNT.LOGIN,
  baseUrl: 'http://localhost:8080',
  baseTitle: '충북대학교 SW중심대학사업단',
  codeUrl: 'http://localhost:8080/code/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
