/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Controller for /toggle-receiving route.
 * @since September 30, 2022
 * @author Vlad-Marian Lupu
 */

import {authenticate, checkAuthentication} from '../utils/nodemcu-utils.js';

'use strict';

export const sendToggleRequest = (request, response) => {
  // authenticate();
  response.status(200).send('Works');
};
