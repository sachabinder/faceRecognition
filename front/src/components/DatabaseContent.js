import React, {useState, useLayoutEffect} from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';

import styled from '@emotion/styled';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';

import UserRowCard from './UserRowCard';
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
 * Component coding the content of the database visualisation
 * @return {Component} A component
 */
export default function DatabaseContent() {
  const [openEditor, setOpenEditor] = useState(false);
  const [listProfile, setListProfle] = useState([]);

  const fetchProfile = async () => {
    const response = await fetch('http://localhost:8000/api/profile/', {
      method: 'GET',
    });
    if (response.status === 200) {
      const content = await response.json();
      setListProfle(content);
    } else {
      alert('Didn\'t work');
    }
  };

  const handleClickOpenEditor = () => {
    setOpenEditor(true);
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  useLayoutEffect(() => {
    fetchProfile();
  }, []);

  useLayoutEffect(() => {
    const interval = setInterval(fetchProfile, 10000);
    return () => clearInterval(interval);
  }, [listProfile]);

  return (
    <div>
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
                <Button
                  variant="contained"
                  sx={{mr: 1}}
                  onClick={handleClickOpenEditor}
                >
                  Ajouter un utilisateur
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {listProfile ? (
          listProfile.map((profile) => (
            <UserRowCard key={profile.id} profile={profile} />
          ))
        ) : (
          <Typography
            sx={{my: 5, mx: 2}}
            color="text.secondary"
            align="center"
          >
            Il n'y a pas d'utilisateur dans la base de donnée
          </Typography>
        )}

        {}
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
          Ajouter un profil
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ProfileForm />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
