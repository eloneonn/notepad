import { Avatar, Box, Container, Grid, TextField, Typography } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../reducers/userReducer";

const SignupScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ newFirstName, setNewFirstName ] = useState('')
    const [ newLastName, setNewLastName ] = useState('')
    const [ newEmail, setNewEmail ] = useState('')
    const [ newPassword, setNewPassword ] = useState('')
    const [ loading, setLoading] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault()
        
        setLoading(true)

        const newUser = {
            name: newFirstName + ' ' + newLastName,
            email: newEmail,
            password: newPassword
        }

        if (await dispatch(createUser(newUser))) {
            console.log('user created!');
            setLoading(false)

            navigate('/')
        } else {
            console.log('user creation failed');
            setLoading(false)
        }
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
                        <AddCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create a new user
                    </Typography>


                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, }}>
                        <Grid container>
                            <Grid item xs sx={{ mr: '1em'}}>
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
                            value={newPassword}
                            onChange={({ target }) => setNewPassword(target.value)}
                        />

                        <LoadingButton loading={loading} type="submit" size="large" variant="contained" fullWidth sx={{ mt: '2em'}} >Create account</LoadingButton>

                        <Grid container sx={{ mt: '1em' }}>
                            <Grid item xs>
                                
                            </Grid>
                            <Grid item>
                                <Link to="/">
                                    {"Already have an account? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
        </Container>
    )
}

export default SignupScreen