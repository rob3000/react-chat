import * as React from 'react';

interface ChannelProps {
  name: string;
}

const ChannelDisplay: React.SFC<ChannelProps> = (props) => {
  return(
    <div style={{
      padding: '12px ',
      border: '0px',
      width: '100%',
      boxShadow: 'rgb(220, 219, 219) 2px 5px 15px',
      background: '#fff',
      borderRadius: '6px',
    }}>
      {props.name}
    </div>
  )
}

export default ChannelDisplay;
