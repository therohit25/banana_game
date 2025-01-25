import { Box, Card, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getPlayerScore } from '../../api/get-players';
import { socket } from '../../helpers/socket';
import { ImageContainer, StyledImage } from '../../style';
import UserLayout from './layout';

const FruitSection = () => {
  const [count, setCount] = useState(0);

  const { data: playerScore } = useQuery({
    queryKey: ['players-score'],
    queryFn: getPlayerScore,
  });

  useEffect(() => {
    if (playerScore) {
      setCount(playerScore.count);
    }
  }, [playerScore]);

  const onClickHandler = () => {
    setCount((prev) => prev + 1);
    socket.emit('click', { count: count + 1 });
    socket.emit('update-score', { score: count + 1 });
  };

  useEffect(() => {
    socket.on('score-updated', (updatedScore) => {
      setCount(updatedScore);
    });

    return () => {
      socket.off('score-updated');
    };
  }, []);

  return (
    <UserLayout>
      <Box
        sx={{
          backgroundColor: '#f4f4f4',
          minHeight: 'calc(100vh - 64px)',
          py: '2rem',
        }}
      >
        <Stack
          direction='column'
          alignItems='center'
          spacing={4}
          sx={{
            maxWidth: '900px',
            mx: 'auto',
            px: 3,
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h3'
            fontWeight='bold'
            sx={{
              color: '#333',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Fruit Game
          </Typography>
          <Card
            sx={{
              width: '100%',
              maxWidth: '600px',
              borderRadius: '16px',
              backgroundColor: '#fff',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              p: 3,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <ImageContainer
              sx={{
                cursor: 'pointer',
                '&:hover img': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease',
                },
              }}
              onClick={onClickHandler}
            >
              <StyledImage
                src='/banana-icon-fruit.webp'
                alt='icon-fruit'
                sx={{
                  width: '150px',
                  height: '150px',
                }}
              />
            </ImageContainer>
            <Stack spacing={2} sx={{ flex: 1 }}>
              <Typography
                variant='h5'
                sx={{
                  color: '#555',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                }}
              >
                Current Score
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                  fontSize: '3rem',
                }}
              >
                {count}
              </Typography>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </UserLayout>
  );
};

export default FruitSection;
