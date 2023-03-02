import React from 'react';
import {Avatar, Grid, Paper, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';

/**
 * Component coding the user card for the displaying of the database
 * Render the component
 * @return {Component} A component
 */
export default function UserRowCard() {
  return (
    <Paper elevation={4} sx={{margin: 2, padding: 2}}>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar sx={{height: '60px', width: '60px'}} />
        </Grid>
        <Grid item sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h6">Sacha BINDER</Typography>
            </Grid>
            <Grid item>
              <Typography color="text.secondary">
                Le lorem ipsum est, en imprimerie, une suite de mots sans
                signification utilisée à titre provisoire pour calibrer une mise
                en page, le texte définitif venant remplacer le faux-texte dès
                qu'il est prêt ou que la mise en page est achevée. Généralement,
                on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton aria-label="">
              <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
