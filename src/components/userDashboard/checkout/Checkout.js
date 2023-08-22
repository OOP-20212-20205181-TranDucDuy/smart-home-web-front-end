import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './RoomForm';
import Review from './Review';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../constant/base';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Home address', 'Room', 'Review your home'];



export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [home, setHomeId] = useState("");
  const [addressFormData, setAddressFormData] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [rooms, setRooms] = useState({
    Bathroom : '',
    Diningroom : '',
    Livingroom : '',
    Bedroom : '',
  });
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleAddHome = async () => {
    await axios.post(`${baseUrl}/home`,{
      address : Object.values(addressFormData).join(', '),

    }).then(res => {
      setHomeId(res.data.id)
    })
    .catch(err => {
      console.log(err)
    })
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm  setAddressFormData={setAddressFormData}/>;
      case 1:
        return <PaymentForm setRooms ={setRooms}/>;
      case 2:
        return <Review addressFormData={addressFormData} rooms = {rooms}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            ADD HOME
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your requirements.
              </Typography>
              <Typography variant="subtitle1">
                Your home number is #{home}. We have notice your home
                confirmation, and will send you an update homes list
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, setAddressFormData, addressFormData , setRooms , rooms)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
              {activeStep === steps.length - 1 ?
                <Button
                  variant="contained"
                  onClick={() => {
                    handleNext();
                    handleAddHome();
                  }}
                  sx={{ mt: 3, ml: 1 }}
                >
                 Add Home
                </Button> : 
                <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
               Next
              </Button>}
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
