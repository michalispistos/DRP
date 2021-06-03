makeServer = require('./server');
const pool = require('./db');
require('dotenv').config();


makeServer(pool, process.env.PORT);