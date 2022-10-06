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

import axios from 'axios';

'use strict';

export const sendToggleRequest = (request, response) => {
  axios({
    method: 'post',
    url: 'http://192.168.0.109:80/toggle-receiving',
    data: {},
  });
  console.log('[Toggle Receiving] Request sent.');
  response.status(200);
};
