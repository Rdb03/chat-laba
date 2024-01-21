import React from 'react';
import { Box } from '@mui/material';

interface Props {
  author: string;
  message: string;
  id: string;
}

const MessageItem: React.FC<Props> = ({author, message, id}) => {
  return (
    <Box>
      <p>{author}</p>
      <p>{message}</p>
    </Box>
  );
};

export default MessageItem;