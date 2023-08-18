import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Logout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/dashboard')
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    setOpen(false); 
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Log Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary">
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Logout;
