import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';

const heights = [250, 500, 160, 450, 240, 150, 130, 190, 200, 290, 590, 150, 300, 300, 260];

const Item = styled(Paper)(({ theme }) => ({ //! KORVAUTUU MYÖHEMMIN <Note /> -KOMPONENTILLA
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const NoteMasonry = () => {
  return (
    <Box sx={{ height: '100%', width: '100%', }}>
      <Masonry columns={2} spacing={2}>
        {heights.map((height, index) => (
          <Item key={index} sx={{ height }}>
            {index + 1}
          </Item>
        ))}
      </Masonry>
    </Box>
  );
}

export default NoteMasonry
