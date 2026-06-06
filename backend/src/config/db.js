const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT || 1433),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let poolPromise = null;

const getConnection = async () => {
  try {
    if (!poolPromise) {
      poolPromise = await sql.connect(dbConfig);
      console.log('Conexión a SQL Server exitosa');
    }

    return poolPromise;
  } catch (error) {
    console.error('Error de conexión a SQL Server:', error.message);
    throw error;
  }
};

module.exports = {
  sql,
  getConnection
};