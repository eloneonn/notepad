import { AppBar, BottomNavigation, BottomNavigationAction, Container, Grid, IconButton, InputBase } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import CreateButton from "./CreateButton";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import NotesIcon from '@mui/icons-material/Notes';
import { useDispatch } from "react-redux";
import { updateNote } from "../reducers/noteReducer";

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

    return (
        <Container>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
            >
                <Grid item sm={3} sx={{ mb: '8em'}}>
                    <Box sx={{ position: 'fixed', backgroundColor: 'white', zIndex: '100', width: '100%',  pt: '1em' }}>
                        <IconButton
                        onClick={handleBackbutton}
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2, color:"primary.main"}}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <InputBase multiline value={title} fullWidth placeholder={'Set a title here...'} onChange={({ target }) => setTitle(target.value)} sx={{ 
                                fontWeight: 'bold',
                                fontSize: '26px',
                                padding: '0.5em'
                        }} />
                    </Box> 
                </Grid>

                <Grid item xs={7}>
                    <Box sx={{ mb: '6em' }}>
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