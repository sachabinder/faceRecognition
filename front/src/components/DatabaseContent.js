import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import UserRowCard from './UserRowCard';
import {DialogContent, DialogTitle, IconButton, Dialog} from '@mui/material';
import styled from '@emotion/styled';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';

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
 * Render the component
 * @return {Component} A component
 */
export default function DatabaseContent() {
  const [openEditor, setOpenEditor] = React.useState(false);

  const handleClickOpenEditor = () => {
    setOpenEditor(true);
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

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
        <Typography sx={{my: 5, mx: 2}} color="text.secondary" align="center">
          Il n'y a pas d'utilisateur dans la base de donnée
        </Typography>
        <UserRowCard />
        <UserRowCard />
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
          Éditer un profil
        </BootstrapDialogTitle>
        <DialogContent dividers> TODO : Form de profil vide</DialogContent>
      </BootstrapDialog>
    </div>
  );
}
