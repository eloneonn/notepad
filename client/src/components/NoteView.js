import { AppBar, BottomNavigation, BottomNavigationAction, Container, Grid, IconButton, InputBase, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import CreateButton from "./CreateButton";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import NotesIcon from '@mui/icons-material/Notes';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { removeNote, updateNote } from "../reducers/noteReducer";

const NoteView = ({ note }) => { //! FIXAA BUGI JOSSA TITLE MENEE CONTENTIN PÄÄLLE KUN ON TARPEEKSI PITKÄ
    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => { // Preventing an error when browser refreshes in noteview, instead redirects to main view
        if (!note) {
            navigate('/')
            return null
        } else {
            setContent(note.content)
            setTitle(note.title)
        }
    }, [navigate, note]);

    const handleBackbutton = () => { //! TÄMÄ ON HUONO TAPA
        const newNote = {...note, title: title, content: content}

        dispatch(updateNote(newNote))
        navigate('/')
    }

    const handleRemove = () => {
        dispatch(removeNote(note))
        navigate('/')
    }

    return (
        <Container>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
            >
                <Grid item xs={3} sx={{ mb: '4.5em'}}>
                    <Box sx={{ position: 'fixed', backgroundColor: 'white', zIndex: '100'}}>
                        <AppBar elevation={0} sx={{ backgroundColor: 'white', padding: '0.5em 0.5em 0.5em 0.5em' }}>
                            <Toolbar disableGutters>
                                <IconButton
                                    onClick={handleBackbutton}
                                    size="large"
                                    mr="2"
                                    aria-label="menu"
                                    sx={{ color:"primary.main"}}
                                >
                                    <ArrowBackIcon />
                                </IconButton>  
                                <Typography sx={{ flexGrow: '1'}}></Typography>

                                <IconButton                             
                                    onClick={handleRemove}
                                    size="large"
                                    aria-label="delete"
                                    sx={{ color:"primary.main"}}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Toolbar>

                        </AppBar>
                    </Box> 
                </Grid>

                <Grid item xs={7}>
                    <Box sx={{ mb: '6em' }}>
                    <InputBase multiline value={title} fullWidth placeholder={'Set a title here...'} onChange={({ target }) => setTitle(target.value)} sx={{ 
                                fontWeight: 'bold',
                                fontSize: '26px',
                                padding: '0.5em'
                        }} />

                        <InputBase multiline value={content} fullWidth placeholder={'Write here...'} onChange={({ target }) => setContent(target.value)}  />
                    </Box>
                </Grid>

                <Grid item xs={2}>
                    <Grid container sx={{ marginTop: '0.5em' }}>
                        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                            <BottomNavigation
                                showLabels
                                >
                                <BottomNavigationAction label="Note" icon={<NotesIcon />} />
                                <BottomNavigationAction label="Recordings" icon={<AudiotrackIcon />} />
                                </BottomNavigation>

                                <CreateButton />
                        </AppBar>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )

}

export default NoteView