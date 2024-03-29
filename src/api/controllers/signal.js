/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Controller for /signal route.
 * @since September 30, 2022
 * @author Vlad-Marian Lupu
 */


'use strict';

import {addSignal, findSignal} from '../database/queries.js';
import {debugLog} from '../helpers/logger.js';

export const postSignal = async (request, response) => {
  const DATA = request.body;

  debugLog('Received postSignal request >>> \n' + DATA + '\n<<<');

  const result = await addSignal(DATA);

  if (result === true) {
    response.sendStatus(200);
    return;
  }
  response.sendStatus(500);
};

export const getSignal = async (request, response) => {
  const SWITCH_NAME = request.query.switchName;

  if (SWITCH_NAME === undefined) {
    response.status(400).send('Invalid request. Please specify switchName.');
  }
  const result = await findSignal(SWITCH_NAME);
  if (result !== undefined) {
    response.status(200).send(result.IrData);
    console.log(result.IrData);
  } else {
    response.status(404).send('Not found.');
  }
};
