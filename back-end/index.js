require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routers = require('./routers');
const middlewares = require('./middlewares');

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('media'));

app.use('/user', routers.user);
app.use('/product', routers.product);
app.use('/sales', routers.sales);

app.use(middlewares.error);

app.listen(PORT, () => console.log(`listen to port ${PORT} `));
