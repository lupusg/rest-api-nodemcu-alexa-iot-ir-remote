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

import {addSignal, findSignal} from '../services/database.js';

'use strict';

export const postSignal = async (request, response) => {
  const DATA = request.body;
  const result = await addSignal(request.app, DATA);

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
  const signal = await findSignal(request.app, SWITCH_NAME);
  if (signal !== false) {
    response.status(200).send(signal.Data);
  }
};
