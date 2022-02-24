import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Card, CardActionArea, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Note = ({ note }) => {
    const navigate = useNavigate()

    const Background = styled(Paper)(({ theme }) => ({ //? USE CARD VARIANT INSTEAD OF STYLED NOTE
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(0.5),
        color: theme.palette.text.secondary,
      }));

    const handleClick = (event) => {
        event.preventDefault()
        navigate(`/notes/${note.id}`)
    }

    return (
        <Card> 
            <CardActionArea >
                <Link to={`/notes/${note.id}`} style={{ textDecoration: 'none' }} onClick={handleClick}>
                    <Background>
                        <Typography sx={{ 
                            fontWeight: 'bold',
                            padding: '0.5em'
                        }}>{note.title}</Typography> 
                        <Typography sx={{
                            padding: '0em 0.25em 0.25em 0.25em',
                            fontSize: '100%',
                            opacity: '80%',
                            maxHeight: '20em', 
                            minHeight: '5em',
                            overflow: 'hidden'
                        }}>{note.content}</Typography> 
                        <Grid container sx={{ marginTop: '0.5em' }}>
                            <Grid item xs>
                                
                            </Grid>
                            <Grid item xs>  
                                <Typography variant="caption" sx={{ fontSize: '75%', opacity: '60%' }}>edited: {note.created_at.slice(0, 10)}</Typography>
                            </Grid>
                        </Grid>
                    </Background>
                </Link>
            </CardActionArea>
        </Card>
    )
}

export default Note