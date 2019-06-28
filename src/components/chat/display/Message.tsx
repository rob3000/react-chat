import * as React from 'react';

interface Props {
  currentUserId: number;
  message: MessageData;
}

interface State {
  showDetails: boolean;
}

interface MessageData {
  user: number;
  message: string;
  date: string;
  picture: string;
}

export default class MessageDisplay extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      showDetails: false,
    };

    this.showDetails = this.showDetails.bind(this);
  }

  convertDate(dateString: string) {
    var date = new Date(dateString);

    return date.toLocaleString('en-GB');
  }

  showDetails() {
    this.setState({showDetails: !this.state.showDetails})
  }

  render() {
    const message: MessageData = this.props.message;

    const { currentUserId } = this.props;

    let bg;
    let dir;

    switch (message.user) {
      case currentUserId:
        bg = '#03a9f4';
        dir = 'flex-end'
        break;
      case 0:
        bg = '#e91d63';
        dir = 'center';
        break;
      default:
        bg = '#808080';
        dir = 'flex-start';
        break;
    }

    return (
      <div className='message' style={{
        marginBottom: '12px',
        alignSelf: dir,
      }}>
        <span className="message__author" style={{
          display: 'inline-block',
          verticalAlign: 'top',
          width: '35px',
          marginRight: '10px',
        }}>
          {message.picture &&
            <img src={message.picture} style={{
              borderRadius: '50%',
              height: '100%',
              position: 'relative',
              width: '100%',
              zIndex: 1,
            }} alt={'User Picture.'}/>
          }
        </span>
        <span className="message__text"
          onClick={this.showDetails}
          style={{
            background: bg,
            padding: '6px 12px',
            display: 'inline-block',
            borderRadius: '15px'}}
          >
            <span style={{
              display: 'inline-block',
              fontSize: '14px',
            }}>{message.message}</span>
          </span>
          { message.date && this.state.showDetails &&
              <span style={{
                fontSize: 'xx-small',
                color: '#000000',
                display: 'block',
              }}>sent {this.convertDate(message.date)}</span>
            }
        </div>
    );

  }
}

