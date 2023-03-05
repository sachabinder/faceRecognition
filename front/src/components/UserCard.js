import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Avatar, Typography} from '@mui/material';

/**
 * Component coding the user card
 * Render the component
 * @return {Component} A component
 */
export default function UserCard({
  firsName,
  lastName,
  description,
  profilePicture,
}) {
  const paperStyle = {
    padding: 20,
    margin: 'auto',
    width: 300,
  };

  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Typography color="text.secondary" m={2}>
            Derniere personne détectée
          </Typography>
          <Avatar
            src={'http://localhost:8000' + profilePicture}
            sx={{height: '100px', width: '100px'}}
          />
          <h3>
            {firsName} {lastName}
          </h3>
        </Grid>
        <Typography color="text.secondary">{description}</Typography>
      </Paper>
    </Grid>
  );
}
