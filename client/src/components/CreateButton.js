import React from "react";
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

const CreateButton = ({ type, handler }) => {
  const theme = useTheme()
  const bigger = useMediaQuery(theme.breakpoints.down('md'));

  const StyledFab = styled(Fab)(({ theme }) => ({ //? Pitäisikö tästä tehdä oma react-komponentti?
      position: 'fixed',
      fontSize: 'large',
      backgroundColor: theme.palette.mode === 'light' ? 'grey' : 'crimson',
      bottom: bigger ? 10 : 40,
      size: 'large',
      left: '50%',
      transform: 'translate(-50%, -50%)',  
      ariaLabel: 'create note',
      label: 'create-note'
    }));

  return (
    <StyledFab onClick={handler}>
      {type === 'createnote'
        ? (
          <AddIcon />
        ) : (
          <MicIcon />
        )}
    </StyledFab>
  )
}

export default CreateButton