import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

/**
 * Component coding the copiright
 * Render the component
 * @return {Component} A component
 */
export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://fr.mcovision.com/">
        Mcovision
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
