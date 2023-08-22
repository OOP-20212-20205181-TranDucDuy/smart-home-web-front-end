import * as React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate  } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { baseUrl } from '../../constant/base';
const defaultTheme = createTheme();
export default function VerifyEmail() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get("email");
        const otp = urlParams.get("otp");
        await axios(`${baseUrl}/auth/verify-email?email=${email}&&otp=${otp}`)
        .then((res) => setIsLoading(false))
        .catch((err) => console.log(err));
      }, []);
      return (
        <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            Verify Email
          </Typography>
          <Box>
            {isLoading && <Typography>"Your account was successfully activated"<CircularProgress /></Typography>}
            {!isLoading && (
              <Typography>"Your account was successfully activated"
                 <Link href = 'http://localhost:3006/'></Link>
              </Typography>
             
            )}
            </Box>
          </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
}
