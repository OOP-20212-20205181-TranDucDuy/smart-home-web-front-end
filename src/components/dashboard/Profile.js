import * as React from 'react';
import { useState,useEffect  } from 'react';
import {useParams} from 'react-router-dom'
import Title from './Title';
import {Box,Avatar,Typography,CircularProgress  }  from '@mui/material' ;
import axios from 'axios'
import { baseUrl } from '../../constant/base';
const accessToken = localStorage.getItem('accessToken');
export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(`${baseUrl}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, [id]);
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
          // Additional CSS to cover the entire box
          width: '100%', // Cover the entire width of the parent container
          height: '100%', // Cover the entire height of the parent container
          boxSizing: 'border-box', // Include padding and border in the total width/height
          justifyContent: 'center', // Center content horizontally
          alignItems: 'center', // Center content vertically
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
{userData ? (
         <Box
         sx={{
           // Additional CSS for user information box
           border: '2px solid #ccc',
           padding: 2,
           borderRadius: 8,
           textAlign: 'center', // Center text within the box
           flex: '1', // Allow this box to expand and cover remaining space
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
         }}
       >
          <Typography variant="h6" gutterBottom>
            {userData.profile && userData.profile.name !== null
                ? userData.profile.name
                : ''}
            </Typography>
            {userData.email && (
              <Typography variant="body1">
                Email: {userData.email}
              </Typography>
            )}
            {userData.profile && userData.profile.birth !== null && (
              <Typography variant="body1">
                Birth: {userData.profile.birth}
              </Typography>
            )}
            {userData.profile && userData.profile.address !== null && (
              <Typography variant="body1">
                Address: {userData.profile.address}
              </Typography>
            )}
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Box>
    </React.Fragment>
  );
}
