/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Express route for start receiving (infrared signal).
 * @since July 30, 2022
 * @author Vlad-Marian Lupu
 */

import express from 'express';
import axios from 'axios';

'use strict';

// eslint-disable-next-line new-cap
const startReceiving = express.Router();

startReceiving.use((request, response, next) => {
  console.log('worksssss');
  next();
});

startReceiving
    .route('/startReceiving')
    // head
    .post((request, response) => {
      axios({
        method: 'post',
        url: 'http://192.168.0.109:80/startReceiving',
        data: {},
      });
    });

export {startReceiving};
