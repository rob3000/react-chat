import * as React from 'react';

interface ItemProps {
  children: any,
  width: string,
  background?: string,
}

const Item: React.SFC<ItemProps> = (props, children) => {
  return(<div className="grid__item" style={{
    maxWidth: '100%',
    flex: '0 0 auto',
    width: props.width,
    background: props.background
  }}>
    {props.children}
  </div>)
}

export default Item;
