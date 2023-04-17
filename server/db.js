// initialize postgres db connection
import * as pg from 'pg'
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const { Pool } = pg.default
const pool = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : 'cphints',
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false // Only set this to true if your certificate is signed by a trusted CA.
    }
});
export default pool;