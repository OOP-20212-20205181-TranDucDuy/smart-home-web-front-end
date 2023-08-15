import * as React from 'react';
import { useState,useEffect } from 'react';
import Title from './Title';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Dashboard from './Dashboard';
const accessToken = localStorage.getItem('accessToken');

export default function Profile() {
  
  return (
    <React.Fragment>
      <Title>Profile</Title>
      <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 8,
        boxShadow: 2,
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Avatar
        alt="User Avatar"
        src={"https://img.meta.com.vn/Data/image/2022/06/16/avatar-vo-dien-hinh-nen-vo-dien-1.jpg"}
        sx={{
            width: { xs: 100, md: 120 },
            height: { xs: 100, md: 120 },
            marginBottom: { xs: 2, md: 0 },
            marginRight: { xs: 0, md: 2 },
            borderRadius: '50%',
            margin: '0 16px 0 0',
            border: '2px solid #ccc',
          }}
      />
      <Box
        sx={{
            border: '2px solid #ccc', 
            padding: 2, 
            borderRadius: 8, 
          }}>
        <Typography variant="h6" gutterBottom>
          John Doe
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a sem
          sit amet enim egestas maximus non sed libero.
        </Typography>
      </Box>
    </Box>
    </React.Fragment>
  );
}
