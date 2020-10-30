import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LabelIcon from '@material-ui/icons/Label';
import DeleteIcon from '@material-ui/icons/Delete';

import Alert from '../../utils/Alert';
import Topbar from '../topbar/Topbar';
import getUserByToken from '../../utils/axios/profile/GetDataByToken';
import RegisterSale from '../../utils/axios/checkout/RegisterSale';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#E9F3AA',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  alert: {
    width: '95%',
  },
  title: {
    alignSelf: 'flex-start',
    fontWeight: '400',
    padding: theme.spacing(2),
    marginLeft: theme.spacing(10),
  },
  listIcon: {
    color: 'black',
    height: '20px',
    width: '18px',
  },
  deleteIcon: {
    color: '#424242',
    height: '20px',
    width: '18px',
  },
  total: {
    fontWeight: 700,
  },
  entregaTitle: {
    marginTop: theme.spacing(2),
  },
}));

function Checkout() {
  const history = useHistory();
  const magicNumber = 0;
  const fixeNumber = 2;
  const timeOut = 4000;
  const [cartItens, setCartItens] = useState();
  const [total, setTotal] = useState(magicNumber);
  const [rua, setRua] = useState(null);
  const [numero, setNumero] = useState(null);
  const [status, setStatus] = useState(false);
  const classes = useStyles();

  const registerSale = async () => {
    const user = await getUserByToken(
      JSON.parse(localStorage.getItem('token')),
    );
    const totalPrice = parseFloat(total).toFixed(fixeNumber);
    const sale = await RegisterSale(user.id, totalPrice, rua, numero);

    if (sale.id) {
      setStatus(true);
      setTimeout(() => {
        localStorage.removeItem('cartItens');
        history.push('/products');
      }, timeOut);
    }
  };

  const calcList = (itens) => {
    const resumo = itens.reduce((acc, cur) => {
      acc += cur.quantity * cur.price;
      return acc;
    }, magicNumber);

    setTotal(resumo.toFixed(fixeNumber).replace('.', ','));
  };

  const handleList = async (val) => {
    const newItens = cartItens.filter(({ product }) => product !== val);
    localStorage.removeItem('cartItens');
    localStorage.setItem('cartItens', JSON.stringify(newItens));
    setCartItens(newItens);
    calcList(newItens);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) return history.push('/login');
    setCartItens(JSON.parse(localStorage.getItem('cartItens')));
    return calcList(JSON.parse(localStorage.getItem('cartItens')));
  }, [history]);

  return (
    <div>
      <Topbar menuTitle="Finalizar Pedido" typeOfUser="client" />
      <Container component="main" maxWidth="sm">
        {cartItens && cartItens.length === magicNumber && (
          <Typography variant="h4">Não há produtos no carrinho</Typography>
        )}
        <Paper elevation={ 3 } className={ classes.paper }>
          <Typography component="h2" variant="h5" className={ classes.title }>
            Carrinho
          </Typography>
          <List>
            {cartItens && cartItens.length > magicNumber &&
              cartItens.map(({ quantity, price, product }, i) => (
                <ListItem key={ product }>
                  <ListItemIcon>
                    <LabelIcon className={ classes.listIcon } />
                  </ListItemIcon>
                  <ListItemText
                    key={ `${product}+${price}` }
                    primary={ `${quantity} ${product} R$ ${(price * quantity)
                      .toFixed(fixeNumber)
                      .replace('.', ',')} ` }
                    secondary={ `(R$ ${parseFloat(price)
                      .toFixed(fixeNumber)
                      .replace('.', ',')} un)` }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      type="button"
                      value={ product }
                      onClick={ (e) => handleList(e.currentTarget.value) }
                      data-testid={ `${i}-removal-button` }
                      className={ classes.deleteIcon }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            <ListItem>
              <ListItemText primary="Total:" />
              <Typography variant="subtitle1" className={ classes.total }>
                {`R$ ${total}`}
              </Typography>
            </ListItem>
          </List>
        </Paper>
        <Typography variant="h5" className={ classes.entregaTitle }>
          Endereço de entrega:
        </Typography>
        <form className={ classes.form } noValidate>
          <Grid container spacing={ 2 }>
            <Grid item xs={ 12 } sm={ 10 }>
              <TextField
                label="Rua"
                variant="outlined"
                required
                fullWidth
                onChange={ (e) => setRua(e.target.value) }
              />
            </Grid>
            <Grid item xs={ 12 } sm={ 2 }>
              <TextField
                label="Nº"
                variant="outlined"
                required
                fullWidth
                onChange={ (e) => setNumero(e.target.value) }
              />
            </Grid>
            <Grid item xs={ 12 }>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                disabled={ !rua || !numero || total === magicNumber }
                data-testid="checkout-finish-btn"
                onClick={ () => registerSale() }
              >
                Finalizar pedido
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Snackbar
        open={ status }
        autoHideDuration={ 6000 }
        onClose={ () => setStatus(false) }
        className={ classes.alert }
      >
        <Alert
          onClose={ () => setStatus(false) }
          severity="success"
          className={ classes.alert }
        >
          Compra registrada com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default connect()(Checkout);
