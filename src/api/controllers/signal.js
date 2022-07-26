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

import mongoose from 'mongoose';
import {signalSchema} from '../models/signal.js';

'use strict';

export const newSignal = (request, response) => {
  const DATA = request.body;
  const DATA_NAME = DATA['name'];
  const Signals = mongoose.model('signals', signalSchema);

  // If there is 'name' in the payload it updates the signal name.
  if (DATA_NAME !== undefined) {
    const FILTER = {};
    const UPDATE = {name: DATA_NAME};
    const OPTIONS = {new: true};

    Signals.findOneAndUpdate(FILTER, UPDATE, OPTIONS,
        function(error, result) {
          console.log(result);
        }).sort({created_at: -1}); // Sort descendent
  } else { // Else it stores the new signal into the database
    new Signals({
      data: DATA,
    })
        .save()
        .catch((error) => console.log(error));
    response.status(200).send();
    console.log('[POST][Store Signal] Request received.');
  }
};

export const getSignal = (request, response) => {
  const Signals = mongoose.model('signals', signalSchema);
  const SWITCH_NAME = request.query.switchName;

  if (SWITCH_NAME !== undefined) {
    Signals.findOne({assigned_button: SWITCH_NAME},
        function(error, result) {
          if (result !== null) {
            const DATA = result['data'];
            const DATA_SIZE = DATA.split(' ').length - 1;

            response.send(`[${DATA_SIZE}]${DATA}`);
          }
        });
  } else {
    Signals.findOne().sort({created_at: -1}).exec(function(error, result) {
      const DATA = {name: result['name'], signal: result['data']};

      response.status(200).send(DATA);
      console.log('[GET][Store Signal] Data sent.');
    });
  }
};
