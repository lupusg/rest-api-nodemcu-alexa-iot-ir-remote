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
import {startReceiving} from './api/routes/start-receiving.js';

'use strict';

/**
 * Main function.
 */
function main() {
  const APP = express();

  APP.set('port', 8081);
  APP.use(startReceiving);

  APP.listen(APP.get('port'), function() {
    console.log('Server is running on ' + APP.get('port'));
  });
}

main();
