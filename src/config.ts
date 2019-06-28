declare var process : {
  env: {
    REACT_APP_AUTH0_DOMAIN: string,
    REACT_APP_AUTH0_CLIENTID: string,
    REACT_APP_AUTH0_REDIRECTURI: string,
    REACT_APP_AUTH0_RESPONSETYPE: string,
    REACT_APP_AUTH0_SCOPE: string,
  }
}

export default {
  auth0: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENTID,
    redirectUri: process.env.REACT_APP_AUTH0_REDIRECTURI,
    responseType: process.env.REACT_APP_AUTH0_RESPONSETYPE,
    scope: process.env.REACT_APP_AUTH0_SCOPE
  }
};
