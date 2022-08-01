import './env';
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  // mysql 접속 설정
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default pool;
