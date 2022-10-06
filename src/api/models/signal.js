/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Mongodb schema for "signal" collection.
 * @since August 4, 2022
 * @author Vlad-Marian Lupu
 */

'use strict';

import mongoose from 'mongoose';

export const signalSchema = new mongoose.Schema({
  assigned_button: {
    type: String,
    default: 'Unknown',
  },
  name: {
    type: String,
    default: 'Unknown',
  },
  data: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
