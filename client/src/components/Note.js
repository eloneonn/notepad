import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card, CardActionArea, Grid, Typography, AppBar, Container, IconButton, InputBase, Toolbar, Fade, Dialog, useMediaQuery, Drawer } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from "@mui/system";
import CreateButton from "./CreateButton";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch } from "react-redux";
import { removeNote, updateNote } from "../reducers/noteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useTheme } from "@emotion/react";

const Note = forwardRef(({ note }, ref) => {
    const dispatch = useDispatch()
    const theme = useTheme()

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [ modalView, setModalView ] = useState(false)
    const [ content, setContent ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ updated, setUpdated ] = useState(true)
    const [ drawer, setDrawer ] = useState(false)

    useImperativeHandle(ref, () => {
        return {
            setModalView
        }
    })

    useEffect(() => {
        setContent(note.content)
        setTitle(note.title)
    }, [note]);

    const handleRemove = () => {
        handleClose()
        dispatch(removeNote(note))
        dispatch(setNotification('info', 'Note removed!'))
    }

    const handleClose = () => {
        setDrawer(false)
        setModalView(false)
    }

    const handleUpdate = () => {
        const newNote = {...note, title: title, content: content}

        dispatch(updateNote(newNote))
        dispatch(setNotification('success', 'Note saved!'))
        setUpdated(true)
    }

    const handleClick = (event) => {
        event.preventDefault()
        setModalView(true)
    }

    const handleTitleChange = (event) => {
        event.preventDefault()
        setTitle(event.target.value)
        setUpdated(false)
    }

    const handleContentChange = (event) => {
        event.preventDefault()
        setContent(event.target.value)
        setUpdated(false)
    }

    const handleRecord = (event) => {
        event.preventDefault()
        if (!drawer) {
            setDrawer(true)
        }


    }

    var time = 'just now'

    if (typeof note.modified_at !== 'undefined') {
        const newDate = new Date(note.modified_at)
        time = newDate.toLocaleDateString()
    } 

    return (
        <div style={{backgroundColor: 'secondary.main' }}>
            <Card variant="outlined">
                <CardActionArea onClick={handleClick} sx={{ padding: '5px' }}>
                    <Typography sx={{ 
                        fontWeight: 'bold',
                        padding: '0.5em'
                    }}>{note.title}</Typography> 
                    <Typography sx={{
                        padding: '0em 0.25em 0.25em 0.25em',
                        fontSize: '100%',
                        opacity: '80%',
                        maxHeight: '15em', 
                        minHeight: '1em',
                        overflow: 'hidden'
                    }}>{note.content}</Typography> 
                    <Grid container sx={{ marginTop: '0.5em' }}>
                        <Grid item xs>
                            
                        </Grid>
                        <Grid item xs>  
                            <Typography variant="caption" sx={{ fontSize: '80%', opacity: '60%', float: 'right' }}>{time}</Typography>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>

            <Dialog
                open={modalView}
                onClose={handleClose}
                hideBackdrop={fullScreen}
                fullScreen={fullScreen}
                disableScrollLock={true}
            >
                <Fade in={modalView}>
                    <Container id="note-container" sx={{ height: '100vh', pb: '8em', backgroundColor: 'secondary.main', overflow: 'auto'}}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="stretch"
                        >
                            <Grid item xs={3} sx={{ mb: '4.5em' }}>
                                <Box sx={{ zIndex: '100' }}>
                                    <AppBar elevation={0} sx={{ position: fullScreen ? 'fixed' : 'absolute', backgroundColor: 'secondary.main', padding: '0.5em 0.5em 0.5em 0.5em' }}>
                                        <Toolbar disableGutters>
                                            <IconButton
                                                onClick={handleClose}
                                                size="large"
                                                mr="2"
                                                aria-label="menu"
                                                sx={{ color:"primary.main"}}
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>  
                                            <IconButton
                                                onClick={handleUpdate}
                                                size="large"
                                                mr="2"
                                                aria-label="menu"
                                                sx={{ color:"primary.main"}}
                                            >
                                                {updated ? (
                                                    <DoneIcon />
                                                ) : (
                                                    <SaveIcon />
                                                )}
                                            </IconButton>  
                                            <Typography variant="caption" sx={{ color: 'primary.main', opacity: '60%', flexGrow: '1' }}>{updated ? 'note saved' : 'unsaved changes'}</Typography>
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
                                <Box sx={{ pb: '10em' }}>
                                <InputBase 
                                    multiline 
                                    value={title} 
                                    fullWidth 
                                    placeholder={'Set a title here...'} 
                                    spellCheck="false"
                                    onChange={handleTitleChange} 
                                    sx={{ 
                                        fontWeight: 'bold',
                                        fontSize: '26px',
                                        padding: '0.5em'
                                    }} />

                                    <InputBase 
                                        multiline 
                                        value={content} 
                                        fullWidth 
                                        placeholder={'Write here...'} 
                                        onChange={handleContentChange} 
                                        spellCheck="false"
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={2}>
                                <Box>
                                    <AppBar sx={{ zIndex: '1900', position: fullScreen ? 'fixed' : 'absolute', top: 'auto', bottom: 0 , padding: 0, backgroundColor: 'secondary.main' }}>
                                        <Toolbar>
                                            <Drawer
                                                anchor="bottom"
                                                open={drawer}
                                                onBackdropClick={() => setDrawer(false)}
                                                onClose={() => setDrawer(false)}
                                                PaperProps={{ style: { position: 'absolute' } }}
                                                BackdropProps={{ style: { position: 'absolute' } }}
                                                ModalProps={{
                                                    container: document.getElementById('note-container'),
                                                    style: { position: fullScreen ? 'fixed' : 'absolute' },
                                                    keepMounted: true
                                            }}>
                                                <Container>
                                                    <Grid
                                                        container
                                                        direction="column"
                                                        justifyContent="flex-start"
                                                        alignItems="stretch"
                                                    >
                                                        <Grid item xs={6}>
                                                            <Box >
                                                                <Typography variant="h4" sx={{ display: 'flex', alignContent: 'center', justifyContent:'center', pt: '0.5em', fontWeight: 'bold'}}>Record</Typography>    

                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={6} sx={{ mb: '8em' }}>
                                                        <Box>
                                                                <Typography>some more stuf</Typography>    

                                                            </Box>

                                                        </Grid>
                                                    </Grid>
                                                </Container>
                                            </Drawer>
                                            <CreateButton type={'Record'} handler={handleRecord}/>
                                        </Toolbar>
                                    </AppBar>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Fade>
            </Dialog>
        </div>
    )
})

export default Note