import * as dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PWD || '',
  database: process.env.DB_NAME || 'test'
});

/**
 * Example usage
 getDb().query("SELECT 1")
  .then( ([rows,fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then( () => con.end());
 */
export const getDb = () => pool.promise()