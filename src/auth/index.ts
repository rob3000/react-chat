import { WebAuth, AuthOptions} from 'auth0-js';
import history from 'browserHistory';
import config from 'config';

interface AuthResult {
  expiresIn?: number | undefined;
  accessToken?: string | undefined;
  idToken?: string | undefined;
}

export interface AuthInterface {
  getAccessToken(): string;
  getProfile(): any;
  handleAuthentication(): Promise<void>;
  isAuthenticated(): boolean;
  login(): void;
  logout(): void;
}

export class Auth implements AuthInterface {
  accessToken: any;
  idToken: any;
  expiresAt: any;
  userProfile: any;

  auth0: WebAuth;
  private _properties: AuthOptions;

  constructor() {

    this._properties = {
      domain: config.auth0.domain,
      clientID: config.auth0.clientID,
      redirectUri: config.auth0.redirectUri,
      responseType: config.auth0.responseType,
      scope: config.auth0.scope
    };

    this.auth0 = new WebAuth({...this._properties});

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  login(): void {
    this.auth0.authorize();
  }

  async handleAuthentication() {
    return this.auth0.parseHash((err: any, authResult: any) => {
      if (authResult && authResult.accessToken! && authResult.idToken!) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() : string {
    return this.accessToken;
  }

  getIdToken() : string {
    return this.idToken;
  }

  setSession(authResult: AuthResult) : void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the Access Token will expire at
    let expiresAt = (authResult.expiresIn! * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken!;
    this.idToken = authResult.idToken!;
    this.expiresAt = expiresAt;
    this.getProfile();

    // navigate to the home route
    history.replace('/home');
  }

  renewSession() : void {
    this.auth0.checkSession({}, (err: any, authResult: AuthResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  logout() : void {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      returnTo: window.location.origin
    });

    // navigate to the home route
    history.replace('/');
  }

  async getProfile() {
    const _this = this;
    return new Promise(function(resolve, reject) {
      if (_this.userProfile || !_this.accessToken) {
        resolve(_this.userProfile);
      }

      _this.auth0.client.userInfo(_this.accessToken, function(err: any, profile: any) {
        if (profile) {
          _this.userProfile = profile;
          resolve(profile);
        }
      })

    })
  }

  isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}

