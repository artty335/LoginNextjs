'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Container, Paper, Button, Box } from "@mui/material";
import jwt from 'jsonwebtoken';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwt.decode(token);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        router.push('/login');
      } else {
        setUsername(decoded.username);
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleCheckTimeLeft = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt.decode(token);
      const timeRemaining = decoded.exp * 1000 - Date.now();
      const minutes = Math.floor(timeRemaining / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes} minutes and ${seconds} seconds remaining`);
    } else {
      setTimeLeft('Token not available.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, m: 2, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{ fontFamily: "Kanit, sans-serif", color: '#388e3c', mb: 2 }}
        >
          Welcome to Your Dashboard
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontFamily: "Kanit, sans-serif", color: '#4caf50' }}
        >
          Hello, {username}!
        </Typography>
        
        {timeLeft && (
          <Typography variant="body1" sx={{ mt: 2, fontFamily: "Kanit, sans-serif", color: '#616161' }}>
            {timeLeft}
          </Typography>
        )}

        <Box display="flex" justifyContent="center" gap={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleCheckTimeLeft}
            sx={{
              fontFamily: "Kanit, sans-serif",
              backgroundColor: "#0277bd",
              color: "#fff",
              "&:hover": { backgroundColor: "#01579b" }
            }}
          >
            Check Time Left
          </Button>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              fontFamily: "Kanit, sans-serif",
              backgroundColor: "#d32f2f",
              color: "#fff",
              "&:hover": { backgroundColor: "#c62828" }
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
