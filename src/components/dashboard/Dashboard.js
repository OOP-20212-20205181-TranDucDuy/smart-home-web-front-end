import * as React from 'react';
import { useEffect } from 'react';
import { CircularProgress, Paper, Container, Grid , Link ,Badge,IconButton,Divider,Typography,Box, Toolbar,List } from '@mui/material';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { LastListItems, mainListItems, secondaryListItems } from './listItems';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Profile from './Profile';
import { Route, Routes } from 'react-router-dom';
import { AppBar } from '../utils/AppBar';
import { Drawer } from '../utils/Drawer';
import { Logout } from '../logout/Logout'
import Home from './Home';
import Users from './Users';
import videoBg from '../../assets/background.mp4'
import VideoBackground from './BackGround';
import Device from './Device';
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
const defaultTheme = createTheme();
const accessToken = localStorage.getItem('accessToken');
export default function Dashboard() {
  console.log(accessToken)
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') {
      alert('It must be admin account');
      navigate('/');
    }
    if (localStorage.getItem('accessToken') === null) {
      alert('Login in first');
      navigate('/');
    }
  }, []);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={defaultTheme} >
      <Box sx={{ display: 'flex' , flexGrow: 2,}}>
      <VideoBackground /> 
        <CssBaseline /> 
        <AppBar position="absolute" open={open}>
           
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
              {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
            <Divider sx={{ my: 1 }} />
            {LastListItems}
            <Routes>
                <Route path="logout" element={<Logout />} />
            </Routes>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Routes>
                    <Route path="users" element={<Users />} />
                    <Route path="users/profile/:id" element={<Profile />} />
                    <Route path="homes" element={<Home />} />
                    <Route path="devices" element={<Device />} />
                  </Routes>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
} 