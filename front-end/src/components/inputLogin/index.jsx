import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Snackbar,
  Avatar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '../../utils/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: '95%',
  },
}));

const isValidParams = (email, password) => {
  const emailValidation = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(
    email,
  );
  const minLengthPassword = 6;

  if (emailValidation && password.length >= minLengthPassword) return null;
  return true;
};

export default function InputLogin() {
  const [email, emailHandler] = useState(null);
  const [password, passwordHandler] = useState('');
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleClose = () => setOpen(false);

  const loginRequest = async () => {
    try {
      const loginResponse = await axios.post('http://localhost:3001/user/', {
        email,
        password,
      });

      const {
        data: { token, user },
      } = loginResponse;

      localStorage.clear();

      if (token) localStorage.setItem('token', JSON.stringify(token));

      if (user.role === 'administrator') return history.push('/admin/orders');

      return history.push('/products');
    } catch (err) {
      return setOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={ classes.paper }>
        <Snackbar
          open={ open }
          autoHideDuration={ 6000 }
          onClose={ handleClose }
          className={ classes.alert }
        >
          <Alert
            onClose={ handleClose }
            severity="error"
            className={ classes.alert }
          >
            Email ou senha inválidos!
          </Alert>
        </Snackbar>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={ classes.form } noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            data-testid="email-input"
            onChange={ (e) => emailHandler(e.target.value) }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            data-testid="password-input"
            onChange={ (e) => passwordHandler(e.target.value) }
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={ classes.submit }
            disabled={ isValidParams(email, password) }
            data-testid="signin-btn"
            onClick={ () => loginRequest() }
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2" data-testid="no-account-btn">
                Ainda não é cadastrado? Registre-se
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
