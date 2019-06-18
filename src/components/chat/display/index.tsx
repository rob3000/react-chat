import * as React from 'react';
import connector from 'connector';
import MessageDisplay from './Message';

const service = new connector();

interface Props {
}

interface State {
  messages: any[];
}

interface ConnectionData {
  data: string;
}

export default class ChatDisplay extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      messages: [],
    };

    // @todo - update dont really want this here....
    service.connection.onmessage = this.handleIncomingMessage.bind(this);
  }

  handleIncomingMessage(e: ConnectionData) {
    var data = JSON.parse(e.data);
    var items = this.state.messages;

    items.push(data);

    this.setState({
      messages: items,
    })
  }

  render() {
    const items = this.state.messages.map(message => {
      return(<MessageDisplay currentUserId={service.getId()} message={message} />)
    })

    return (
      <div style={{
        backgroundColor: '#f6f4fc',
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontSize: 'calc(10px - 2vmin)',
        color: '#fff',
        padding: '0 6px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}>
          {items}
        </div>
      </div>
    );

  }
}

