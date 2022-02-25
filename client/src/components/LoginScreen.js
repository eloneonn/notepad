import { Avatar, Container, Grid, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/system";
import LoginIcon from '@mui/icons-material/Login';
import React, { useState } from "react";
import { login } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const LoginScreen = () => {
    const dispatch = useDispatch()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading] = useState(false)

    const handleSubmit = async (event) => { //! ILMAN ASYNC/AWAITTIA JA TILAN MYÖHÄISTÄ MUUTTAMISTA
        event.preventDefault()

        setLoading(true)

        await dispatch(login({ email, password }))
                
        setLoading(false)

        setEmail('')
        setPassword('')
    }

    return (
        <Container component="main" maxWidth="xs">
                <Box
                    sx={{ 
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1 }}>
                        <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login to notepad
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, }}>
                        <TextField 
                            margin="normal"
                            fullWidth
                            required
                            name="email"
                            label="Email address"
                            id="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
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
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />

                        <LoadingButton loading={loading} type="submit" size="large" variant="contained" fullWidth sx={{ mt: '2em'}} >login</LoadingButton>

                        <Grid container sx={{ mt: '1em' }}>
                            <Grid item xs>
                                forgot password?
                            </Grid>
                            <Grid item>
                                <Link to="/signup">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
        </Container>
    )
}

export default LoginScreen