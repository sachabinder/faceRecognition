import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Avatar, Typography} from '@mui/material';

/**
 * Component coding the user card
 * Render the component
 * @return {Component} A component
 */
export default function UserCard() {
  const paperStyle = {
    padding: 20,
    margin: 'auto',
    width: 300,
  };

  return (
    <Grid>
      <Paper elevation={15} style={paperStyle}>
        <Grid align="center">
          <Avatar src={''} sx={{height: '80px', width: '80px'}} />
          <h3>Sacha BINDER</h3>
        </Grid>
        <Typography color="text.secondary">
          Le lorem ipsum est, en imprimerie, une suite de mots sans
          signification utilisée à titre provisoire pour calibrer une mise en
          page, le texte définitif venant remplacer le faux-texte dès qu'il est
          prêt ou que la mise en page est achevée. Généralement, on utilise un
          texte en faux latin, le Lorem ipsum ou Lipsum.
        </Typography>
      </Paper>
    </Grid>
  );
}
