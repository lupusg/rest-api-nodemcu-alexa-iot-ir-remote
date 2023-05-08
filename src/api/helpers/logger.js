/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Log functions used for debugging.
 * @since November 19, 2022
 * @author Vlad-Marian Lupu
 */

'use strict';

export const debugLog = (function(environment) {
  if (environment === 'production') {
    return () => { };
  }
  return (...args) => {
    console.log(...args);
  };
})(process.env.NODE_ENV);
