import React from 'react';

interface Props {
  url: string;
  text: string;
}

const Link: React.FC<Props> = ({ url, text }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
};

export default Link;
