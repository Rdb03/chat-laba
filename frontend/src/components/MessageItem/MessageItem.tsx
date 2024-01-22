import React from 'react';
import { Box } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Messages } from '@/type';

interface Props {
 message: Messages,
}

const MessageItem: React.FC<Props> = ({message}) => {
  return (
    <Box sx={{
      border: '1px solid black',
      borderRadius: '7px',
      width: '300px',
      margin: '20px 10px',
      padding: '5px',
      boxSizing: 'border-box'
    }}>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <PermIdentityIcon/>
        <p style={{marginLeft: '5px'}}>{message.author}</p>
      </Box>
      <p style={{margin: "0"}}>{message.dateTime}</p>
      <p>{message.message}</p>
    </Box>
  );
};

export default MessageItem;