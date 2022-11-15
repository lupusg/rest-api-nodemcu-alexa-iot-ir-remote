/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Untility functions for the hardware part. (nodemcu module)
 * @since November 12, 2022
 * @author Vlad-Marian Lupu
 */

import axios from 'axios';
import fetch from 'node-fetch';

'use strict';

/**
 * Checks if a user is authenticated in the nodemcu's api.
 * @return {Boolean} True if the user is authenticated, false if is not.
 */
export const checkAuthentication = () => {
  axios({
    method: 'post',
    url: 'http://192.168.0.109:80/toggle-receiving',
    data: {},
  }).then((response) => {
    console.log(response);
  }).catch((error) => {
    if (error.response.status == 401) {
      return false;
    }
  });
  return true;
};

// export const authenticate = () => {
//   console.log('auth');
//   axios.defaults.withCredentials = true;
//   axios({
//     method: 'post',
//     url: 'http://192.168.0.109:80/login?username=vladlp1&password=test1',
//   }, {
//     withCredentials: true,
//   }).catch((error) => {
//     console.log(error);
//   });
// };

export const authenticate = () => {
  // TODO: Express cookie storing problem
  fetch('http://192.168.0.109:80/login?username=vladlp1&password=test1', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    console.log(response);
  });
};
