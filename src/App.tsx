import * as React from 'react';
import ChatSend from 'components/chat/send';
import ChatDisplay from 'components/chat/display';
import { Container, Item } from 'layout/grid';
import { AuthContextConsumer } from 'auth/authContext';
import ProfileDisplay from 'components/user/profile';
import ChatChannels from 'components/chat/channels';

interface Props {
}

interface State {
  message: string;
  messageDisplay: string;
}

interface ConnectionData {
    data: string;
}

class App extends React.Component<Props, State> {

  render() {
    return (
      <div className="App">
        <Container>
          <Item width="20%" background='#d7daf2'>
            <div style={{padding: '24px'}}>
              <AuthContextConsumer>
                {authContext => authContext && (
                  <ProfileDisplay auth={authContext} />
                )}
              </AuthContextConsumer>
            </div>
          </Item>
          <Item width="30%" background='#f6f4fc'>
            <AuthContextConsumer>
              {authConext => authConext && (
                <ChatChannels auth={authConext} />
              )}
            </AuthContextConsumer>
          </Item>
          <Item width="50%">
            <AuthContextConsumer>
              {authConext => authConext && (
                <div>
                  <ChatDisplay auth={authConext} />
                  <ChatSend auth={authConext} />
                </div>
              )}
            </AuthContextConsumer>
          </Item>
        </Container>
      </div>
    );

  }
}

export default App;
