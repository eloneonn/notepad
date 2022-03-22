import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MyAccount = ({ openInit }) => {
  const [open, setOpen] = useState(openInit);
  const user = useSelector((state) => state.user);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Settings</DialogTitle>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>{user.name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
      </List>

      <DialogActions>
        <Button variant="filled" onClick={handleClose}>
          Save settings
        </Button>
        <Button variant="filled" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyAccount;
