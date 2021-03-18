import mysql from 'mysql';

const connection = mysql.createPool({
  'database' : process.env.DATABASE,
  'user' : process.env.USER,
  'password' : process.env.PASSWORD,
  'host' : process.env.HOST,
  'port' : process.env.PORT,
   connectionLimit: 5
});

export default connection;
