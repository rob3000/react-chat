import * as React from 'react';

interface ContainerProps {
  children: any
}

const Container: React.SFC<ContainerProps> = (props) => {
  return (<div className="grid" style={{
    display: 'flex',
    flexWrap: 'nowrap',
  }}>
    {props.children}
  </div>)
}

export default Container;
