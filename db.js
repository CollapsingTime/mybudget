const Pool = require("pg").Pool;
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const proConfig = {
  connectionString: process.env.HEROKU_POSTGRESQL_MAROON_URL,
  ssl: {
      rejectUnauthorized: false,
  }
}

const pool = new Pool(proConfig);

module.exports = pool;
