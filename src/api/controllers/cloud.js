/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Controller for /cloud route.
 * @since September 30, 2022
 * @author Vlad-Marian Lupu
 */

import {
  properties, THING_ID,
} from '../../config/cloud-config.js';

'use strict';

export const changeSwitchState = (request, response) => {
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
};

export const getThings = (request, response) => {
  properties.propertiesV2List(THING_ID)
      .then((things) => {
        response.send(things);
      })
      .catch((error) => console.log(error));
};
