/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Controller for /auth route.
 * @since October 4, 2022
 * @author Vlad-Marian Lupu
 */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {debugLog} from '../helpers/logger.js';

import {findUser} from '../services/database.js';

'use strict';

/**
 * Registers a new user with a username, password and a JSON Web Token.
 *
 * The username and password input is taken from the request body.
 * @param {Object} request The HTTP request.
 * @param {Object} response The HTTP response that an Express app sends when
 *                          it gets an HTTP request.
 */
/* TEMPORARY DISABLED;
export const register = async (request, response) => {
  const {username, password} = request.body;

  try {
    if (!(username && password)) {
      response.status(400).send('Username & password are required.');
      return;
    }

    const oldUser = await User.findOne({username});
    if (oldUser) {
      response.status(409).send('Username already exists.');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: encryptedPassword,
    });
    // Creates the jwt token using user ._id (the mongodb document id) and the
    // inputed username.
    const token = jwt.sign(
        {user_id: newUser._id, username},
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h',
        },
    );

    newUser.token = token;
    await newUser.save();

    response.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};
*/

/**
 * Logins an existing user with a username, password and it stores the jwt
 * as a http only cookie.
 *
 * The username and password input is taken from the request body.
 * @param {Object} request The HTTP request.
 * @param {Object} response The HTTP response that an Express app sends when
 *                          it gets an HTTP request.
 */
export const login = async (request, response) => {
  const {username, password} = request.body;

  debugLog('[Auth] Login request received. >>', request.body, '<<');

  try {
    if (!(username && password)) {
      return response.status(400).send('Username & password are required.');
    }

    const user = await findUser(request.app, username);
    if (user && await bcrypt.compare(password, user.Password)) {
      const token = jwt.sign(
          {user_id: user.Id, username},
          process.env.TOKEN_KEY,
          {
            expiresIn: '2h',
          },
      );
      const options = {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
      };

      response.cookie('x-access-token', token, options);
      return response.status(200).send(username + ', you are now logged in.');
    }
    return response.status(400).send('Invalid username or password');
  } catch (error) {
    console.log(error);
  }
};
