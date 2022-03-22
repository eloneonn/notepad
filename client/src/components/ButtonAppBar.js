import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Slide,
  Switch,
  TextField,
  useScrollTrigger
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout, removeUser, updatePassword, updateUser } from '../reducers/userReducer';
import { clearNotes } from '../reducers/noteReducer';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { setFilter } from '../reducers/filterReducer';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { setSorter } from '../reducers/sorterReducer';
import { setNotification } from '../reducers/notificationReducer';
import { updatePrefs } from '../services/userprefsService';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@emotion/react';
import { setColorMode } from '../reducers/colorModeReducer';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import AbcIcon from '@mui/icons-material/Abc';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const ButtonAppBar = (props) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const user = useSelector((state) => state.user);
  const sorter = useSelector((state) => state.sorter);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkmode, setDarkmode] = useState(user.darkmode);
  const [autosave, setAutosave] = useState(user.autosave);
  const [myAccountOpen, setMyAccountOpen] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearNotes());
    dispatch(setColorMode('light'));
    setAnchorEl(null);
  };

  const handleSettingsSave = () => {
    setSettingsOpen(false);
    dispatch(setColorMode(darkmode ? 'dark' : 'light'));

    updatePrefs({ darkmode, sorter, autosave }, user.id);
    dispatch(setSorter(sorter));
    dispatch(setNotification('success', 'Settings saved!'));
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm('Are you sure you wish to permanently delete your account and all saved data?')
    ) {
      dispatch(removeUser(oldPassword));
    }
  };

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }));

  return (
    <div>
      <Box key="searchbox" sx={{ flexGrow: 1, zIndex: 10 }}>
        <HideOnScroll {...props}>
          <AppBar>
            <Toolbar
              key="searchtoolbar"
              sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <InputBase
                spellCheck="false"
                value={filter}
                onChange={({ target }) => dispatch(setFilter(target.value))}
                placeholder="Search…"
                key="searchfield"
                sx={{ flexGrow: '1' }}
              />

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={({ currentTarget }) => setAnchorEl(currentTarget)}>
                <SettingsIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                disableScrollLock
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}>
                <MenuItem onClick={() => setSettingsOpen(true)}>Settings</MenuItem>
                <MenuItem onClick={() => setMyAccountOpen(true)}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </Box>

      <Dialog open={myAccountOpen} onClose={() => setMyAccountOpen(false)}>
        <DialogTitle>My account</DialogTitle>

        <List sx={{ width: '100%', maxWidth: 360 }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{user.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        </List>
        <Divider></Divider>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <PasswordIcon fontSize="small" />
            </ListItemIcon>
            <ListItemButton onClick={() => setPasswordDialogOpen(true)}>
              change password
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AbcIcon fontSize="small" />
            </ListItemIcon>

            <ListItemButton onClick={() => setNameDialogOpen(true)}>change name</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon fontSize="small" />
            </ListItemIcon>

            <ListItemButton onClick={() => setEmailDialogOpen(true)}>change email</ListItemButton>
          </ListItem>
        </List>
        <Divider></Divider>

        <Button
          onClick={() => setDeleteDialogOpen(true)}
          size="small"
          sx={{ opacity: '75%', color: 'crimson' }}>
          delete account
        </Button>

        <DialogActions>
          <Button variant="filled" onClick={() => setMyAccountOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={nameDialogOpen} onClose={() => setNameDialogOpen(false)}>
        <DialogTitle>Change name</DialogTitle>
        <TextField
          variant="standard"
          label="enter a new name"
          sx={{ margin: '1em', marginTop: '-1em' }}
          onChange={({ target }) => setNewName(target.value)}></TextField>
        <DialogActions>
          <Button variant="filled" onClick={() => dispatch(updateUser({ ...user, name: newName }))}>
            Confirm
          </Button>
          <Button variant="filled" onClick={() => setNameDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)}>
        <DialogTitle>Change email</DialogTitle>
        <TextField
          variant="standard"
          label="enter a new email"
          sx={{ margin: '1em', marginTop: '-1em' }}
          onChange={({ target }) => setNewEmail(target.value)}></TextField>
        <DialogActions>
          <Button
            variant="filled"
            onClick={() => dispatch(updateUser({ ...user, email: newEmail }))}>
            Confirm
          </Button>
          <Button variant="filled" onClick={() => setEmailDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
        <DialogTitle>Change password</DialogTitle>
        <TextField
          variant="standard"
          type="password"
          label="current password"
          sx={{ margin: '1em', marginTop: '-1em' }}
          onChange={({ target }) => setOldPassword(target.value)}></TextField>
        <TextField
          variant="standard"
          type="password"
          label="new password"
          sx={{ margin: '1em', marginTop: '-0.5em' }}
          onChange={({ target }) => setNewPassword(target.value)}></TextField>
        <DialogActions>
          <Button
            variant="filled"
            onClick={() => dispatch(updatePassword(oldPassword, newPassword))}>
            Confirm
          </Button>
          <Button variant="filled" onClick={() => setPasswordDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <DialogTitle>Settings</DialogTitle>

        <FormControl component="fieldset" variant="standard" sx={{ padding: '2em' }}>
          <FormGroup>
            <FormControlLabel
              control={<Switch onChange={() => setAutosave(!autosave)} checked={autosave} />}
              label="Autosave notes"
            />
            <FormControlLabel
              control={
                <IconButton onClick={() => setDarkmode(!darkmode)}>
                  {darkmode ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              }
              label="Theme mode"
            />
            <FormControlLabel
              control={
                <Select
                  value={sorter}
                  label="Sort by"
                  onChange={({ target }) => dispatch(setSorter(target.value))}>
                  <MenuItem value={'Last created'}>Last created</MenuItem>
                  <MenuItem value={'Last edited'}>Last edited</MenuItem>
                  <MenuItem value={'Alphabetical'}>Alphabetical</MenuItem>
                </Select>
              }
              label="Sort notes by"
            />
          </FormGroup>
        </FormControl>
        <DialogActions>
          <Button variant="filled" onClick={handleSettingsSave}>
            Save settings
          </Button>
          <Button variant="filled" onClick={() => setSettingsOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete account</DialogTitle>
        <TextField
          variant="standard"
          label="enter password"
          type="password"
          sx={{ margin: '1em', marginTop: '-1em' }}
          onChange={({ target }) => setOldPassword(target.value)}></TextField>
        <DialogActions>
          <Button variant="filled" onClick={handleDeleteAccount}>
            Confirm
          </Button>
          <Button variant="filled" onClick={() => setDeleteDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ButtonAppBar;
