import * as React from 'react';
import connector from 'connector';

const service = new connector();

interface Props {
}

interface State {
  message: string;
}

interface ConnectionData {
    data: string;
}

export default class ChatSend extends React.Component<Props, State> {


  constructor(props: any) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.keyDown = this.keyDown.bind(this);

    this.state = {
      message: '',
    };

  }

  sendMessage() {
    if (this.state.message === '') {
      return;
    }
    service.send(this.state.message);
    this.setState({message: ''});
  }

  handleChange(e: any) {
    this.setState({message: e.target.value});
  }

  keyDown(e: any) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  render() {
    return (
      <div style={{
        padding: '12px',
        display: 'flex',
        position: 'relative',
      }}>
        <input type="text" name="message" value={this.state.message} onChange={this.handleChange} onKeyDown={this.keyDown} style={{
          padding: '10px 12px',
          border: 0,
          width: '100%',
          boxShadow: '2px 5px 15px #dcdbdb',
          paddingRight: '48px',
        }}/>
        <button onClick={this.sendMessage} style={{
          background: '#e91e63',
          padding: '6px 10px',
          border: 0,
          color: '#ffffff',
          position: 'absolute',
          top: '16px',
          right: '20px',
          borderRadius: '50%',
        }}>S</button>
      </div>
    );

  }
}
