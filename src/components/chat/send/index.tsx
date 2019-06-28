import * as React from 'react';
import connector from 'connector';
import {AuthInterface } from 'auth';
import SendIcon from 'images/send.svg';

interface Props {
  auth: AuthInterface
}

interface State {
  message: string;
}

interface ConnectionData {
    data: string;
}

export default class ChatSend extends React.Component<Props, State> {
  service: any;

  constructor(props: any) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.keyDown = this.keyDown.bind(this);

    this.service = new connector(props.auth);

    this.state = {
      message: '',
    };

  }

  sendMessage() {
    if (this.state.message === '') {
      return;
    }
    this.service.send(this.state.message);
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
        display: 'flex',
        position: 'relative',
        background: '#f6f4fc',
        padding: '0px 12px 12px',
      }}>
        <input type="text"
          name="message"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyDown={this.keyDown}
          placeholder="Type a message.."
          style={{
            padding: '18px 48px 18px 18px',
            border: 0,
            width: '100%',
            boxShadow: '2px 5px 15px #dcdbdb',
            borderRadius: '6px',
          }}/>
        <button onClick={this.sendMessage} style={{
          background: '#e91e63',
          padding: '6px 10px',
          border: 0,
          color: '#ffffff',
          position: 'absolute',
          top: '8px',
          right: '18px',
          borderRadius: '50%',
          width: '40px',
          height: '35px',
          backgroundImage: `url('${SendIcon}')`,
          backgroundPosition: 'center',
          backgroundSize: '20px',
          backgroundRepeat: 'no-repeat',
        }}></button>
      </div>
    );

  }
}
