import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Snackbar,
  Avatar,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '../../utils/Alert';
import NewRegisterUser from '../../utils/axios/register/RegisterUser';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const history = useHistory();
  const mgNumber = 6;
  const classes = useStyles();

  const registerUser = async () => {
    let role = 'client';
    if (isAdmin) role = 'administrator';
    const registerAnsw = await NewRegisterUser(name, email, password, role);
    const statusErr = 500;

    localStorage.setItem('token', 'aiusdhdsjsdkjdskj');

    if (registerAnsw === statusErr) return setRegisterError(registerAnsw);

    if (registerAnsw.user.role === 'administrator') {
      return history.push('/admin/orders');
    }

    return history.push('/products');
  };

  const emailValidator = (e) => {
    const {
      target: { value: typedEmail },
    } = e;

    if (!typedEmail) return null;

    //* Regex de e-mail
    const validator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!validator.test(typedEmail)) {
      return setEmailError('Você digitou um e-mail inválido');
    }

    //* Passando no validador incluir no state ao sair do foco do campo (onBlur)
    return (setEmailError(null), setEmail(typedEmail));
  };

  const passwordValidator = (e) => {
    const {
      target: { value: typedPassword },
    } = e;

    if (!typedPassword) return null;

    //* Regra do Eslint de armazenar números em variáveis para comparar.
    const magicNumber = 6;

    if (typedPassword.length < magicNumber) {
      return setPasswordError('Você digitou uma senha menor que 6 caracteres');
    }

    //* Passando na validação de senha armazernar no estado ao sair do foto (onBlur).
    return (setPasswordError(null), setPassword(typedPassword));
  };

  const nameValidator = (e) => {
    const {
      target: { value: typedName },
    } = e;
    const nameRegex = /[\^$.|?*@+()#!%¨&0-9]/;
    const magicNumber = 12;

    if (!typedName) return null;

    if (nameRegex.test(typedName) || typedName.length < magicNumber) {
      return setNameError(
        'Você digitou um caracter especial ou número no nome ou digitou um nome menor que 12 letras.',
      );
    }

    //* Passou na validação de nome.
    return (setNameError(null), setName(typedName));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        <form className={ classes.form } noValidate>
          <Grid container spacing={ 2 }>
            <Grid item xs={ 12 }>
              <TextField
                data-testid="signup-name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                autoFocus
                error={ nameError }
                helperText={ nameError }
                onBlur={ (e) => nameValidator(e) }
              />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField
                data-testid="signup-email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                error={ emailError }
                helperText={ emailError }
                onBlur={ (e) => emailValidator(e) }
              />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField
                data-testid="signup-password"
                variant="outlined"
                required
                fullWidth
                name="senha"
                label="Password"
                type="password"
                error={ passwordError }
                helperText={ passwordError }
                onBlur={ (e) => passwordValidator(e) }
                onChange={ (e) => setPassword(e.target.value) }
              />
            </Grid>
            <Grid item xs={ 12 }>
              <FormControlLabel
                control={
                  <Checkbox
                    data-testid="signup-seller"
                    color="primary"
                    onChange={ () => setIsAdmin(!isAdmin) }
                  />
                }
                label="Quero Vender"
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={ classes.submit }
            onClick={ registerUser }
            data-testid="signup-btn"
            disabled={
              !name
              || !email
              || !password
              || emailError
              || passwordError
              || nameError
              || password.length < mgNumber
            }
          >
            Cadastrar
          </Button>
        </form>
      </div>
    </Container>
  );
}
