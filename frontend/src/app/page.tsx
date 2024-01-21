'use client';
import { Box, Button, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useQuery } from '@tanstack/react-query';
import axiosApi from '@/axiosApi';
import { Messages } from '@/type';

export default function Home() {
  const query = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
     const messagesResponse = await axiosApi.get<Messages[]>('/messages');
     return messagesResponse.data;
    },
  });

  console.log(query.data);

  return (
    <>
      <Grid
        display="grid"
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          background:'white',
      }}
        width="800px"
        height="600px"
        padding="20px"
        margin="200px auto"
        border="1px solid grey"
        overflow='hidden'
      >
        <Grid
          sx={{
            border: '1px solid grey',
            height: '400px',
            marginBottom: '20px',
            background: 'white'
          }}
        >
        </Grid>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
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
              id="standard-read-only-input"
              label="Author"
              defaultValue=""
              variant="standard"
            />
            <TextField
              sx={{
                width: '450px'
              }}
              required
              id="outlined-required"
              label="Message"
              defaultValue=""
            />
            <Button variant="contained">
              Send
              <SendIcon sx={{marginLeft: '10px'}}/>
            </Button>
          </Box>
        </form>
      </Grid>
    </>
  );
}
