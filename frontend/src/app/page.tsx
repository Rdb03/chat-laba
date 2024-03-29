'use client';
import { Box, CircularProgress, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosApi from '@/axiosApi';
import { Messages, MessagesMutation } from '@/type';
import MessageItem from '@/components/MessageItem/MessageItem';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Home() {
  const [state, setState] = useState<MessagesMutation>({
    author: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      let url = '/messages?datetime=';

      if (messages && messages.length) {
        url = url + messages[messages.length - 1].dateTime;
      }

      const messagesResponse = await axiosApi.get<Messages[]>(url);
      return messagesResponse.data;
    },
    staleTime: 2000,
    refetchInterval: 3000,
  });

  const mutation = useMutation({
    mutationFn: async (messageData: MessagesMutation) => {
      setLoading(true);
      await axiosApi.post('/messages', messageData);
      setLoading(false);
    },
  });

  const onSubmit = () => {
    mutation.mutate(state);
    setState(prevState => ({
      ...prevState,
      message: '',
    }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  let messageArea: React.ReactNode = <CircularProgress/>;

  if (!isLoading && messages) {
    messageArea = messages.map(message => (
      <MessageItem
        message={message}
        key={message.id}
      />
    ));
  }

  return (
    <>
      <Grid
        display="grid"
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          background: 'white',
        }}
        width="800px"
        height="600px"
        padding="20px"
        margin="200px auto"
        border="1px solid grey"
      >
        <Grid
          sx={{
            border: '1px solid grey',
            height: '400px',
            marginBottom: '20px',
            background: 'white',
            overflowY: 'auto'
          }}
        >
          {messages?.length !== 0 && messageArea}
        </Grid>
        <form
          onSubmit={submitFormHandler
          }
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2, alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <TextField
              sx={{
                width: '150px'
              }}
              required
              id="author"
              name="author"
              value={state.author}
              label="Author"
              variant="standard"
              type="text"
              onChange={inputChangeHandler}
            />
            <TextField
              sx={{
                width: '450px'
              }}
              required
              id="message"
              type="text"
              name="message"
              value={state.message}
              label="Message"
              onChange={inputChangeHandler}
            />
            <LoadingButton
              type="submit"
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Send</span>
            </LoadingButton>
          </Box>
        </form>
      </Grid>
    </>
  );
}
