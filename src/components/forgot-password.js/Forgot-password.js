import React, { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BASE_URL = 'http://localhost:3000/api/v2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
        email,
      });

      setMessage(response.data.message);
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleForgotPassword}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Send Reset Link'}
      </Button>
      {message && (
        <Typography className="message" variant="body1" color="error">
          {message}
        </Typography>
      )}
    </div>
  );
};

export default ForgotPassword;
