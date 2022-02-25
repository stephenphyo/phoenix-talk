const PATH = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const reqLog = require("./middleware/reqLog");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 9010;

/* Middleware */
app.use(express.json());
app.use(reqLog);
// app.use(cors());

/* Routes */
app.use('/register', require(PATH.join(__dirname, 'routes', 'register')));
app.use('/login', require(PATH.join(__dirname, 'routes', 'login')));

app.listen(PORT, () => {console.log(`User Registration API is listening on port: ${PORT}`)});
