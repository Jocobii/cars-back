const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('../keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('La conexion a la base de datos fue cerrada.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Demasiadas conexiones abiertas a la base de datos');
    }
    if (err.code === 'ECONNREFUSED') {
      console.log('Se rechazó la conexión a la base de datos ');
    }
    if (err.code === 'ENOTFOUND') {
      console.log('No se puede acceder desde el host/puerto especificcado');
    }
  }

  if (connection) {
    connection.release();
    console.log('Database is connected');
  }
});

pool.query = promisify(pool.query);
module.exports = pool;
