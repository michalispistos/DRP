makeServer = require('./server');
const db = require('./db/index.js');
require('dotenv').config();


makeServer(db, process.env.PORT || 5000);