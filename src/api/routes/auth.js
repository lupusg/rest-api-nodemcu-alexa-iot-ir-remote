/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Express route for the Authentication.
 * @since October 4, 2022
 * @author Vlad-Marian Lupu
 */

import express from 'express';
import {login, register} from '../controllers/auth.js';

'use strict';

// eslint-disable-next-line new-cap
const auth = express.Router();

auth
    .route('/register')
    .post(register);

auth
    .route('/login')
    .post(login);

export {auth};
