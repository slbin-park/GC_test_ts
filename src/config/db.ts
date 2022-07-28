import './env';
const mysql = require('mysql2');

const pool = mysql.createPool({
  // mysql 접속 설정
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
// console.log(pool)

function getConnection(callback: any) {
  pool.getConnection((err: Error, conn: any) => {
    if (!err) {
      callback(conn);
    }
  });
}

export default getConnection;
