require('dotenv').config();
const { DATABASE_URL, HOST, DB_USERNAME, DB_PASSWORD, DB_NAME ,PORT } = process.env;



module.exports = {
  development: {
   /* username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: HOST,
    port: PORT, */
    username:'raiz',
    password:'toor',
    database:'base0',
    dialect: 'postgres',
    //url: DATABASE_URL,
  /*
dialectOptions: {
  ssl: {
   
    required: true,
    rejectUnauthorized: false,
  }, 
    } */
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    url: DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        required: true,
        rejectUnauthorized: false,
      },
    },
  },
};
