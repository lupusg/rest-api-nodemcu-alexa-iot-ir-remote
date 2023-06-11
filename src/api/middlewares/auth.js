/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Express route middleware for the Authentication.
 * @since October 4, 2022
 * @author Vlad-Marian Lupu
 */

'use strict';

import jwt from 'jsonwebtoken';
import {debugLog} from '../helpers/logger.js';


// eslint-disable-next-line valid-jsdoc
/**
 * Verifies the jwt token.
 *
 * @param {Object} request The HTTP request.
 * @param {Object} response The HTTP response that an Express app sends when
 *                          it gets an HTTP request.
 * @param {Function} next Indicating the next middleware function.
 */
export const verifyToken = (request, response, next) => {
  const token =
    request.body.token || request.query.token ||
    request.cookies['x-access-token'];

  debugLog('Token received >>>\n' + token + '\n<<<');

  if (!token) {
    response.status(403).send('A token is required for authentication.');
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    request.user = decoded;
  } catch (error) {
    response.status(401).send('Invalid token.');
    return;
  }
  return next();
};
