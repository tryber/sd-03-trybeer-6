import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  offset: {
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '5em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5em',
    },
  },
  menuTitle: {
    margin: 'auto',
  },
  IconButton: {
    height: '1.5em',
    width: '1.5em',
  },
  list: {
    backgroundColor: theme.palette.primary.main,
  },
  listIcons: {
    height: '1.2em',
    width: '1.2em',
    color: 'white',
  },
  listText: {
    textDecoration: 'none',
    fontWeight: '400',
    fontSize: '2em',
    color: 'white',
  },
}));

export default function TopBar(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl] = useState('left');
  const { menuTitle, typeOfUser } = props;
  const classes = useStyles();
  const clientMenu = [
    { link: '/products', text: 'Produtos', icon: <ShoppingCartIcon /> },
    { link: '/orders', text: 'Meus Pedidos', icon: <LoyaltyIcon /> },
    { link: '/profile', text: 'Meu Perfil', icon: <AccountBoxIcon /> },
  ];

  const list = () => (
    <List>
      {typeOfUser === 'client'
        ? clientMenu.map((item) => (
          <ListItem key={ item.link } component={ Link } to={ item.link }>
            <ListItemIcon className={ classes.listIcons }>{ item.icon }</ListItemIcon>
            <ListItemText className={ classes.listText }>{ item.text }</ListItemText>
          </ListItem>
        ))
        : null}
      <Divider light />
      <ListItem
        component={ Link }
        to="/login"
        onClick={ () => localStorage.clear() }
      >
        <ListItemIcon className={ classes.listIcons }>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText className={ classes.listText }>Sair</ListItemText>
      </ListItem>
    </List>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={ () => setMenuOpen(true) }>
            <MenuIcon className={ classes.IconButton } />
          </IconButton>
          <Drawer
            anchor={ anchorEl }
            open={ menuOpen }
            onClose={ () => setMenuOpen(false) }
            classes={ { paper: classes.list } }
          >
            {list()}
          </Drawer>
          <Typography
            variant="h4"
            className={ classes.menuTitle }
            data-testid="top-title"
          >
            {menuTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={ classes.offset } />
    </div>
  );
}

TopBar.propTypes = {
  menuTitle: PropTypes.string.isRequired,
  typeOfUser: PropTypes.string.isRequired,
};
