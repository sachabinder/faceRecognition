import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function DatabaseContent() {
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
      <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
        No users for this project yet
      </Typography>
    </Paper>
  );
}
