/**
 * NodeMCU Alexa IOT Infrared Remote
 *
 * Convert old devices that are not compatible
 * with Alexa into compatible ones using infrared
 * signals.
 *
 * Rest API
 *
 * @desc Microsoft SQL server configuration file.
 * @since January 28, 2023
 * @author Vlad-Marian Lupu
 */

export const config = {
  user: process.env.MSSQL_USERNAME,
  password: process.env.MSSQL_PASSWORD,
  database: process.env.MSSQL_DB,
  server: process.env.MSSQL_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustServerCertificate: true,
  },
};
