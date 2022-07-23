/**
 * @desc It is the intermediary part of the Alexa IOT IR Remote that use HTTP to comunicate with the database and nodemcu.
 * @since July 23, 2022
 * @author Vlad-Marian Lupu
 */

import EXPRESS from 'express';

'use strict';

function main() {
  const APP = EXPRESS();

  APP.set('port', 8081);

  APP.get('/test', (req, res) => {
    console.log('it works practic');
  });

  const SERVER = APP.listen(APP.get('port'), '0.0.0.0', function () {
    console.log('Server is running on ... ' + APP.get('port'));
  });
}

main();
