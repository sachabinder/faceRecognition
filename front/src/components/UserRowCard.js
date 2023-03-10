import React, {useState} from 'react';

import Avatar from '@mui/material/Avatar';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';

import styled from '@emotion/styled';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faClose} from '@fortawesome/free-solid-svg-icons';

import ProfileForm from './ProfileForm';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

/**
 * Component coding the dialog title.
 * @param {props} props properties
 * @return {Component} A component
 */
function BootstrapDialogTitle(props) {
  const {children, onClose, ...other} = props;

  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <FontAwesomeIcon icon={faClose} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

/**
 * Component coding the user card for the displaying of the database
 * @param {object} profile the profile informations
 * @return {Component} A component
 */
export default function UserRowCard({profile}) {
  const [openEditor, setOpenEditor] = useState(false);

  const handleClickOpenEditor = () => {
    setOpenEditor(true);
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  return (
    <div>
      <Paper elevation={4} sx={{margin: 2, padding: 2}}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar
              src={'http://localhost:8000' + profile.profile_picture}
              sx={{height: '60px', width: '60px'}}
            />
          </Grid>
          <Grid item sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="h6">
                  {profile.first_name} {profile.last_name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="text.secondary">
                  {profile.description}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClickOpenEditor}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <BootstrapDialog
        onClose={handleCloseEditor}
        aria-labelledby="customized-dialog-title"
        open={openEditor}
        fullWidth
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseEditor}
        >
          ??diter un profil
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ProfileForm profile={profile} />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
