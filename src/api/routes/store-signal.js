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
import mongoose from 'mongoose';
import {signalSchema} from '../models/signal-schema.js';

'use strict';

// eslint-disable-next-line new-cap
const signal = express.Router();

signal.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] Page accessed.`);
  next();
});

signal
    .route('/')
    // Stores the infrared signal into db
    .post((request, response) => {
      const Signals = mongoose.model('signals', signalSchema);
      const DATA = request.body;
      const DATA_NAME = DATA['name'];

      if (DATA_NAME !== undefined) {
        const filter = {};
        const update = {name: DATA_NAME};
        const options = {new: true};

        Signals.findOneAndUpdate(filter, update, options,
            function(error, result) {
              console.log(result);
            }).sort({created_at: -1});
      } else {
        const DEFAULT_NAME = 'unknown';
        new Signals({name: DEFAULT_NAME, data: DATA, created_at: new Date()})
            .save()
            .catch((error) => console.log(error));
        response.status(200).send();
        console.log('[POST][Store Signal] Request received.');
      }
    })
    // Returns the last stored signal from db
    .get((request, response) => {
      const Signals = mongoose.model('signals', signalSchema);
      Signals.findOne().sort({created_at: -1}).exec(function(error, result) {
        const DATA = {name: result['name'], signal: result['data']};
        response.status(200).send(DATA);
        console.log('[GET][Store Signal] Data sent.');
      });
    });


export {signal};
