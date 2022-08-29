/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Arduino IOT Cloud client.
 * @since August 15, 2022
 * @author Vlad-Marian Lupu
 */

import axios from 'axios';
import iotCloud from '@arduino/arduino-iot-client';
import querystring from 'querystring';

const THING_ID = 'fd41d2d8-3a9a-4a19-a56c-5e5f0d822cd1';
const API_URL = 'https://api2.arduino.cc/iot/v1/clients/token';

const PAYLOAD = querystring.stringify({
  grant_type: 'client_credentials',
  client_id: 'emAwLDhOR2Eeb5GJLpIRLlxVVgolpe3M',
  client_secret:
        'FkVM19LhFVcwV90MJGeSqASTGmHYECAuTr2ecBnHRfbLdZR5rMNqBKSqyrSxjtXM',
  audience: 'https://api2.arduino.cc/iot',
});

const HEADERS = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
};

/**
 * Gets the IOT Cloud token.
 * @return {Promise} The Arduino IOT Cloud token.
 */
const getToken = async () => {
  try {
    const response = await axios.post(API_URL, PAYLOAD, HEADERS);
    return response.data['access_token'];
  } catch (error) {
    console.error(error);
  }
};

const client = iotCloud.ApiClient.instance;

const oauth2 = client.authentications['oauth2'];
oauth2.accessToken = await getToken();

setInterval(async () => {
  oauth2.accessToken = await getToken();
  console.log('Token updated.');
}, 240000); // 4 minutes

const properties = new iotCloud.PropertiesV2Api();
const devices = new iotCloud.DevicesV2Api();

export {properties, devices, THING_ID};
