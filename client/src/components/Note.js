import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';

const Note = ({ note }) => {
    const Background = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(0.5),
        color: theme.palette.text.secondary,
      }));
      
    return (
        <Background sx={{ }}>
            <Typography sx={{ 
                fontWeight: 'bold',
                padding: '0.5em'
            
            }}>{note.title}</Typography> 
            <Typography sx={{
                padding: '0em 0.25em 0.25em 0.25em',
                fontSize: '100%',
                opacity: '80%',
                height: '25em', 
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
    )
}

export default Note