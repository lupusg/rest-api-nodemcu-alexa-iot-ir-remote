/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc The main file.
 * @since July 23, 2022
 * @author Vlad-Marian Lupu
 */

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import sql from 'mssql';

import {toggleReceiving} from './src/api/routes/toggle-receiving.js';
import {signal} from './src/api/routes/signal.js';
import {arduinoIotCloud} from './src/api/routes/cloud.js';
import {auth} from './src/api/routes/auth.js';
import {verifyToken} from './src/api/middlewares/auth.js';

import {config} from './src/config/mssql.js';

'use strict';

/**
 * Main function.
 */
function main() {
  const app = express();
  const appPool = new sql.ConnectionPool(config);

  dotenv.config();

  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.set('port', process.env.APP_PORT);

  // Routes
  app.use('/toggle-receiving', verifyToken, toggleReceiving);
  app.use('/signal', verifyToken, signal);
  app.use('/cloud', verifyToken, arduinoIotCloud);
  app.use('/auth', auth);

  appPool.connect().then(function(pool) {
    app.locals.db = pool;

    app.listen(app.get('port'), function() {
      console.log('Server is running on ' + app.get('port'));
    });
  }).catch((error) => {
    console.log('Error creating connection pool', error);
    process.exit(1);
  });
}

main();
