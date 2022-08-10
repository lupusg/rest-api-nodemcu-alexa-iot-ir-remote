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
import mongoose from 'mongoose';
import {startReceiving} from './api/routes/start-receiving.js';
import {signal} from './api/routes/store-signal.js';

'use strict';

/**
 * Main function.
 */
function main() {
  const app = express();

  mongoose.connect('mongodb://localhost:27017/nodemcu-alexa-iot-ir-remote');
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.set('port', 8081);

  // Routes
  app.use('/startReceiving', startReceiving);
  app.use('/signal', signal);

  app.listen(app.get('port'), function() {
    console.log('Server is running on ' + app.get('port'));
  });
}

main();
