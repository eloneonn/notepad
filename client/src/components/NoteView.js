import { AppBar, BottomNavigation, BottomNavigationAction, Container, Grid, IconButton, InputBase } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from "react";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import CreateButton from "./CreateButton";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import NotesIcon from '@mui/icons-material/Notes';

const NoteView = ({ note }) => { //! FIXAA BUGI JOSSA TITLE MENEE CONTENTIN PÄÄLLE KUN ON TARPEEKSI PITKÄ
    const navigate = useNavigate()

    const [content, setContent] = useState(note.content)
    const [title, setTitle] = useState(note.title)

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
                        onClick={() => navigate('/')}
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