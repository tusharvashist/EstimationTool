export const msalConfig = {
    auth: {
        clientId:'075e40a5-b61b-4307-894b-ed4aa07f0bd4',
        authority:'https://login.microsoftonline.com/154602d9-9568-4e83-80c9-a6b3e2161283',
        redirectUri:'http://localhost:3000'
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
}

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"]
   };
   
   // Add the endpoints here for Microsoft Graph API services you'd like to use.
   export const graphConfig = {
       graphMeEndpoint: "http://localhost:5252/api/v1/user/login"
   };