import { Avatar, Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LoginIcon from '@mui/icons-material/Login';
import React, { useState } from "react";
import { login } from "../reducers/userReducer";
import { useDispatch } from "react-redux";


const LoginScreen = () => {
    const dispatch = useDispatch()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(login({ email, password }))
        
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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

                        <Button type="submit" size="large" variant="contained" fullWidth sx={{ mt: '2em'}} >login</Button>
                    </Box>
                </Box>
        </Container>
    )
}

export default LoginScreen