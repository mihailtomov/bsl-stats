import React from 'react';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  url: string;
  text: string;
}

const Link: React.FC<Props> = ({ url, text, title }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" title={title}>
      {text}
    </a>
  );
};

export default Link;
