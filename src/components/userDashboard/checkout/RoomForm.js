import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm({setRooms}) {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRooms((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Room
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Bathroom"
            name="Bathroom"
            label="Number of Bathroom"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Diningroom"
            name='Diningroom'
            label="Number of Dinning room"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Livingroom"
            name='Livingroom'
            label="Number of Livingroom"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Bedroom"
            name='Bedroom'
            label="Number of Bedroom "
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
