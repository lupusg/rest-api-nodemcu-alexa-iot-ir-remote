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

export const authenticate = async () => {
  try {
    if (!jar.toJSON().cookies.includes('ESPSESSIONID')) {
      await client.post(process.env.NODEMCU_API_URL + '/login', null, {
        params: {
          username: process.env.NODEMCU_USERNAME,
          password: process.env.NODEMCU_PASSWORD,
        },
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const sendToggleReceivingRequest = async () => {
  try {
    await client.post(process.env.NODEMCU_API_URL + '/toggle-receiving', {
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
