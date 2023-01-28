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
import {wrapper} from 'axios-cookiejar-support';
import {CookieJar} from 'tough-cookie';

'use strict';

const jar = new CookieJar();
const client = wrapper(axios.create({jar}));

// axios.defaults.jar = jar;
// axios.defaults.withCredentials = true;

export const authenticate = () => {
  if (!jar.toJSON().cookies.includes('ESPSESSIONID')) {
    client.post(process.env.NODEMCU_API_URL + '/login', null, {
      params: {
        username: process.env.NODEMCU_USERNAME,
        password: process.env.NODEMCU_PASSWORD,
      },
    });
  }

  client.post(process.env.NODEMCU_API_URL + '/toggle-receiving', {
  }).catch((error) => {
    console.log(error);
    console.log(jar.toJSON());
  });
};

export const sendRequest = () => {
  client.post(process.env.NODEMCU_API_URL + '/toggle-receiving', {
    withCredentials: true,
  })
      .catch((error) => {
        console.log(error);
        // if (error.response.status === 401) {
        // authenticate();
        // }
      });
};
