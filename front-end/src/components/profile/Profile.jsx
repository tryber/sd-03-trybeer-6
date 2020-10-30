import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Button,
  TextField,
  Snackbar,
} from '@material-ui/core';

import TopBar from '../topbar/Topbar';
import getUserByToken from '../../utils/axios/profile/GetDataByToken';
import UpdateUserName from '../../utils/axios/profile/UpdateUserName';
import Alert from '../../utils/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  alert: {
    width: '95%',
  },
}));

export default function Profile() {
  const [initialName, setInitialName] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [nameCopy, setNameCopy] = useState(null);
  const [updated, setUpdated] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const updateUser = async () => {
    const updateData = UpdateUserName(userId, initialName);
    updateData.then(() => setUpdated(true));
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) return history.push('/login');
    const user = getUserByToken(token);
    user.then((userOb) => {
      setInitialName(userOb.name);
      setInitialEmail(userOb.email);
      setNameCopy(userOb.name);
      setUserId(userOb.id);
    });
  }, [history]);

  return (
    <div>
      <TopBar menuTitle="Meu Perfil" typeOfUser="client" />
      <Container component="main" maxWidth="xs">
        <div className={ classes.paper }>
          <form className={ classes.form } noValidate>
            <Grid container spacing={ 2 }>
              <Grid item xs={ 12 }>
                <TextField
                  name="profile-name"
                  variant="outlined"
                  required
                  fullWidth
                  label="Nome"
                  autoFocus
                  value={ initialName }
                  onChange={ (e) => setInitialName(e.target.value) }
                />
              </Grid>
              <Grid item xs={ 12 }>
                <TextField
                  variant="outlined"
                  disabled
                  fullWidth
                  label="Email"
                  name="profile-email"
                  value={ initialEmail }
                />
              </Grid>
              <Grid item xs={ 12 }>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={ classes.submit }
                  onClick={ () => updateUser() }
                  disabled={ initialName === nameCopy }
                >
                  Salvar Alterações
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Snackbar
        open={ updated }
        autoHideDuration={ 6000 }
        onClose={ () => setUpdated(false) }
        className={ classes.alert }
      >
        <Alert onClose={ () => setUpdated(false) } severity="success" className={ classes.alert }>
          Atualização concluída com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
}
