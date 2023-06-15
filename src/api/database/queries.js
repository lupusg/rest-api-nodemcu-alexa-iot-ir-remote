/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Queries for database.
 * @since March 17, 2023
 * @author Vlad-Marian Lupu
 */

import pg from 'pg';

'use strict';

const identityPool = new pg.Pool({database: 'identity'});
const aiirPool = new pg.Pool();

export const getUser = async (username) => {
  const query = {
    name: 'get-user',
    text: 'SELECT * FROM "AspNetUsers" WHERE "UserName" = $1',
    values: [username],
  };
  const client = await identityPool.connect();

  try {
    const result = await client.query(query);
    return result.rows[0];
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.release();
  }
};

export const getAllSignalsNameWithAssignedButton = async () => {
  const query = {
    name: 'get-signals',
    text:
      'SELECT "Name", "AssignedButton" FROM "Signals"' +
      'WHERE "AssignedButton" <> $1',
    values: ['n/a'],
  };

  const client = await aiirPool.connect();

  try {
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.release();
  }
};

export const findSignal = async (assignedButton) => {
  const query = {
    name: 'get-signal',
    text: 'SELECT "IrData" FROM "Signals" WHERE "AssignedButton" = $1',
    values: [assignedButton],
  };

  const client = await aiirPool.connect();

  try {
    const result = await client.query(query);
    return result.rows[0];
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.release();
  }
};

export const addSignal = async (input) => {
  const data = {};

  data.irData = input;
  data.name = 'n/a';
  data.assignedButton = 'n/a';
  data.createdAt = new Date().toUTCString();

  const query = {
    name: 'add-signal',
    text: 'INSERT INTO' +
      '"Signals"' +
      '("Name", "IrData", "AssignedButton", "CreatedAt", "SignalProtocolId")' +
      'VALUES' +
      '($1, $2, $3, $4, 1)',
    values:
      [data.name, data.irData, data.assignedButton, data.createdAt],
  };

  const client = await aiirPool.connect();

  try {
    const result = await client.query(query);
    if (result.rowCount > 0) {
      return true;
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.release();
  }
  return false;
};
