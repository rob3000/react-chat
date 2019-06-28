import * as React from 'react';

interface ImageProps {
  src: string,
  alt: string,
  circle?: boolean,
}

const Image: React.SFC<ImageProps> = (props) => {

  let styles;

  if (props.circle) {
    styles = {
      borderRadius: '50%',
      display: 'block',
      maxWidth: '100%',
      width: '100%',
    }
  }
  return(<img src={props.src} alt={props.alt} style={styles} />)
}

export default Image;
