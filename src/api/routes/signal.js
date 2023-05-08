/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Express route to store the infrared signal received
 *       from the NodeMCU.
 * @since August 4, 2022
 * @author Vlad-Marian Lupu
 */

import express from 'express';

import {getSignal, postSignal} from '../controllers/signal.js';

'use strict';

// eslint-disable-next-line new-cap
const signal = express.Router();

signal.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] Page accessed.`);
  next();
});

signal
    .route('/')
    .post(postSignal)
    .get(getSignal);

export {signal};
