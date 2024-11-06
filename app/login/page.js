'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography, Container, Paper, Fade } from "@mui/material";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
        setTimeout(() => {
          location.reload();
        }, 500);
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const handleDemoLogin = () => {
    setUsername('demoUser');
    setPassword('password123');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Fade in timeout={800}>
        <Paper elevation={3} sx={{ p: 4, m: 2 }}>
          <Typography
            variant="h4"
            sx={{ fontFamily: "Kanit, sans-serif", textAlign: 'center', mb: 3, color: '#388e3c' }}
            gutterBottom
          >
            Login
          </Typography>

          <Typography variant="body2" sx={{ fontFamily: "Kanit, sans-serif", textAlign: 'center', color: '#616161', mb: 2 }}>
            Demo Username: <strong>demoUser</strong><br />
            Demo Password: <strong>password123</strong>
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                fontFamily: "Kanit, sans-serif",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#7FC8A9" },
                  "&:hover fieldset": { borderColor: "#4caf50" },
                  "&.Mui-focused fieldset": { borderColor: "#388e3c" },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                fontFamily: "Kanit, sans-serif",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#7FC8A9" },
                  "&:hover fieldset": { borderColor: "#4caf50" },
                  "&.Mui-focused fieldset": { borderColor: "#388e3c" },
                },
              }}
            />
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            <Box textAlign="center" sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  fontFamily: "Kanit, sans-serif",
                  backgroundColor: "#388e3c",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#2e7d32" },
                  px: 5,
                  py: 1.5,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)"
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </form>

          <Box textAlign="center" sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleDemoLogin}
              sx={{
                fontFamily: "Kanit, sans-serif",
                color: "#388e3c",
                borderColor: "#388e3c",
                transition: "transform 0.3s",
                "&:hover": {
                  backgroundColor: "#e8f5e9",
                  borderColor: "#2e7d32",
                  transform: "scale(1.05)"
                },
              }}
            >
              Use Demo Credentials
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}
