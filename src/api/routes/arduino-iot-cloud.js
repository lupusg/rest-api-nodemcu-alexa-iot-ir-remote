/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Express route for the Arduino IOT Cloud.
 * @since August 15, 2022
 * @author Vlad-Marian Lupu
 */

import express from 'express';
import {
  properties, THING_ID,
} from '../../config/arduino-iot-cloud-config.js';

'use strict';

// eslint-disable-next-line new-cap
const arduinoIotCloud = express.Router();

arduinoIotCloud.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] Page accessed.`);
  next();
});

arduinoIotCloud
    .route('/change-switch-state')
    .post((request, response) => {
      // Get the properties list using the thing id (nodemcu id).
      properties.propertiesV2List(THING_ID)
          .then((result) => {
            const SWITCH_ID = request.body.switchId;
            const PROPERTY = result.find((element) =>
              element.name === `custom_switch${SWITCH_ID}`);

            // Set selected switch value to true.
            properties.propertiesV2Publish(
                THING_ID, PROPERTY.id, {value: 'true'});
          }).catch((error) => console.error(error));
      response.sendStatus(200);
    });

arduinoIotCloud
    .route('/things')
    // Sends a list with all properties (switches, etc.) that a device has.
    .get((request, response) => {
      properties.propertiesV2List(THING_ID)
          .then((things) => {
            response.send(things);
          })
          .catch((error) => console.log(error));
    });


export {arduinoIotCloud};
