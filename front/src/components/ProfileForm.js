import React from 'react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import {Stack} from '@mui/system';

/**
 * Coding the register/update form for the profiles
 * render a component
 * @param {props} e props
 * @return {conmponent} the profile form
 */
class ProfileForm extends React.Component {
  /**
   * Constructor of the component
   * Setting up the state, and utils functions
   * @param {props} props props
   */
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        firstName: this.props.profile ? this.props.profile.first_name : '',
        lastName: this.props.profile ? this.props.profile.last_name : '',
        description: this.props.profile ? this.props.profile.description : '',
        profilePicture: this.props.profile ?
          this.props.profile.profilePicture :
          null,
      },
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
  }

  /**
   * handleChange function
   * set correct values to what user put in fields in state
   * @argument {Event} e : event called onChange
   */
  handleChange(e) {
    const fields = this.state.fields;
    if (e.target.name === 'profilePicture') {
      fields[e.target.name] = e.target.files[0];
    } else {
      fields[e.target.name] = e.target.value;
    }
    this.setState({fields});
  }

  /**
   * submitForm function
   * called at the submition of the form
   * @argument {Event} e : event called onSubmit
   */
  submitForm = async (e) => {
    const isLoading = true;
    this.setState({isLoading});
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', this.state.fields.firstName);
    formData.append('last_name', this.state.fields.lastName);
    formData.append('description', this.state.fields.description);
    if (this.state.fields.profilePicture) {
      formData.append(
          'profile_picture',
          this.state.fields.profilePicture,
          this.state.fields.profilePicture.name,
      );
    }

    if (this.props.profile) {
      const response = await fetch(
          `http://localhost:8000/api/profile/${this.props.profile.id}/`,
          {
            method: 'PUT',
            body: formData,
          },
      );

      if (response.status === 200) {
        window.location.reload(false);
      } else {
        const isLoading = false;
        this.setState({isLoading});

        alert('Un probléme est survenu lors de la connexion au serveur');
      }
    } else {
      const response = await fetch('http://localhost:8000/api/profile/', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        window.location.reload(false);
      } else {
        const isLoading = false;
        this.setState({isLoading});

        alert('Un probléme est survenu lors de la connexion au serveur');
      }
    }
  };

  /**
   * deleteProfile function
   * called at the submition of the form for deletion
   * @argument {Event} e : event called onSubmit
   */
  deleteProfile = async (e) => {
    const isLoading = true;
    this.setState({isLoading});
    e.preventDefault();
    const response = await fetch(
        `http://localhost:8000/api/profile/${this.props.profile.id}/`,
        {
          method: 'DELETE',
        },
    );
    if (response.status === 200) {
      window.location.reload(false);
    } else {
      const isLoading = false;
      this.setState({isLoading});
      alert('Un probléme est survenu lors de la connexion au serveur');
    }
  };

  /**
   * render function
   * Render the final form
   * @return {Component}
   */
  render() {
    const paperStyle = {
      padding: 20,
      margin: '0',
    };
    if (this.state.isLoading) {
      return (
        <Grid align="center" m={10}>
          <CircularProgress />
        </Grid>
      );
    }
    return (
      <Grid>
        <Paper elevation={0} style={paperStyle}>
          <Grid>
            <form onSubmit={this.submitForm}>
              <TextField
                id="standard-basic"
                label="Prénom"
                name="firstName"
                required
                defaultValue={this.state.fields['firstName']}
                onChange={this.handleChange}
                variant="filled"
                margin="dense"
                fullWidth
              />
              <TextField
                id="standard-basic"
                label="Nom"
                name="lastName"
                required
                defaultValue={this.state.fields['lastName']}
                onChange={this.handleChange}
                variant="filled"
                margin="dense"
                fullWidth
              />
              <TextField
                id="standard-basic"
                variant="filled"
                margin="dense"
                required
                label="Description"
                name="description"
                defaultValue={this.state.fields['description']}
                onChange={this.handleChange}
                fullWidth
                multiline
                maxRows={10}
              />
              <br />
              <br />
              <Typography color="text.secondary">Photo de profil</Typography>
              <input
                accept="image/*"
                id="raised-button-file"
                type="file"
                name="profilePicture"
                defaultValue={this.state.fields['profilePicture']}
                onChange={this.handleChange}
              />
              <br />
              <br />
              <Typography color="text.secondary">
                * champ obligatoire
              </Typography>
              <Stack direction="row" spacing={2} mt={2}>
                <Button type="submit" color="primary" variant="contained">
                  {this.props.profile ?
                    'Modifier le profil' :
                    'Créer le profil'}
                </Button>
                {this.props.profile ? (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={this.deleteProfile}
                  >
                    Supprimer le profil
                  </Button>
                ) : (
                  ''
                )}
              </Stack>
            </form>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default ProfileForm;
