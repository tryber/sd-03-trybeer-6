require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT||3001


app.use(bodyParser.json())
app.use(cors())



app.listen(PORT, () => console.log(`listen to port ${PORT} ` ));
