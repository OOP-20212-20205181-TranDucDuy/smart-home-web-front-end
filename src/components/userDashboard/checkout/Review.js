import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
const username = localStorage.getItem('name');
export default function Review({addressFormData,rooms}) {
  console.log(addressFormData);
  console.log(rooms);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Home summary
      </Typography>
      <List disablePadding>
        {Object.entries(rooms).map(([roomName, roomCount]) => (
        <ListItem key={roomName} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={roomName} secondary="Room Count" />
          <Typography variant="body2">{roomCount}</Typography>
        </ListItem>
        
        ))}
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Home Address
          </Typography>
          <Typography gutterBottom>{username}</Typography>
          <Typography gutterBottom>  {Object.values(addressFormData).join(', ')}</Typography>
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}
