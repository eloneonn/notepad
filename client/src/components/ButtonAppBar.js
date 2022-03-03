import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem, Slide, useScrollTrigger } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer'
import { clearNotes } from '../reducers/noteReducer';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { setFilter } from '../reducers/filterReducer';
import SettingsIcon from '@mui/icons-material/Settings';

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
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const [ anchorEl, setAnchorEl ] = React.useState(null)
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    event.preventDefault()
    dispatch(setFilter(event.target.value))
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearNotes())
    setAnchorEl(null);
  }

  const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      color: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    }));

  return (
    <Box key="searchbox" sx={{ flexGrow: 1, zIndex: 10 }}>
      <HideOnScroll {...props}>
        <AppBar sx={{ backgroundColor: 'secondary.main' }}>
          <Toolbar key="searchtoolbar">
            <Search sx={{ flexGrow: '1' }} key='search'>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={filter}
                onChange={handleChange}
                placeholder="Search…"
                key='searchfield'
              />
            </Search>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
              sx={{ color:"primary.main" }}
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  );
}

export default ButtonAppBar