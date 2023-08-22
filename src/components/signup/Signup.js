import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, useAsyncError, useNavigate  } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { baseUrl } from '../../constant/base';
import { CircularProgress } from '@mui/material';
import VerifyEmail from '../verify-email/Verify-email';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate(); // Initialize useNavigate  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isActive , setIsActive] = useState(false);
  const handleSignUp = async () => {
    try {
      setIsLoading(true); 
      const response = await axios.post(`${baseUrl}/auth/signup`, {
        email,
        password,
      });
      
      setOTP(response.data.otp); 
      alert("Please active account in gmail");
    } catch (error) {
      if(error.response.status == 400){
        setIsLoading(false);
        alert("Email has been used");
        navigate("/auth/signup")
      }
    }
  };
  const handleResendEmail = async () => {
    try {
      const response = await axios.post(`${baseUrl}/auth/resend-email`, {
        email : email,
      });
      if(response.data){
        setIsActive(true);
      }
    }
    catch (err){
      setError('Sign-up failed. Please try again.');
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          { isLoading == true ? 
          (<Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                Verify your account by click link in your email : {email}.If you are not receive email, please try to resend email by the link
                <Link onClick={handleResendEmail}>Resend Email</Link>
            </Box>
          ) : <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSignUp}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="http://localhost:3006/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}