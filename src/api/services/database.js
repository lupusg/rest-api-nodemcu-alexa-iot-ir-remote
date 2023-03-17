/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc The service for database.
 * @since February 2, 2023
 * @author Vlad-Marian Lupu
 */

/**
 * Finds username in the database based on their username.
 * @param {Object} app The express object.
 * @param {any} username The username to search for in the database.
 * @return {Object|Boolean} Returns the user object if found, or false otherwise
 */
export const findUser = async (app, username) => {
  try {
    const {recordset, rowsAffected} = await app.locals.db.query(
        'SELECT * FROM dbo.Users WHERE Username = \'' + username + '\'',
    );

    if (rowsAffected[0] === 0) {
      return false;
    }
    return recordset[0];
  } catch (error) {
    console.log(error);
  }
};

export const findSignal = async (app, assignedButton) => {
  try {
    const {recordset, rowsAffected} = await app.locals.db.query(
        'SELECT * FROM dbo.Signals ' +
        'WHERE AssignedButton = \'' + assignedButton + '\'',
    );

    if (rowsAffected[0] === 0) {
      return false;
    }
    return recordset[0];
  } catch (error) {
    console.log(error);
  }
};

export const addSignal = async (app, data) => {
  try {
    const {rowsAffected} = await app.locals.db.query(
        `INSERT INTO dbo.Signals (Id, Name, Data, CreatedAt, AssignedButton) 
      VALUES (NEWID(), 'n/a', '${data}', '${new Date().toISOString()}', 'n/a')`,
    );
    if (rowsAffected[0] === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};
