// initialize postgres db connection
import * as pg from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const { Pool } = pg.default;

const connectionString = process.env.PSQL_STRING;
// Create a new connection pool
const pool = new Pool({
  connectionString: connectionString,
  max: 20,
});

export default pool;