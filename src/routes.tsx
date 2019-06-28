import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Callback from 'auth/callback';
import { AuthContextProvider, AuthContextConsumer } from 'auth/authContext';
import { Auth, AuthInterface } from 'auth';
import history from './browserHistory';

const auth: AuthInterface = new Auth();

interface NextState {
  location: any;
}

interface Props {
  user: AuthInterface
}

const handleAuthentication = async (nextState: NextState, auth: AuthInterface) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    await auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <AuthContextProvider value={auth}>
        <AuthContextConsumer>
          {appContext => appContext && (
            <div>
              <Route path="/" exact render={(props: any) => {
                  if (auth.isAuthenticated()) {
                    return <App {...props} />
                  }
                  appContext.login();
              }}/>
              <Route path="/callback" render={(props: any) => {
                handleAuthentication(props, appContext);
                return <Callback {...props} />
              }}/>
            </div>
          )}
        </AuthContextConsumer>
      </AuthContextProvider>
    </Router>
  );
}
