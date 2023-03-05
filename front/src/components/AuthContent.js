import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Camera from './Camera';
import UserCard from './UserCard';
import CamerasList from './CamerasList';

/**
 * Component coding the content of the visual authentification
 * Render the component
 * @return {Component} A component
 */
export default function AuthContent() {
  const [detectedProfile, setDetectedProfile] = useState(null);
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
            <Grid item xs>
              <CamerasList />
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container alignItems="center">
        <Grid item m={2}>
          <Camera setDetectedProfile={setDetectedProfile} />
        </Grid>
        <Grid item alignContent="center" m={2}>
          {detectedProfile && (
            <UserCard
              firsName={detectedProfile.first_name}
              lastName={detectedProfile.last_name}
              description={detectedProfile.description}
              profilePicture={detectedProfile.profile_picture}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
