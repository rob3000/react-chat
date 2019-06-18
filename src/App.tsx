import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import ChatSend from 'components/chat/send';
import ChatDisplay from 'components/chat/display';

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
    // @todo - wrap this in contxt so they are the same conneciton.
      <div className="App">

        <ChatDisplay />

        <ChatSend />

      </div>
    );

  }
}

export default App;
