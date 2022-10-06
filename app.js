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
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import {toggleReceiving} from './src/api/routes/toggle-receiving.js';
import {signal} from './src/api/routes/signal.js';
import {arduinoIotCloud} from './src/api/routes/cloud.js';
import {auth} from './src/api/routes/auth.js';
import {verifyToken} from './src/api/middlewares/auth.js';

'use strict';

/**
 * Main function.
 */
function main() {
  const app = express();

  dotenv.config();

  mongoose.connect('mongodb+srv://lupus:Q0UMyEGFArXKfQF8@cluster0.v8iiatl.mongodb.net/nodemcu-alexa-iot-ir-remote?retryWrites=true&w=majority');
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.set('port', 8081);

  // Routes
  app.use('/toggle-receiving', verifyToken, toggleReceiving);
  app.use('/signal', verifyToken, signal);
  app.use('/cloud', verifyToken, arduinoIotCloud);
  app.use('/auth', auth);

  app.listen(app.get('port'), function() {
    console.log('Server is running on ' + app.get('port'));
  });
}

main();
