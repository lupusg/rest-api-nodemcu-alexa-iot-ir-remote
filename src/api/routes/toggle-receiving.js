/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Express route for toggle receiving (infrared signal).
 * @since July 30, 2022
 * @author Vlad-Marian Lupu
 */

import express from 'express';
import {sendToggleRequest} from '../controllers/toggle-receiving.js';

'use strict';

// eslint-disable-next-line new-cap
const toggleReceiving = express.Router();

toggleReceiving.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] Page accessed.`);
  next();
});

toggleReceiving
    .route('/')
    .post(sendToggleRequest)
    .get((request, response) => {
      response.send('works');
    });

export {toggleReceiving};
