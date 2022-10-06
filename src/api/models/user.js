/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Mongodb schema for "user" (authentification) collection.
 * @since September 30, 2022
 * @author Vlad-Marian Lupu
 */

'use strict';

import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    required: true,
  },
  token: {
    type: String,
    default: 'undefined',
  },
});

export const User = mongoose.model('user', userSchema);
