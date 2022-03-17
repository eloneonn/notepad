import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Menu,
  MenuItem,
  Select,
  Slide,
  Switch,
  useScrollTrigger
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkmode, setDarkmode] = useState(user.darkmode);
  const [autosave, setAutosave] = useState(user.autosave);
  const sorter = useSelector((state) => state.sorter);
  const theme = useTheme();

  const open = Boolean(anchorEl);

  const handleSelectChange = (event) => {
    dispatch(setSorter(event.target.value));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(setFilter(event.target.value));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearNotes());
    dispatch(setColorMode('light'));
    setAnchorEl(null);
  };

  const handleSettingsOpen = () => {
    handleClose();
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleSettingsSave = () => {
    setSettingsOpen(false);
    dispatch(setColorMode(darkmode ? 'dark' : 'light'));

    updatePrefs({ darkmode, sorter, autosave }, user.id);
    dispatch(setSorter(sorter));
    dispatch(setNotification('success', 'Settings saved!'));
  };

  const handleThemeMode = (event) => {
    event.preventDefault();
    setDarkmode(!darkmode);
  };

  const handleAutosave = (event) => {
    event.preventDefault();
    setAutosave(!autosave);
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
                onChange={handleChange}
                placeholder="Search…"
                key="searchfield"
                sx={{ flexGrow: '1' }}
              />

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}>
                <SettingsIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                disableScrollLock
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}>
                <MenuItem onClick={handleSettingsOpen}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </Box>

      <Dialog fullWidth open={settingsOpen} onClose={handleSettingsClose}>
        <DialogTitle>Settings</DialogTitle>

        <FormControl component="fieldset" variant="standard" sx={{ padding: '2em' }}>
          <FormLabel component="legend"></FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Switch onChange={handleAutosave} checked={autosave} />}
              label="Autosave notes"
            />
            <FormControlLabel control={<Switch />} label="Some setting here" />
            <FormControlLabel
              control={
                <IconButton onClick={handleThemeMode}>
                  {darkmode ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              }
              label="Theme color mode"
            />
            <FormControlLabel
              control={
                <Select value={sorter} label="Sort by" onChange={handleSelectChange}>
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
          <Button variant="filled" onClick={handleSettingsClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ButtonAppBar;
