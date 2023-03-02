import * as React from 'react';
import {useHistory} from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import Logo from '../assets/logo.png';

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

/**
 * Component coding the nav bar of the main page
 * Render the component
 * @param {props} props should contain the information of the active tab
 * @return {Component} A component
 */
export default function Navigator(props) {
  const {...other} = props;
  const history = useHistory();

  const categories = [
    {
      id: 'Face recognition',
      children: [
        {
          id: 'Authentication',
          icon: <PeopleIcon />,
          path: '/',
        },
        {id: 'Database', icon: <DnsRoundedIcon />, path: '/database'},
      ],
    },
  ];

  categories[0].children[props.id]['active'] = true;
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{...item, ...itemCategory, fontSize: 22, color: '#fff'}}
        >
          <img src={Logo} style={{marginRight: '15px', width: '40%'}} />{' '}
          Mcovision
        </ListItem>
        {categories.map(({id, icon, children}) => (
          <Box key={id} sx={{bgcolor: '#101F33'}}>
            <ListItem sx={{py: 2, px: 3}}>
              <ListItemText sx={{color: '#fff'}}> {icon}</ListItemText>
              <ListItemText sx={{color: '#fff'}}> {id}</ListItemText>
            </ListItem>
            {children.map(({id: childId, icon, active, path}) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={active}
                  sx={item}
                  onClick={() => history.push(path)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{mt: 2}} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
