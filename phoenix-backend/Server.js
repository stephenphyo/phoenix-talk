const express = require('express');
const cors = require('cors');
require('dotenv').config();

/* App Settings */
const app = express();
const PORT = process.env.PORT || 9000;

/* MongoDB Database Connection */
const connectMongoDB = require('./database/mongodb/connectMongoDB');
connectMongoDB(process.env.MONGODB_CONNECTION_STRING);

/* Middleware */
app.use(express.json());
app.use(cors());

/* Routes */
app.use('/users', require('./routes/users.route'));
app.use('/rooms', require('./routes/rooms.route'));
app.use('/test', require('./routes/test.route'));

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));