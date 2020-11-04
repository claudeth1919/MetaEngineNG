// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
   // search: "https://metaengine.azurewebsites.net/api/v1/search",
    search: "https://192.168.1.135:45455/api/v1/search",
   // answer: "https://metaengine.azurewebsites.net/api/v1/answer",
    answer: "https://192.168.1.135:45455/api/v1/answer",
   // userInteraction: "https://metaengine.azurewebsites.net/api/v1/userInteraction"
    userInteraction: "https://192.168.1.135:45455/api/v1/userInteraction"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
