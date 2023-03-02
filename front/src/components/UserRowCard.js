import React from 'react';
import {
  Avatar,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faClose} from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';

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
 * Render the component
 * @return {Component} A component
 */
export default function UserRowCard() {
  const [openEditor, setOpenEditor] = React.useState(false);

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
                  signification utilisée à titre provisoire pour calibrer une
                  mise en page, le texte définitif venant remplacer le
                  faux-texte dès qu'il est prêt ou que la mise en page est
                  achevée. Généralement, on utilise un texte en faux latin, le
                  Lorem ipsum ou Lipsum.
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
          Éditer un profil
        </BootstrapDialogTitle>
        <DialogContent dividers>
          TODO : form de profil pré complété
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
