import * as React from 'react';
import connector from 'connector';
import ChannelDisplay from './Channel';
import {AuthInterface } from 'auth';


interface Props {
  auth: AuthInterface
}

interface State {
  channels: any[];
}

interface ConnectionData {
  data: string;
}

export default class ChatChannels extends React.Component<Props, State> {
  service: any;

  constructor(props: any) {
    super(props);

    this.state = {
      channels: [
        {name: 'General'}
      ],
    };

    this.service = new connector(props.auth);
  }

  render() {
    return (
      <div style={{padding: '0 24px'}}>
        <h3>Channels</h3>
        {this.state.channels.map((channel, i) => {
          return (<ChannelDisplay key={i} {...channel} />)
        })}
      </div>
    );

  }
}

