// initialize postgres db connection
import * as pg from 'pg'
const { Pool } = pg.default
const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'cphints',
    password : 'abcd',
    port : 5432
});
export default pool;