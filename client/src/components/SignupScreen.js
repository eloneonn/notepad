import { Avatar, Box, Container, Grid, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../services/userService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const SignupScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailDidFail, setEmailDidFail] = useState(false);
  const [passwordDidFail, setPasswordDidFail] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const newUser = {
      name: newFirstName + ' ' + newLastName,
      email: newEmail,
      password: newPassword
    };

    const res = await createUser(newUser);

    if (res.status === 201) {
      setLoading(false);
      dispatch(setNotification('success', 'Account created. You can now log in!'));
      navigate('/');
    } else {
      dispatch(setNotification('error', res.statusText));

      if (res.statusText === 'Invalid password') {
        setPasswordDidFail(true);
        setEmailDidFail(false);
      } else if (res.statusText === 'Invalid email' || res.statusText === 'Email already in use') {
        setEmailDidFail(true);
        setPasswordDidFail(false);
      }
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <AddCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a new account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container>
            <Grid item xs sx={{ mr: '1em' }}>
              <TextField
                margin="normal"
                required
                name="firstname"
                label="First name"
                id="firstname"
                autoComplete="given-name"
                autoFocus
                value={newFirstName}
                onChange={({ target }) => setNewFirstName(target.value)}
              />
            </Grid>
            <Grid item xs>
              <TextField
                margin="normal"
                required
                name="lastname"
                label="Last name"
                id="lastname"
                autoComplete="family-name"
                value={newLastName}
                onChange={({ target }) => setNewLastName(target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            fullWidth
            required
            name="email"
            label="Email address"
            id="email"
            autoComplete="email"
            error={emailDidFail}
            helperText={emailDidFail ? 'Enter a valid email address' : null}
            value={newEmail}
            onChange={({ target }) => setNewEmail(target.value)}
          />

          <TextField
            margin="normal"
            fullWidth
            required
            name="password"
            label="Password"
            id="password"
            type="password"
            autoComplete="current-password"
            error={passwordDidFail}
            helperText={passwordDidFail ? 'Password must be at least 4 characters long' : null}
            value={newPassword}
            onChange={({ target }) => setNewPassword(target.value)}
          />

          <LoadingButton
            loading={loading}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
            sx={{ mt: '2em' }}
          >
            Create account
          </LoadingButton>

          <Grid container sx={{ mt: '1em' }}>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/">{'Already have an account? Login'}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupScreen;
