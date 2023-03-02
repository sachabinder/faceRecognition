import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import WebCam from './WebCam';
import UserCard from './UserCard';

/**
 * Component coding the content of the visual authentification
 * Render the component
 * @return {Component} A component
 */
export default function AuthContent() {
  return (
    <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs></Grid>
            <Grid item>
              <Button variant="contained" sx={{mr: 1}}>
                Add user
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container alignItems="center">
        <Grid item>
          <WebCam />
        </Grid>
        <Grid item alignContent="center" m={4}>
          <UserCard />
        </Grid>
      </Grid>
    </Paper>
  );
}
