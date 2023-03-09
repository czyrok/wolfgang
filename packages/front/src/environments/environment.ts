// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  PROTOCOL: 'http',
  MAIN_URL: 'localhost',
  MAIN_PORT: 5500,
  GAME_URL: 'localhost',
  GAME_PORT: 5501,
  SESSION_COOKIE_NAME: 'sid',
  JWT_COOKIE_NAME: 'token',
  JWT_COOKIE_DURATION: 518400
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
