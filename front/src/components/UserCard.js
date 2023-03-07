import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

/**
 * Component coding the user card for the profile visual detection
 * @param {string} firsName the first name of the user
 * @param {string} lastName the last name of the user
 * @param {string} description a small text about the user
 * @param {string} profilePicture the relative url of the user profile picture
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
